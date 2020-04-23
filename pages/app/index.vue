<template>
  <BudgetTour v-if="!budgetId" />
  <BudgetView v-else :budget-id="budgetId" />
</template>

<script>
import useAuth from '~/use/auth'
import BudgetTour from '~/components/Budget/Tour'
import BudgetView from '~/components/Budget/View'

export default {
  components: {
    BudgetView,
    BudgetTour
  },
  layout: 'app',
  transition: 'slide-down',
  setup() {
    const { budgetId } = useAuth()

    return {
      budgetId
    }
  }
}
</script>
