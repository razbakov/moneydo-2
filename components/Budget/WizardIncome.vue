<template>
  <div>
    <h2 class="text-gray-700 text-xl font-bold mb-2">
      Monthly Income
    </h2>
    <p class="mb-4 text-gray-500">
      Enter your total monthly net income (after tax). If your income varies,
      make an educated guess.
    </p>

    <TSelect v-model="localMonth" label="Month" :options="months" />

    <TField
      v-model="localIncome"
      label="Income (after tax)"
      type="tel"
      class="mt-4 rounded border p-2"
      description="Your total monthly income after taxes and deductions."
    />

    <TTip class="mt-4">
      Round up to whole numbers to keep calculations simple.
    </TTip>
  </div>
</template>

<script>
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TTip from '~/components/TTip'

export default {
  components: {
    TField,
    TSelect,
    TTip
  },
  props: {
    income: {
      type: [String, Number],
      default: ''
    },
    month: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      months: [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
      ]
    }
  },
  computed: {
    localIncome: {
      get() {
        return this.income
      },
      set(val) {
        this.$emit('update:income', val)
      }
    },
    localMonth: {
      get() {
        return this.month
      },
      set(val) {
        this.$emit('update:month', val)
      }
    }
  }
}
</script>
