<template>
  <div class="p-4 card">
    <portal to="title">
      <div class="text-lg">Edit Budget</div>
    </portal>
    <div class="grid grid-cols-2 gap-2">
      <TField
        v-model="name"
        auto-focus
        label="Budget Name"
        label-position="top"
      />
      <TField
        v-model="total"
        auto-focus
        label="Leftover"
        label-position="top"
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
        <summary>Can I add more categories?</summary>
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
      v-model="envelope.today"
      auto-focus
      :label="envelope.label"
      :description="envelope.description"
      class="mb-2 rounded border p-2"
    />
    <div class="flex justify-end mt-6">
      <TButton type="primary">Save</TButton>
    </div>
  </div>
</template>

<script>
import TField from '~/components/TField'
import TButton from '~/components/TButton'

export default {
  layout: 'app',
  components: {
    TField,
    TButton
  },
  data: () => ({
    name: '',
    total: '',
    envelopes: [
      {
        label: 'Needs',
        description:
          'Things you can’t live without, like food, toilet paper and shampoo.',
        today: 50
      },
      {
        label: 'Wants',
        description:
          'Purchases you enjoy but don’t need, like a takeout meal or pair of new shoes.',
        today: 60
      },
      {
        label: 'Culture',
        description: 'Things like movies, books, museum visits and education.',
        today: 6
      },
      {
        label: 'Extra',
        description:
          "Expenses you aren't going to anticipate, like a doctor’s visit, car repair or unplanned presents.",
        today: 9
      }
    ]
  })
}
</script>

<style></style>
