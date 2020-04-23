<template>
  <BudgetTour v-if="!budgetCount" />
  <BudgetView v-else />
</template>

<script>
import BudgetTour from '~/components/Budget/Tour'
import BudgetView from '~/components/Budget/View'

export default {
  components: {
    BudgetView,
    BudgetTour
  },
  layout: 'app',
  transition: 'slide-down',
  computed: {
    budgetId() {
      return this.$route.query.budget
    },
    budgetCount() {
      return this.budgetId
    }
  }
}
</script>
