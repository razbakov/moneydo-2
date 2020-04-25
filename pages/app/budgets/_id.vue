<template>
  <TLoader v-if="loading" />
  <div v-else class="p-4 card">
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
      v-model="envelope.planned"
      :label="envelope.label"
      :placeholder="envelope.placeholder"
      type="tel"
      :description="envelope.description"
      class="mb-2 rounded border p-2"
    />

    <TField label="Balance" class="mb-2">
      <div class="font-mono p-2">{{ balance }}</div>
    </TField>

    <div class="flex justify-end mt-6">
      <TButton type="primary" @click="save">Save</TButton>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TButton from '~/components/TButton'
import TLoader from '~/components/TLoader'

export default {
  layout: (ctx) => (ctx.isMobile ? 'mobile' : 'desktop'),
  transition: 'slide-down',
  components: {
    TField,
    TSelect,
    TButton,
    TLoader,
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
    months: [
      {
        value: '1',
        label: 'January'
      },
      {
        value: '2',
        label: 'February'
      },
      {
        value: '3',
        label: 'March'
      },
      {
        value: '4',
        label: 'April'
      },
      {
        value: '5',
        label: 'May'
      },
      {
        value: '6',
        label: 'June'
      },
      {
        value: '7',
        label: 'July'
      },
      {
        value: '8',
        label: 'August'
      },
      {
        value: '9',
        label: 'September'
      },
      {
        value: '10',
        label: 'October'
      },
      {
        value: '11',
        label: 'November'
      },
      {
        value: '12',
        label: 'December'
      },
      {
        value: 'custom',
        label: 'Custom'
      }
    ],
    envelopes: [
      {
        label: 'Needs',
        description:
          'Things you can’t live without, like food, toilet paper and shampoo.'
      },
      {
        label: 'Wants',
        description:
          'Purchases you enjoy but don’t need, like a takeout meal or pair of new shoes.'
      },
      {
        label: 'Culture',
        description:
          'Things that enrich your life, like museums, books and education.'
      },
      {
        label: 'Extra',
        description:
          'Unexpected costs that we all need to pay for, like a doctor’s visit, car repair or unplanned presents.'
      }
    ]
  }),
  setup() {
    const { updateAccount } = useAuth()
    const { update, create, load, id, doc, loading } = useDoc('budgets')

    return {
      updateAccount,
      update,
      create,
      load,
      id,
      doc,
      loading
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
      return this.envelopes
        .map((e) => parseInt(e.planned || 0))
        .reduce((previous, current) => previous + current)
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
    if (!this.editing) {
      return
    }

    await this.load(this.budgetId)

    this.name = this.doc.name
    this.leftover = this.doc.leftover
    this.envelopes = this.doc.envelopes
    this.start = this.doc.start
    this.end = this.doc.end
  },
  methods: {
    calculate() {
      this.leftover = this.income - this.expenses - this.savings
      let needs = Math.round(this.income * 0.5) - this.expenses

      if (needs <= 0) {
        needs = this.leftover
      }

      const wants = this.leftover - needs

      this.getEnvelope('Needs').planned = needs
      this.getEnvelope('Wants').planned = Math.round(wants * 0.8)
      this.getEnvelope('Culture').planned = Math.round(wants * 0.1)
      this.getEnvelope('Extra').planned = Math.round(wants * 0.1)
    },
    getEnvelope(name) {
      return this.envelopes.find((e) => e.label === name)
    },
    async save() {
      const changes = {
        name: this.name,
        leftover: this.leftover,
        envelopes: this.envelopes,
        start: this.start,
        end: this.end
      }

      if (!this.editing) {
        await this.create(changes)

        const accountChanges = {
          budgetId: this.id
        }

        await this.updateAccount(accountChanges)
      } else {
        await this.update(this.budgetId, changes)
      }

      this.$router.push('/app/')
    }
  }
}
</script>

<style></style>
