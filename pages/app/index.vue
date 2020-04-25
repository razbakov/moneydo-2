<template>
  <TLoader v-if="loading" />
  <BudgetTour v-else-if="!budgetId" />
  <BudgetView v-else :budget-id="budgetId" />
</template>

<script>
import useAuth from '~/use/auth'
import TLoader from '~/components/TLoader'
import BudgetTour from '~/components/Budget/Tour'
import BudgetView from '~/components/Budget/View'

export default {
  components: {
    BudgetView,
    BudgetTour,
    TLoader
  },
  layout: (ctx) => (ctx.isMobile ? 'mobile' : 'desktop'),
  transition: 'slide-down',
  setup() {
    const { loading, budgetId } = useAuth()

    return {
      budgetId,
      loading
    }
  }
}
</script>
