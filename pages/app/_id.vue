<template>
  <div>
    <portal to="nav">
      <router-link to="/app/" class="outline-none hover:opacity-75">
        <TIcon class="ml-2 w-10 p-2 text-white" name="close" />
      </router-link>
    </portal>
    <portal to="title">
      <transition appear name="slide-up">
        <div
          class="w-full mt-2 mr-2 rounded shadow mb-2 flex justify-between p-2"
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
    <main
      ref="expenses"
      class="p-2 overflow-y-scroll"
      style="height: calc(100vh - 10rem)"
    >
      <div
        v-for="(expense, expenseIndex) in expenses"
        :id="`expense${expenseIndex}`"
        :key="expenseIndex"
        class="flex cursor-pointer border-dashed border-gray-500 border-b mb-2 justify-between items-center p-2"
        :class="{ 'bg-yellow-200': expenseIndex === activeExpense }"
        @click="editExpense(expenseIndex)"
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
        v-if="showEditor"
        class="fixed bottom-0 w-full md:max-w-md bg-white rounded-t shadow-top p-2"
      >
        <div class="flex">
          <input
            ref="input"
            v-model="expenses[activeExpense].amount"
            v-focus
            type="tel"
            class="w-1/3 mr-2 bg-gray-200 appearance-none font-mono border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
          <input
            ref="description"
            v-model="expenses[activeExpense].description"
            type="text"
            placeholder="Description (optional)"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
        <div class="flex text-gray-800">
          <div
            class="flex items-center cursor-pointer"
            @click="selectDate = true"
          >
            <TIcon class="p-2 w-10" name="calendar" />
            {{ getDateTime(expenses[activeExpense].date) }}
          </div>
        </div>
        <div v-if="selectDate" class="flex justify-center">
          <VDatePicker v-model="expenses[activeExpense].date" is-inline />
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
import VDatePicker from 'v-calendar/lib/components/date-picker.umd'
import TIcon from '~/components/TIcon'
import { getDateTime } from '~/utils'

export default {
  layout: 'app',
  transition: 'slide-up',
  components: {
    TIcon,
    VDatePicker
  },
  data: () => ({
    selectDate: false,
    isMenuOpen: false,
    activeExpense: 0,
    expenses: [
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 30,
        notes: ''
      },
      {
        date: new Date(),
        amount: 50,
        notes: ''
      },
      {
        date: new Date(),
        amount: 70,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },

      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 30,
        notes: ''
      },
      {
        date: new Date(),
        amount: 50,
        notes: ''
      },
      {
        date: new Date(),
        amount: 70,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },

      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 30,
        notes: ''
      },
      {
        date: new Date(),
        amount: 50,
        notes: ''
      },
      {
        date: new Date(),
        amount: 70,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      },
      {
        date: new Date(),
        amount: 20,
        notes: ''
      }
    ],
    categories: [
      {
        label: 'Groceries',
        envelope: 'Needs',
        total: 130,
        icon: 'fridge'
      },
      {
        label: 'Coffee',
        envelope: 'Wants',
        total: 50,
        icon: 'coffee'
      },
      {
        label: 'House',
        envelope: 'Wants',
        total: 60,
        icon: 'house'
      },
      {
        label: 'Health',
        envelope: 'Needs',
        total: 30,
        icon: 'store'
      },
      {
        label: 'Transport',
        envelope: 'Needs',
        total: 55,
        icon: 'car'
      },
      {
        label: 'Eating out',
        envelope: 'Wants',
        total: 70,
        icon: 'lobby'
      }
    ],
    envelopes: [
      {
        label: 'Needs',
        today: 50
      },
      {
        label: 'Wants',
        today: 60
      },
      {
        label: 'Culture',
        today: 6
      },
      {
        label: 'Extra',
        today: 9
      }
    ]
  }),
  computed: {
    category() {
      return this.categories[this.$route.params.id]
    },
    showEditor() {
      return this.activeExpense !== -1
    }
  },
  mounted() {
    this.scrollToActive()
  },
  methods: {
    getDateTime,
    editExpense(expenseIndex) {
      if (this.activeExpense === expenseIndex) {
        this.activeExpense = -1
        return
      }

      this.$nextTick(() => {
        this.activeExpense = expenseIndex

        if (this.$refs.input) {
          this.$refs.input.focus()
        }

        this.scrollToActive()
      })
    },
    scrollToActive() {
      if (!this.showEditor) {
        return
      }

      this.$nextTick(() => {
        document.getElementById(`expense${this.activeExpense}`).scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }
  }
}
</script>
