<template>
  <main>
    <portal to="nav">
      <router-link to="/app/" class="outline-none hover:opacity-75">
        <TIcon class="ml-2 w-10 p-2 text-white" name="close" />
      </router-link>
    </portal>
    <portal to="title">
      <transition appear name="slide-up">
        <div
          v-if="category"
          class="w-full mt-2 mr-2 rounded shadow mb-2 flex justify-between p-2 pl-1"
        >
          <div>
            <div class="text-lg text-white font-bold leading-tight">
              {{ category.label }}
            </div>
            <div class="text-xs text-gray-400 leading-none">
              {{ category.envelope }}
            </div>
          </div>
          <div class="font-mono text-white text-lg items-center flex mr-2">
            {{ category.total }}
          </div>
        </div>
      </transition>
    </portal>
    <portal to="actions">
      <TButton id="help" type="link" @click="$tours.expense.start()">
        <TIcon name="help" />
      </TButton>
      <TButton type="link" @click="addExpense()">
        <TIcon name="add" />
      </TButton>
    </portal>
    <main class="p-2 overflow-y-scroll" style="height: calc(100vh - 10rem)">
      <div
        v-for="expense in expenses"
        :id="`expense${expense.id}`"
        :key="expense.id"
        class="flex cursor-pointer border-dashed border-gray-500 border-b mb-2 justify-between items-center p-2"
        :class="{ 'bg-yellow-200': expense.id === activeExpense }"
        @click="editExpense(expense.id)"
      >
        <div>{{ getDateTime(expense.date) }}</div>
        <div class="ml-2 mr-2 text-sm text-gray-900 flex-grow">
          {{ expense.description }}
        </div>
        <div class="font-mono">{{ expense.amount }}</div>
      </div>
    </main>
    <transition appear name="slide-up">
      <footer
        v-if="activeExpense"
        class="fixed bottom-0 w-full md:max-w-md bg-white rounded-t shadow-top p-2"
      >
        <div class="flex">
          <input
            id="input"
            v-model="expenseChanges.amount"
            v-focus
            type="tel"
            class="w-1/3 mr-2 bg-gray-200 appearance-none font-mono border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
          <input
            id="description"
            v-model="expenseChanges.description"
            type="text"
            placeholder="Description (optional)"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
        <div class="flex justify-between items-center text-gray-800">
          <div
            class="flex items-center cursor-pointer"
            @click="selectDate = true"
          >
            <TIcon id="date" class="p-2 w-10" name="calendar" />
            {{ getDateTime(expenseChanges.date) }}
          </div>
          <TButton class="mt-2" @click="updateExpense">Save</TButton>
        </div>
        <div v-if="selectDate" class="flex justify-center">
          <VDatePicker v-model="expenseChanges.date" is-inline />
        </div>
      </footer>
    </transition>
    <v-tour
      name="expense"
      :steps="steps"
      :callbacks="{ onFinish: markTutorial, onSkip: markTutorial }"
    ></v-tour>
  </main>
</template>

<script>
import { computed } from '@vue/composition-api'
import VDatePicker from 'v-calendar/lib/components/date-picker.umd'
import useAuth from '~/use/auth'
import useCollection from '~/use/collection'
import useDoc from '~/use/doc'
import useRouter from '~/use/router'
import { getDateTime } from '~/utils'
import TIcon from '~/components/TIcon'
import TButton from '~/components/TButton'

export default {
  layout: 'app',
  components: {
    TIcon,
    VDatePicker,
    TButton
  },
  data: () => ({
    steps: [
      {
        target: '#input',
        content: 'Add new expense right away'
      },
      {
        target: '#description',
        content: 'Add some notes if you want'
      },
      {
        target: '#date',
        content: 'Change date of transaction if you forgot to do it right away'
      },
      {
        target: '#expense0',
        content:
          'Click on any transaction to edit. Click again to close the editor.'
      }
    ],
    selectDate: false,
    isMenuOpen: false,
    activeExpense: false,
    expenseChanges: null
  }),
  setup() {
    const { account, updateAccount } = useAuth()

    const { params } = useRouter()
    const categoryId = params.id

    const { getById: load } = useCollection('categories')
    const category = computed(() => load(categoryId))

    const { docs: expenses, getById } = useCollection('expenses', {
      category: categoryId
    })

    const { create, update } = useDoc('expenses')

    return {
      categoryId,
      expenses,
      category,
      create,
      update,
      getById,
      account,
      updateAccount
    }
  },
  mounted() {
    this.addExpense()

    if (!this.account.tutorialExpense) {
      setTimeout(this.$tours.expense.start, 1000)
    }
  },
  methods: {
    markTutorial() {
      this.updateAccount({
        tutorialExpense: true
      })
    },
    getDateTime,
    addExpense() {
      if (this.activeExpense === '-') {
        this.activeExpense = false
        return
      }

      this.expenseChanges = {
        amount: 0,
        description: '',
        date: new Date(),
        category: this.categoryId
      }

      this.activeExpense = '-'
    },
    async updateExpense() {
      if (this.activeExpense === '-') {
        await this.create(this.expenseChanges)
      } else {
        await this.update(this.activeExpense, this.expenseChanges)
      }

      this.activeExpense = false
    },
    editExpense(id) {
      this.selectDate = false

      if (this.activeExpense === id) {
        this.activeExpense = false
        return
      }

      this.expenseChanges = { ...this.getById(id) }
      this.activeExpense = id
    }
  }
}
</script>
