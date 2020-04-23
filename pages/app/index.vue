<template>
  <TLoader v-if="loading" />
  <BudgetTour v-else-if="!account.budgetId" />
  <BudgetView v-else :budget-id="account.budgetId" />
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
  layout: 'app',
  transition: 'slide-down',
  setup() {
    const { account, loading } = useAuth()

    return {
      account,
      loading
    }
  }
}
</script>
