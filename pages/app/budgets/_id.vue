<template>
  <TLoader v-if="loading" />
  <div v-else class="p-4 card">
    <portal to="nav">
      <router-link to="/app/budgets" class="outline-none hover:opacity-75">
        <TIcon class="ml-2 w-10 p-2" name="back" />
      </router-link>
    </portal>
    <portal to="title">
      <div class="text-lg">Edit Budget</div>
    </portal>

    <TSelect v-model="month" label="Month" :options="months" />

    <div v-if="month === 'custom'" class="mt-2 rounded border p-4">
      <TField v-model="name" label="Name" label-position="top" />
      <TField
        v-model="start"
        label="Start Date"
        type="date"
        label-position="top"
      />
      <TField v-model="end" label="End Date" type="date" label-position="top" />
    </div>

    <TField
      v-model="income"
      label="Income (after tax)"
      type="tel"
      class="mt-2 mb-2 rounded border p-2"
      description="If your income is not consistent each month, make an educated guess."
    />

    <TField
      v-model="savings"
      label="Savings"
      type="tel"
      class="mb-2 rounded border p-2"
      description="Decide what you want to save. We recommend to save 20% of income."
    >
      <div slot="top" class="pt-10">
        <vue-slider
          v-model="savingsPercent"
          tooltip="always"
          :min="0"
          :max="100"
        >
          <template v-slot:tooltip="{ value }">
            <div class="p-1 rounded text-sm text-white bg-primary">
              {{ value }}%
            </div>
          </template>
        </vue-slider>
      </div>
    </TField>

    <TField
      v-model="expenses"
      label="Fixed Expenses"
      type="tel"
      class="mb-2 rounded border p-2"
      description="Total of your regular expenses: that's anything that recurs each month, such as rent, mortgage, utility bills, season tickets, credit card payments, phone, parking permit, gym membership, home, car, health, insurance, loans, etc."
    />

    <TField
      v-model="leftover"
      label="Leftover"
      disabled
      type="tel"
      class="mb-2 rounded border p-2"
      description="That's what left for you to spend."
    />

    <h4 class="my-4 font-bold text-brand-black">
      Envelopes
    </h4>

    <TField
      v-for="envelope in envelopes"
      :key="envelope.label"
      v-model="planned[envelope.name]"
      :label="envelope.label"
      :placeholder="envelope.placeholder"
      type="tel"
      :description="envelope.description"
      class="mb-2 rounded border p-2"
    />

    <TField label="Balance" class="mb-2">
      <div class="font-mono p-2">{{ balance }}</div>
    </TField>

    <div class="flex justify-between mt-6">
      <div>
        <TButton
          v-if="editing"
          type="secondary"
          color="brand-fail"
          @click="removeBudget"
          >Delete</TButton
        >
      </div>

      <TButton type="primary" @click="save">Save</TButton>
    </div>
  </div>
</template>

<script>
import { getDaysInMonth, getYear, getMonth, formatISO9075 } from 'date-fns'
import VueSlider from 'vue-slider-component'
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import useEnvelopes from '~/use/envelopes'
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TButton from '~/components/TButton'
import TLoader from '~/components/TLoader'
import TIcon from '~/components/TIcon'

export default {
  layout: (ctx) => (ctx.isMobile ? 'mobile' : 'desktop'),
  transition: 'slide-down',
  components: {
    TField,
    TSelect,
    TButton,
    TLoader,
    TIcon,
    VueSlider
  },
  data: () => ({
    name: '',
    month: '1',
    leftover: '',
    start: '',
    end: '',
    income: '',
    expenses: '',
    savings: '',
    now: null,
    months: [
      {
        value: 1,
        label: 'January'
      },
      {
        value: 2,
        label: 'February'
      },
      {
        value: 3,
        label: 'March'
      },
      {
        value: 4,
        label: 'April'
      },
      {
        value: 5,
        label: 'May'
      },
      {
        value: 6,
        label: 'June'
      },
      {
        value: 7,
        label: 'July'
      },
      {
        value: 8,
        label: 'August'
      },
      {
        value: 9,
        label: 'September'
      },
      {
        value: 10,
        label: 'October'
      },
      {
        value: 11,
        label: 'November'
      },
      {
        value: 12,
        label: 'December'
      },
      {
        value: 'custom',
        label: 'Custom'
      }
    ],
    fields: [
      'name',
      'month',
      'leftover',
      'start',
      'end',
      'income',
      'expenses',
      'savings',
      'planned'
    ],
    planned: {},
    mounting: true
  }),
  setup() {
    const { updateAccount } = useAuth()
    const { update, remove, create, load, id, doc, loading } = useDoc('budgets')
    const { envelopes } = useEnvelopes()

    return {
      updateAccount,
      update,
      create,
      load,
      id,
      doc,
      loading,
      remove,
      envelopes
    }
  },
  computed: {
    savingsPercent: {
      get() {
        if (this.income > 0) {
          return Math.round((this.savings / this.income) * 100)
        }

        return 20
      },
      set(val) {
        this.savings = Math.round((val / 100) * this.income)
      }
    },
    envelopesTotal() {
      return Object.values(this.planned).reduce(
        (previous, current) => previous + current,
        0
      )
    },
    balance() {
      return parseInt(this.leftover || 0) - this.envelopesTotal
    },
    editing() {
      return this.$route.params.id !== '-'
    },
    budgetId() {
      if (!this.editing) {
        return null
      }

      return this.$route.params.id
    }
  },
  watch: {
    month() {
      if (this.month === 'custom' || !this.month) {
        return
      }

      this.name = this.months.find((m) => +m.value === +this.month).label
      const month = this.month - 1
      const year = getYear(this.now)

      const startDate = new Date(year, month, 1)
      const endDay = getDaysInMonth(startDate)
      const endDate = new Date(year, month, endDay)

      this.start = formatISO9075(startDate, {
        representation: 'date'
      })

      this.end = formatISO9075(endDate, {
        representation: 'date'
      })
    },
    savings() {
      this.calculate()
    },
    income() {
      this.savings = Math.round(this.income * 0.2)

      this.calculate()
    },
    expenses() {
      this.calculate()
    },
    leftover() {
      this.calculate()
    }
  },
  async mounted() {
    this.now = new Date()
    this.month = getMonth(this.now) + 1

    if (!this.editing) {
      this.mounting = false
      return
    }

    await this.load(this.budgetId)

    this.fields.forEach((field) => {
      if (this.doc[field]) {
        this[field] = this.doc[field]
      }
    })

    this.mounting = false
  },
  methods: {
    calculate() {
      if (this.mounting) {
        return
      }

      this.leftover = this.income - this.expenses - this.savings
      let needs = Math.round(this.income * 0.5) - this.expenses

      if (needs <= 0) {
        needs = this.leftover
      }

      const wants = this.leftover - needs

      this.planned = {
        needs,
        wants: Math.round(wants * 0.8),
        culture: Math.round(wants * 0.1),
        extra: Math.round(wants * 0.1)
      }
    },

    removeBudget() {
      this.remove(this.budgetId)

      this.$router.push('/app/budgets')
    },

    save() {
      const changes = {}

      this.fields.forEach((field) => {
        changes[field] = this[field]
      })

      if (!this.editing) {
        this.create(changes)

        this.updateAccount({
          budgetId: this.id
        })
      } else {
        this.update(this.budgetId, changes)
      }

      this.$router.push('/app/budgets')
    }
  }
}
</script>
