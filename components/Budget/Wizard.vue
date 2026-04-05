<template>
  <div class="max-w-screen-sm mx-auto">
    <div class="p-4 bg-gray-200 flex justify-between items-center rounded-t">
      <h1 class="text-gray-700 text-lg font-bold">Budget Planner</h1>
      <span v-if="!saving" class="text-gray-500"
        >{{ step }} / {{ totalSteps }}</span
      >
    </div>

    <div class="p-4 bg-white rounded-b shadow">
      <WizardIntro v-if="step === 1" />

      <WizardIncome
        v-if="step === 2"
        :income.sync="income"
        :month.sync="month"
      />

      <WizardExpenses
        v-if="step === 3"
        :expenses.sync="expenses"
        :income="income"
      />

      <WizardSavings
        v-if="step === 4"
        :savings.sync="savings"
        :income="income"
        :expenses="expenses"
      />

      <WizardBudget
        v-if="step === 5"
        :planned.sync="planned"
        :income="income"
        :expenses="expenses"
        :savings="savings"
      />

      <WizardSummary
        v-if="step === 6"
        :month="month"
        :income="income"
        :expenses="expenses"
        :savings="savings"
        :planned="planned"
        :total-days="totalDays"
      />

      <div class="flex justify-between mt-6">
        <div>
          <TButton v-if="step > 1" type="simple" @click="prevStep">
            Back
          </TButton>
        </div>
        <div>
          <TButton v-if="step < totalSteps" type="primary" @click="nextStep">
            Next
          </TButton>
          <TButton
            v-if="step === totalSteps"
            type="primary"
            :disabled="saving"
            @click="saveBudget"
          >
            {{ saving ? 'Saving...' : 'Save Budget' }}
          </TButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDaysInMonth, getYear, getMonth, formatISO9075 } from 'date-fns'
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import TButton from '~/components/TButton'
import WizardIntro from '~/components/Budget/WizardIntro'
import WizardIncome from '~/components/Budget/WizardIncome'
import WizardExpenses from '~/components/Budget/WizardExpenses'
import WizardSavings from '~/components/Budget/WizardSavings'
import WizardBudget from '~/components/Budget/WizardBudget'
import WizardSummary from '~/components/Budget/WizardSummary'

export default {
  components: {
    TButton,
    WizardIntro,
    WizardIncome,
    WizardExpenses,
    WizardSavings,
    WizardBudget,
    WizardSummary
  },
  data() {
    const now = new Date()
    const currentMonth = getMonth(now) + 1

    return {
      step: 1,
      totalSteps: 6,
      now,
      month: currentMonth,
      income: '',
      expenses: '',
      savings: '',
      planned: {
        needs: 0,
        wants: 0,
        culture: 0,
        extra: 0
      },
      saving: false
    }
  },
  setup() {
    const { updateAccount } = useAuth()
    const { create } = useDoc('budgets')

    return {
      updateAccount,
      createBudget: create
    }
  },
  computed: {
    monthName() {
      const names = [
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
      return names[parseInt(this.month) - 1] || ''
    },
    startDate() {
      const m = parseInt(this.month) - 1
      const year = getYear(this.now)
      return new Date(year, m, 1)
    },
    endDate() {
      const m = parseInt(this.month) - 1
      const year = getYear(this.now)
      const endDay = getDaysInMonth(this.startDate)
      return new Date(year, m, endDay)
    },
    totalDays() {
      return getDaysInMonth(this.startDate)
    }
  },
  watch: {
    income(val) {
      if (this.step <= 3) {
        this.recalculate()
      }
    },
    expenses() {
      if (this.step <= 4) {
        this.recalculate()
      }
    },
    savings() {
      if (this.step <= 5) {
        this.recalculateEnvelopes()
      }
    }
  },
  methods: {
    recalculate() {
      const inc = parseInt(this.income) || 0
      this.savings = Math.round(inc * 0.2)
      this.recalculateEnvelopes()
    },
    recalculateEnvelopes() {
      const inc = parseInt(this.income) || 0
      const exp = parseInt(this.expenses) || 0
      const sav = parseInt(this.savings) || 0
      const leftover = inc - exp - sav

      if (leftover <= 0) {
        this.planned = { needs: 0, wants: 0, culture: 0, extra: 0 }
        return
      }

      // 50/30/20 logic adapted from existing _id.vue calculate()
      let needs = Math.round(inc * 0.5) - exp
      if (needs <= 0) {
        needs = leftover
      }
      if (needs > leftover) {
        needs = leftover
      }

      const wants = leftover - needs
      this.planned = {
        needs,
        wants: Math.round(wants * 0.8),
        culture: Math.round(wants * 0.1),
        extra: Math.round(wants * 0.1)
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--
      }
    },
    nextStep() {
      if (this.step < this.totalSteps) {
        this.step++
      }
    },
    async saveBudget() {
      this.saving = true

      try {
        const budgetData = {
          name: this.monthName,
          month: parseInt(this.month),
          start: formatISO9075(this.startDate, { representation: 'date' }),
          end: formatISO9075(this.endDate, { representation: 'date' }),
          income: parseInt(this.income) || 0,
          expenses: parseInt(this.expenses) || 0,
          savings: parseInt(this.savings) || 0,
          planned: {
            needs: parseInt(this.planned.needs) || 0,
            wants: parseInt(this.planned.wants) || 0,
            culture: parseInt(this.planned.culture) || 0,
            extra: parseInt(this.planned.extra) || 0
          }
        }

        const doc = await this.createBudget(budgetData)

        await this.updateAccount({
          budgetId: doc.id
        })

        this.$emit('complete', doc.id)
        this.$router.push('/app/')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to save budget:', e)
        this.saving = false
      }
    }
  }
}
</script>
