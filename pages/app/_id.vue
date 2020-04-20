<template>
  <div
    class="container mx-auto md:max-w-md md:shadow-lg md:my-4 md:border border-primary md:rounded"
  >
    <header class="bg-dark text-white h-16 flex items-center shadow">
      <router-link to="/app/">
        <TIcon class="ml-2 w-10 p-2 text-white" name="close" />
      </router-link>
      <div
        class="w-full mt-2 mr-2 cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex justify-between p-2"
      >
        <div>
          <div class="text-lg text-white font-bold leading-tight">
            {{ category.label }}
          </div>
          <div class="text-xs text-gray-400 leading-none">
            {{ category.envelope }}
          </div>
        </div>
        <div class="font-mono text-white text-lg items-center flex">
          {{ category.total }}
        </div>
      </div>
    </header>
    <main class="p-2">
      <div
        v-for="(expense, expenseIndex) in expenses"
        :key="expenseIndex"
        class="flex border-dashed border-gray-500 border-b mb-2 justify-between items-center p-2"
        :class="{ 'bg-yellow-200': expenseIndex === activeExpense }"
      >
        <div>{{ getDateTime(expense.date) }}</div>
        <div class="font-mono">{{ expense.amount }}</div>
      </div>
    </main>
    <footer
      class="fixed bottom-0 w-full h-24 bg-white rounded-t shadow-top p-2"
    >
      <input
        v-model="expenses[activeExpense].amount"
        v-focus
        type="number"
        class="bg-gray-200 appearance-none font-mono border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
      <div class="flex text-gray-800">
        <TIcon class="p-2 w-10" name="notes" />
        <div class="flex items-center">
          <TIcon class="p-2 w-10" name="calendar" />
          Today
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import TIcon from '~/components/TIcon'
import { getDateTime } from '~/utils'

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

export default {
  layout: 'empty',
  transition: 'slide-up',
  components: {
    TIcon
  },
  data: () => ({
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
    }
  },
  methods: {
    getDateTime
  }
}
</script>
