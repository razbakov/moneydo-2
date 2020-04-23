<template>
  <TLoader v-if="loading" />
  <div v-else class="p-4 card">
    <portal to="title">
      <div class="text-lg">Edit Budget</div>
    </portal>
    <div class="grid grid-cols-2 gap-2">
      <TField
        v-model="name"
        auto-focus
        label="Budget Name"
        label-position="top"
        placeholder="(e.g. April)"
      />
      <TField
        v-model="leftover"
        label="Leftover"
        type="tel"
        label-position="top"
        placeholder="(€ after bills)"
      />
    </div>
    <div class="my-6">
      <details class="mx-2">
        <summary>How to calculate leftover?</summary>
        <div class="mt-2 bg-gray-200 rounded p-2 text-sm">
          <p>You can calculate it yourself using this formula:</p>
          <p class="my-2 font-mono text-xs p-2 bg-dark rounded text-white">
            Leftover = Income - Fixed Expenses - Savings
          </p>
          <p>Or use an interactive step by step guide:</p>
          <div class="flex justify-end mt-2">
            <TButton
              type="secondary"
              href="https://moneydo-budget-planner.netlify.app/?utm_medium=moneydo"
              target="_blank"
              >Open Budget Planner</TButton
            >
          </div>
        </div>
      </details>
      <details class="mt-2 mx-2">
        <summary>What is envelope for?</summary>
        <div class="mt-2 bg-gray-200 rounded p-2 text-sm">
          <p>
            Envelope is like a real paper envelope where you put cash. You can
            take money from one envelope for multiple expense categories. For
            example take money from envelope Needs for Groceries, Medicine,
            House.
          </p>
        </div>
      </details>
      <details class="mt-2 mx-2">
        <summary>Can I add more envelopes?</summary>
        <div class="mt-2 bg-gray-200 rounded p-2 text-sm">
          <p>
            We encourage you to try 4 envelopes budgeting method, which is
            easier and more flexible than any other. This method is based on
            Kakeibo method, which is well covered in internet.
          </p>
        </div>
      </details>
    </div>
    <h4 class="mb-1 font-bold text-xs text-gray-600">
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
import useAuth from '~/use/auth'
import useDoc from '~/use/doc'
import TField from '~/components/TField'
import TButton from '~/components/TButton'
import TLoader from '~/components/TLoader'

export default {
  layout: 'app',
  transition: 'slide-down',
  components: {
    TField,
    TButton,
    TLoader
  },
  data: () => ({
    name: '',
    leftover: '',
    envelopes: [
      {
        label: 'Needs',
        placeholder: '= 50% of income - bills',
        description:
          'Things you can’t live without, like food, toilet paper and shampoo.'
      },
      {
        label: 'Wants',
        placeholder: '= 30% of income',
        description:
          'Purchases you enjoy but don’t need, like a takeout meal or pair of new shoes.'
      },
      {
        label: 'Culture',
        placeholder: 'take part from Wants',
        description: 'Things like movies, books, museum visits and education.'
      },
      {
        label: 'Extra',
        placeholder: 'take part from Wants',
        description:
          "Expenses you aren't going to anticipate, like a doctor’s visit, car repair or unplanned presents."
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
  async mounted() {
    if (!this.editing) {
      return
    }

    await this.load(this.budgetId)

    this.name = this.doc.name
    this.leftover = this.doc.leftover
    this.envelopes = this.doc.envelopes
  },
  methods: {
    async save() {
      const changes = {
        name: this.name,
        leftover: this.leftover,
        envelopes: this.envelopes
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
