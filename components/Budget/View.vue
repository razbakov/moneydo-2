<template>
  <div>
    <v-tour
      name="dashboard"
      :steps="steps"
      :callbacks="{ onFinish: markTutorial, onSkip: markTutorial }"
    ></v-tour>

    <TLoader v-if="loading" />
    <main v-else class="p-2 bg-light">
      <portal to="title">
        <transition appear name="slide-down">
          <div class="text-lg">{{ doc.name }}</div>
        </transition>
      </portal>
      <portal to="actions">
        <TButton id="help" type="link" @click="$tours.dashboard.start()">
          <TIcon name="help" />
        </TButton>
        <TButton type="link" :to="`/app/budgets/${budgetId}`">
          <TIcon name="edit" />
        </TButton>
      </portal>
      <h4 class="mb-1 font-bold text-xs text-gray-600">
        Budget
      </h4>
      <div id="envelopes" class="grid grid-cols-4 gap-2">
        <div
          v-for="(envelope, envelopeIndex) in envelopes"
          :id="`envelope${envelope.label}`"
          :key="envelope.label"
          :class="{
            'bg-gray-200': draggingTo === envelopeIndex,
            'opacity-50': draggingItem === envelopeIndex
          }"
          class="p-2 bg-white rounded text-gray-600 shadow-top text-center"
          draggable="true"
          @dragstart="dragstart(envelopeIndex, $event)"
          @dragend="dragend($event)"
          @dragenter="dragenter(envelopeIndex, $event)"
          @dragleave="dragleave(envelopeIndex, $event)"
          @dragover.prevent
        >
          <div class="text-lg font-bold font-mono text-green leading-none">
            {{ get('today', envelope.planned) }}€
          </div>
          <div class="text-xs text-gray-600">
            {{ envelope.label }}
          </div>
        </div>
      </div>
      <transition appear name="zoom-in-out">
        <div
          v-if="showWinner"
          class="text-center text-primary rounded bg-white p-4 shadow my-2"
        >
          <TIcon class="inline-block" name="piggy" />
          <div class="text-3xl mt-2 leading-tight">
            You saved <span class="font-mono">17€</span>
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
          :key="category.label"
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
                  {{ category.envelope }}
                </div>
              </div>
            </div>
            <div class="font-mono text-black text-lg items-center flex">
              {{ category.total || 0 }}€
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
          `Moving from ${envelopes[draggingItem].label} to ${envelopes[draggingTo].label}`
        "
        @close="moveend()"
      >
        <TField
          v-model="movingAmount"
          auto-focus
          label="Amount"
          type="tel"
          class="mb-6"
        />
        <TField :label="envelopes[draggingItem].label">
          <div class="font-mono">
            {{ envelopes[draggingItem].today - parseInt(movingAmount || 0) }}
          </div>
        </TField>
        <TField :label="envelopes[draggingTo].label" class="mt-2">
          <div class="font-mono">
            {{ envelopes[draggingTo].today + parseInt(movingAmount || 0) }}
          </div>
        </TField>
        <div class="flex justify-end mt-6">
          <TButton type="link" @click="moveend()">Cancel</TButton>
          <TButton type="primary" @click="moveend()">Move</TButton>
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
          :options="envelopes.map((e) => e.label)"
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
        <div class="flex justify-between">
          <TButton
            type="secondary"
            color="red-500"
            @click="editingCategory = -1"
            >Delete</TButton
          >
          <div class="flex justify-end">
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
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import useCollection from '~/use/collection'
import TIcon from '~/components/TIcon'
import TPopup from '~/components/TPopup'
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TLoader from '~/components/TLoader'
import TButton from '~/components/TButton'

export default {
  components: {
    TIcon,
    TPopup,
    TField,
    TSelect,
    TButton,
    TLoader
  },
  props: {
    budgetId: {
      type: String,
      default: ''
    }
  },
  setup(params) {
    const { account, updateAccount } = useAuth()
    const { load, doc, loading } = useDoc('budgets')
    const { create, update } = useDoc('categories')
    const { getById, docs: categories } = useCollection('categories')

    load(params.budgetId)

    return {
      doc,
      loading,
      categories,
      categoriesRefs: {},
      create,
      getById,
      update,
      account,
      updateAccount
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
        content: 'Here are your envelopes with money that you can spend',
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
        target: '#envelopeNeeds',
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
    categoryChanges: {}
  }),
  computed: {
    envelopes() {
      return this.doc.envelopes
    }
  },
  watch: {
    isMovingEditorShown() {
      this.movingAmount = null
    }
  },
  mounted() {
    this.startTutorial()
  },
  methods: {
    startTutorial() {
      if (!this.account.tutorialDashboard) {
        setTimeout(this.$tours.dashboard.start, 500)
      }
    },
    markTutorial() {
      this.updateAccount({
        tutorialDashboard: true
      })
    },
    get(filter, total) {
      return total
    },
    async updateCategory() {
      if (this.editingCategory === '-') {
        await this.create(this.categoryChanges)
      } else {
        await this.update(this.editingCategory, this.categoryChanges)
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
    moveend() {
      this.isMovingEditorShown = false
      this.draggingItem = null
      this.draggingTo = null
    },
    dragstart(item, e) {
      this.draggingItem = item
      e.dataTransfer.setData('text/plain', 'dummy')
    },
    dragend(e) {
      if (this.draggingItem === this.draggingTo) {
        this.moveend()
        return
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
