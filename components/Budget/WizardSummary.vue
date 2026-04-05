<template>
  <div>
    <h2 class="text-gray-700 text-xl font-bold mb-2">
      Your Budget Summary
    </h2>
    <p class="mb-4 text-gray-500">
      Review your budget plan. When everything looks good, hit Save to start
      tracking.
    </p>

    <div class="bg-white rounded shadow p-4">
      <div class="flex justify-between py-2 border-b">
        <span class="text-gray-600">Month</span>
        <span class="font-bold text-gray-700">{{ monthName }}</span>
      </div>
      <div class="flex justify-between py-2 border-b">
        <span class="text-gray-600">Income</span>
        <span class="font-mono text-green-600 font-bold">{{ income }}</span>
      </div>
      <div class="flex justify-between py-2 border-b">
        <span class="text-gray-600">Fixed Expenses</span>
        <span class="font-mono text-red-600">-{{ expenses }}</span>
      </div>
      <div class="flex justify-between py-2 border-b">
        <span class="text-gray-600">Savings ({{ savingsPercent }}%)</span>
        <span class="font-mono text-red-600">-{{ savings }}</span>
      </div>
      <div class="flex justify-between py-2 border-b font-bold">
        <span class="text-gray-700">Available to Spend</span>
        <span class="font-mono text-gray-700">{{ leftover }}</span>
      </div>

      <h3 class="mt-4 mb-2 font-bold text-gray-700">Envelopes</h3>
      <div
        v-for="envelope in envelopesList"
        :key="envelope.name"
        class="flex justify-between py-1"
      >
        <span class="text-gray-600">{{ envelope.label }}</span>
        <span class="font-mono text-gray-700">
          {{ planned[envelope.name] || 0 }}
          <span class="text-xs text-gray-500">
            (~{{ dailyAmount(envelope.name) }}/day)
          </span>
        </span>
      </div>

      <div
        class="flex justify-between py-2 mt-2 border-t font-bold"
        :class="balance === 0 ? 'text-green-700' : 'text-orange-700'"
      >
        <span>Balance</span>
        <span class="font-mono">{{ balance }}</span>
      </div>
    </div>

    <div v-if="hasWarnings" class="mt-4">
      <div
        v-if="savingsPercent < 20"
        class="mb-2 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded"
      >
        <strong class="font-bold">Savings below 20%.</strong>
        Consider increasing your savings to build a safety net.
      </div>
      <div
        v-if="balance !== 0"
        class="mb-2 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded"
      >
        <strong class="font-bold">Budget not balanced.</strong>
        Go back and adjust your envelopes so the balance is 0.
      </div>
    </div>

    <TTip v-if="!hasWarnings" type="success" class="mt-4">
      Your budget looks great! Save it to start tracking your daily spending.
    </TTip>
  </div>
</template>

<script>
import TTip from '~/components/TTip'
import useEnvelopes from '~/use/envelopes'

export default {
  components: {
    TTip
  },
  props: {
    month: {
      type: [String, Number],
      default: ''
    },
    income: {
      type: [String, Number],
      default: 0
    },
    expenses: {
      type: [String, Number],
      default: 0
    },
    savings: {
      type: [String, Number],
      default: 0
    },
    planned: {
      type: Object,
      default: () => ({})
    },
    totalDays: {
      type: Number,
      default: 30
    }
  },
  setup() {
    const { envelopes } = useEnvelopes()
    return { envelopesList: envelopes }
  },
  computed: {
    monthNames() {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    },
    monthName() {
      const idx = parseInt(this.month) - 1
      return this.monthNames[idx] || ''
    },
    leftover() {
      return (
        parseInt(this.income || 0) -
        parseInt(this.expenses || 0) -
        parseInt(this.savings || 0)
      )
    },
    savingsPercent() {
      const inc = parseInt(this.income) || 0
      if (inc <= 0) return 0
      return Math.round((parseInt(this.savings || 0) / inc) * 100)
    },
    envelopesTotal() {
      return Object.values(this.planned).reduce(
        (sum, val) => sum + parseInt(val || 0),
        0
      )
    },
    balance() {
      return this.leftover - this.envelopesTotal
    },
    hasWarnings() {
      return this.savingsPercent < 20 || this.balance !== 0
    }
  },
  methods: {
    dailyAmount(envelope) {
      const days = this.totalDays || 30
      return (
        Math.round((parseInt(this.planned[envelope] || 0) / days) * 100) / 100
      )
    }
  }
}
</script>
