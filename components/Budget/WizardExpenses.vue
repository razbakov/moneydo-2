<template>
  <div>
    <h2 class="text-gray-700 text-xl font-bold mb-2">
      Fixed Expenses
    </h2>
    <p class="mb-4 text-gray-500">
      Enter the total of your regular monthly expenses: rent, mortgage, utility
      bills, insurance, phone, transport, gym, subscriptions, loans, etc.
    </p>

    <TField
      v-model="localExpenses"
      label="Fixed Expenses"
      type="tel"
      class="rounded border p-2"
      description="The total of everything you pay each month that doesn't change."
    />

    <div v-if="income > 0" class="mt-4 p-3 bg-gray-100 rounded">
      <div class="flex justify-between text-gray-700">
        <span>Income</span>
        <span class="font-mono">{{ income }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1">
        <span>Fixed Expenses</span>
        <span class="font-mono text-red-600">-{{ localExpenses || 0 }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1 border-t pt-1">
        <span class="font-bold">Remaining</span>
        <span
          class="font-mono font-bold"
          :class="remaining < 0 ? 'text-red-600' : 'text-green-600'"
        >
          {{ remaining }}
        </span>
      </div>
    </div>

    <TTip v-if="remaining < 0" type="warning" class="mt-4">
      Your expenses exceed your income. Consider reducing expenses or adjusting
      your income estimate.
    </TTip>

    <TTip v-else class="mt-4">
      Use previous bills for anything you need to estimate. It's better to plan
      for higher costs than lower.
    </TTip>
  </div>
</template>

<script>
import TField from '~/components/TField'
import TTip from '~/components/TTip'

export default {
  components: {
    TField,
    TTip
  },
  props: {
    expenses: {
      type: [String, Number],
      default: ''
    },
    income: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    localExpenses: {
      get() {
        return this.expenses
      },
      set(val) {
        this.$emit('update:expenses', val)
      }
    },
    remaining() {
      return parseInt(this.income || 0) - parseInt(this.localExpenses || 0)
    }
  }
}
</script>
