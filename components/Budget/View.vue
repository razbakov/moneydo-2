<template>
  <div>
    <v-tour
      name="dashboard"
      :steps="steps"
      :callbacks="{ onFinish: markTutorial, onSkip: markTutorial }"
    ></v-tour>

    <main class="p-2 bg-light">
      <portal v-if="doc" to="title">
        <transition appear name="slide-down">
          <div class="text-lg flex">
            {{ doc.name }}
          </div>
        </transition>
      </portal>
      <portal to="actions">
        <TButton id="help" type="link" @click="$tours.dashboard.start()">
          <TIcon name="help" />
        </TButton>
        <TButton type="link" to="/app/budgets">
          <TIcon name="down" />
        </TButton>
      </portal>

      <div class="flex my-2 justify-center">
        <div
          v-for="mode in modes"
          :key="mode.name"
          class="py-1 px-4 text-dark rounded cursor-pointer"
          :class="{ 'bg-white shadow': mode.name === activeMode }"
          @click="activeMode = mode.name"
        >
          {{ mode.label }}
        </div>
      </div>

      <h4 class="mb-1 font-bold text-xs text-gray-600 flex justify-between">
        <span>Budget</span>
        <span v-if="active" class="font-normal"
          >{{ money(leftover) }} left for
          <span v-if="!daysLeft">today</span>
          <span v-else>{{ daysLeft }} days</span>
        </span>
        <span v-else-if="doc" class="font-normal">
          from {{ getDate(doc.start) }} to {{ getDate(doc.end) }}
        </span>
      </h4>
      <div id="envelopes" class="grid grid-cols-4 gap-2">
        <div
          v-for="envelope in envelopes"
          :id="`envelope-${envelope.name}`"
          :key="envelope.name"
          :class="{
            'bg-gray-200': draggingTo === envelope.name,
            'opacity-50': draggingItem === envelope.name
          }"
          class="p-2 bg-white rounded text-gray-600 shadow-top text-center"
          draggable="true"
          @dragstart="dragstart(envelope.name, $event)"
          @dragend="dragend($event)"
          @dragenter="dragenter(envelope.name, $event)"
          @dragleave="dragleave(envelope.name, $event)"
          @dragover.prevent
        >
          <div
            v-if="activeMode === 'today' && available(envelope.name) >= 0"
            class="text-lg font-bold font-mono text-green leading-none"
          >
            {{ money(available(envelope.name)) }}
          </div>
          <div
            v-if="activeMode === 'today' && available(envelope.name) < 0"
            class="text-lg font-bold font-mono text-brand-fail leading-none"
          >
            {{ money(projection(envelope.name)) }}
          </div>
          <div
            v-if="activeMode === 'left'"
            class="text-lg font-bold font-mono leading-none"
            :class="
              left(envelope.name) < 0 ? 'text-brand-fail' : 'text-brand-success'
            "
          >
            {{ money(left(envelope.name)) }}
          </div>
          <div
            v-if="activeMode === 'planned'"
            class="text-lg font-bold font-mono text-green leading-none"
          >
            {{ money(planned(envelope.name)) }}
          </div>
          <div class="text-xs text-gray-600">
            {{ envelope.label }}
          </div>
        </div>
      </div>
      <transition appear name="zoom-in-out">
        <div
          v-if="doc && leftover < 0"
          class="text-center text-brand-fail rounded bg-white p-4 shadow my-2"
        >
          <div class="text-3xl mt-2 leading-tight">
            Negative Balance
          </div>
          <div>Reduce your savings or borrow some money</div>
          <TButton
            type="primary"
            class="inline-block mt-4"
            :to="`/app/budgets/${budgetId}`"
            >Edit Budget</TButton
          >
        </div>
      </transition>
      <transition appear name="zoom-in-out">
        <div
          v-if="showWinner"
          class="text-center text-primary rounded bg-white p-4 shadow my-2"
        >
          <TIcon class="inline-block" name="piggy" />
          <div class="text-3xl mt-2 leading-tight">
            You saved <span class="font-mono">17</span>
          </div>
          <div>since your last visit 2 days ago</div>
          <TButton type="primary" class="mt-2" @click="showWinner = false"
            >Yeah!</TButton
          >
        </div>
      </transition>
      <div id="categories" class="mt-2">
        <h4 class="mb-1 font-bold text-xs text-gray-600">
          Expenses by Category
        </h4>

        <router-link
          v-for="(category, categoryIndex) in categories"
          :key="category.id"
          v-touch:touchhold="editCategory(category.id)"
          :to="`/app/${category.id}`"
        >
          <div
            :id="`category${categoryIndex}`"
            class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex justify-between p-2"
          >
            <div class="flex">
              <div
                class="w-6 ml-2 mr-4 flex items-center text-primary justify-center"
              >
                <TIcon v-if="category.icon" :name="category.icon" />
              </div>
              <div>
                <div class="text-lg text-black font-bold leading-tight">
                  {{ category.label }}
                </div>
                <div class="text-xs text-gray-600 leading-none">
                  {{ getEnvelope(category.envelope).label }}
                </div>
              </div>
            </div>
            <div class="font-mono text-black text-lg items-center flex pr-2">
              {{ money(totalExpenses(category.id)) }}
            </div>
          </div>
        </router-link>

        <div
          class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex items-center text-gray-600 p-2"
          @click="addCategory"
        >
          <div class="w-6 ml-2 mr-4 text-3xl leading-none text-center">+</div>
          <div class="text-xs font-bold leading-none">
            Add Category
          </div>
        </div>
      </div>
      <TPopup
        v-if="isMovingEditorShown"
        :title="
          `Moving from ${getEnvelope(draggingItem).label} to ${
            getEnvelope(draggingTo).label
          }`
        "
        @close="isMovingEditorShown = false"
      >
        <TField
          v-model="movingAmount"
          auto-focus
          label="Amount"
          type="tel"
          class="mb-6"
        />
        <TField :label="getEnvelope(draggingItem).label">
          <div class="font-mono pt-2">
            {{ left(draggingItem) - parseInt(movingAmount || 0) }}
          </div>
        </TField>
        <TField :label="getEnvelope(draggingTo).label" class="mt-2">
          <div class="font-mono pt-2">
            {{ left(draggingTo) + parseInt(movingAmount || 0) }}
          </div>
        </TField>
        <div class="flex justify-end mt-6">
          <TButton type="link" @click="isMovingEditorShown = false"
            >Cancel</TButton
          >
          <TButton type="primary" @click="moveBudget()">Move</TButton>
        </div>
      </TPopup>
      <TPopup
        v-if="editingCategory"
        :title="editingCategory === '-' ? 'Add Category' : 'Edit Cateogry'"
        @close="editingCategory = false"
      >
        <TField
          v-model="categoryChanges.label"
          v-focus
          label="Name"
          class="mb-6"
        />
        <TSelect
          v-model="categoryChanges.envelope"
          :options="envelopes"
          label="Envelope"
          class="mb-6"
        />
        <TSelect
          v-model="categoryChanges.icon"
          label="Icon"
          :options="[
            'car',
            'coffee',
            'fridge',
            'house',
            'lobby',
            'notes',
            'store'
          ]"
          class="mb-6"
        />
        <div class="flex justify-start">
          <TButton
            v-if="editingCategory != '-'"
            type="link"
            color="red-500"
            class="flex-grow"
            @click="removeCategory"
          >
            <TIcon name="delete" />
          </TButton>
          <div class="flex w-full justify-end">
            <TButton type="link" @click="editingCategory = false"
              >Cancel</TButton
            >
            <TButton type="primary" @click="updateCategory">{{
              editingCategory === '-' ? 'Add' : 'Save'
            }}</TButton>
          </div>
        </div>
      </TPopup>
    </main>
  </div>
</template>

<script>
import { differenceInDays } from 'date-fns'
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import useCollection from '~/use/collection'
import useEnvelopes from '~/use/envelopes'
import TIcon from '~/components/TIcon'
import TPopup from '~/components/TPopup'
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TButton from '~/components/TButton'
import { getDate, getDateObect } from '~/utils'

const money = (num) => Math.round((num || 0) * 100) / 100

export default {
  components: {
    TIcon,
    TPopup,
    TField,
    TSelect,
    TButton
  },
  props: {
    budgetId: {
      type: String,
      default: ''
    }
  },
  setup(params) {
    const { account, updateAccount } = useAuth()
    const { load, doc, update: updateBudget } = useDoc('budgets')
    const { create, update, remove } = useDoc('categories')
    const { getById, docs: categories } = useCollection('categories')
    const { docs: expenses } = useCollection('expenses', {
      budget: params.budgetId
    })

    const { envelopes, getEnvelope } = useEnvelopes()

    const totalExpenses = (category) => {
      if (!expenses.value.length) {
        return 0
      }

      return expenses.value
        .filter((e) => e.category === category)
        .map((e) => parseFloat(e.amount || 0.0))
        .reduce((previous, current) => previous + current, 0)
    }

    load(params.budgetId)

    return {
      money,
      doc,
      categories,
      create,
      getById,
      update,
      account,
      updateAccount,
      remove,
      totalExpenses,
      envelopes,
      getEnvelope,
      updateBudget,
      getDate
    }
  },
  data: () => ({
    steps: [
      {
        target: '#help',
        content: 'Restart this tour anytime from here'
      },
      {
        target: '#envelopes',
        content:
          'Here are your envelopes with money that you can spend today. Every day it adds your daily limit. Daily limit = total planned / total days.',
        params: {
          highlight: true
        }
      },
      {
        target: '#categories',
        content: 'Here are your expenses with how much you already spent',
        params: {
          highlight: true
        }
      },
      {
        target: '#envelope-needs',
        content: 'Drag and drop to move budget between envelopes'
      },
      {
        target: '#category0',
        content: 'Tap and hold to change name, icon, envelope or to delete'
      },
      {
        target: '#category0',
        content: 'Click to add an expense'
      }
    ],
    now: null,
    activeMode: '',
    modes: [],
    showWinner: false,
    category: {},
    movingAmount: null,
    editingCategory: false,
    isMenuOpen: false,
    isPointerShown: false,
    draggingItem: null,
    draggingTo: null,
    isMovingEditorShown: false,
    mouseLeft: 0,
    mouseTop: 0,
    categoryChanges: {},
    active: false
  }),
  computed: {
    leftover() {
      return this.envelopes
        .map((e) => this.left(e.name))
        .reduce((previous, current) => previous + current, 0)
    },
    daysLeft() {
      if (!this.now || !this.doc) {
        return 0
      }

      return differenceInDays(getDateObect(this.doc.end), this.now)
    },
    totalDays() {
      if (!this.doc) {
        return 0
      }

      return differenceInDays(
        getDateObect(this.doc.end),
        getDateObect(this.doc.start)
      )
    },
    daysSpent() {
      return this.totalDays - this.daysLeft
    }
  },
  watch: {
    isMovingEditorShown(val) {
      if (!val) {
        this.draggingTo = null
        this.draggingItem = null
      }
    },
    doc() {
      this.load()
    }
  },
  mounted() {
    this.startTutorial()
    this.now = new Date()
    this.load()
  },
  methods: {
    load() {
      if (!this.doc) {
        return
      }

      const modes = []

      const active =
        +this.now >= +getDateObect(this.doc.start) &&
        +this.now <= +getDateObect(this.doc.end)

      if (active) {
        modes.push({
          name: 'today',
          label: 'Today'
        })

        this.activeMode = 'today'
      }

      modes.push({
        name: 'left',
        label: 'Left'
      })

      modes.push({
        name: 'planned',
        label: 'Planned'
      })

      if (!this.activeMode) {
        this.activeMode = 'left'
      }

      this.modes = modes
      this.active = active
    },
    planned(envelope) {
      return this.doc?.planned[envelope] || 0
    },
    left(envelope) {
      return this.planned(envelope) - this.spent(envelope)
    },
    spent(envelope) {
      if (!this.categories.length) {
        return 0
      }

      return this.categories
        .filter((c) => c.envelope === envelope)
        .map((c) => this.totalExpenses(c.id))
        .reduce((previous, current) => previous + current, 0)
    },
    perDay(envelope) {
      if (!this.totalDays) {
        return this.planned(envelope)
      }

      return this.planned(envelope) / this.totalDays
    },
    daysToAvoid(envelope) {
      return Math.round((this.available(envelope) / this.perDay(envelope)) * -1)
    },
    projection(envelope) {
      if (!this.daysLeft) {
        return this.left(envelope)
      }

      const result = this.left(envelope) / this.daysLeft

      return result
    },
    available(envelope) {
      if (!this.daysSpent) {
        return this.perDay(envelope)
      }

      const result =
        this.perDay(envelope) * this.daysSpent - this.spent(envelope)

      return result
    },
    removeCategory() {
      this.remove(this.editingCategory)
      this.categoryChanges = {}
      this.editingCategory = false
    },
    startTutorial() {
      if (!this.account?.tutorialDashboard) {
        setTimeout(this.$tours.dashboard.start, 500)
      }
    },
    markTutorial() {
      this.updateAccount({
        tutorialDashboard: true
      })
    },
    updateCategory() {
      if (this.editingCategory === '-') {
        this.create(this.categoryChanges)
      } else {
        this.update(this.editingCategory, this.categoryChanges)
      }

      this.categoryChanges = {}
      this.editingCategory = false
    },
    addCategory() {
      this.editingCategory = '-'
    },
    editCategory(id) {
      return () => {
        this.categoryChanges = this.getById(id)
        this.editingCategory = id
      }
    },
    moveBudget() {
      this.isMovingEditorShown = false

      const planned = this.doc?.planned

      planned[this.draggingItem] =
        parseInt(planned[this.draggingItem]) - parseInt(this.movingAmount)

      planned[this.draggingTo] =
        parseInt(planned[this.draggingTo]) + parseInt(this.movingAmount)

      this.updateBudget(this.budgetId, {
        planned
      })

      this.draggingItem = null
      this.draggingTo = null
    },
    dragstart(item, e) {
      this.draggingItem = item
      e.dataTransfer.setData('text/plain', 'dummy')
    },
    dragend(e) {
      if (this.draggingItem === this.draggingTo) {
        this.isMovingEditorShown = false
        return
      }

      this.movingAmount = ''

      if (this.left(this.draggingTo) < 0) {
        this.movingAmount = this.left(this.draggingTo) * -1
      }

      this.isMovingEditorShown = true
    },
    dragenter(index, e) {
      this.draggingTo = index
    },
    dragleave(item, e) {}
  }
}
</script>
