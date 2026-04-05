<template>
  <div>
    <h2 class="text-gray-700 text-xl font-bold mb-2">
      Savings Target
    </h2>
    <p class="mb-4 text-gray-500">
      Decide how much you want to save. We recommend saving 20% of your income.
    </p>

    <div class="p-3 bg-gray-100 rounded mb-4">
      <div class="flex justify-between text-gray-700">
        <span>Income</span>
        <span class="font-mono text-green-600">+{{ income }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1">
        <span>Fixed Expenses</span>
        <span class="font-mono text-red-600">-{{ expenses }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1">
        <span>Savings ({{ savingsPercent }}%)</span>
        <span class="font-mono text-red-600">-{{ localSavings || 0 }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1 border-t pt-1">
        <span class="font-bold">Left to spend</span>
        <span
          class="font-mono font-bold"
          :class="leftToSpend < 0 ? 'text-red-600' : 'text-green-600'"
        >
          {{ leftToSpend }}
        </span>
      </div>
    </div>

    <div class="pt-8 pb-4 px-2">
      <vue-slider v-model="savingsPercent" tooltip="always" :min="0" :max="100">
        <template v-slot:tooltip="{ value }">
          <div class="p-1 rounded text-sm text-white bg-primary">
            {{ value }}%
          </div>
        </template>
      </vue-slider>
    </div>

    <TField
      v-model="localSavings"
      label="Savings Amount"
      type="tel"
      class="mt-2 rounded border p-2"
    />

    <TTip v-if="savingsPercent < 20" type="warning" class="mt-4">
      Try to save at least 20% of your income. Right now it's
      {{ savingsPercent }}%.
    </TTip>

    <TTip v-else type="success" class="mt-4">
      You're saving {{ savingsPercent }}% of your income.
    </TTip>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import TField from '~/components/TField'
import TTip from '~/components/TTip'

export default {
  components: {
    VueSlider,
    TField,
    TTip
  },
  props: {
    savings: {
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
    }
  },
  computed: {
    localSavings: {
      get() {
        return this.savings
      },
      set(val) {
        this.$emit('update:savings', val)
      }
    },
    savingsPercent: {
      get() {
        const inc = parseInt(this.income) || 0
        if (inc <= 0) return 0
        return Math.round((parseInt(this.localSavings || 0) / inc) * 100)
      },
      set(val) {
        const inc = parseInt(this.income) || 0
        this.localSavings = Math.round((val / 100) * inc)
      }
    },
    leftToSpend() {
      return (
        parseInt(this.income || 0) -
        parseInt(this.expenses || 0) -
        parseInt(this.localSavings || 0)
      )
    }
  }
}
</script>
