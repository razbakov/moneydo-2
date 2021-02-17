<template>
  <div class="p-4">
    <portal to="nav">
      <router-link to="/app/" class="outline-none hover:opacity-75">
        <TIcon class="ml-2 w-10 p-2" name="back" />
      </router-link>
    </portal>
    <portal to="title">
      <transition appear name="slide-down">
        <div class="text-lg flex">
          <span>
            Select Budget
          </span>
        </div>
      </transition>
    </portal>
    <div>
      <div
        v-for="budget in budgets"
        :key="budget.id"
        class="flex items-center mb-2"
      >
        <div
          class="bg-white flex items-center cursor-pointer hover:bg-gray-200 rounded shadow flex-grow px-4 py-2 text-lg text-black font-bold leading-tight"
          :class="{ 'border border-brand-primary': budgetId === budget.id }"
          @click="selectBudget(budget.id)"
        >
          <div class="flex-grow">
            <div>
              {{ budget.name }}
            </div>
            <div class="text-gray-700 text-sm font-normal">
              from {{ getDate(budget.start) }} to {{ getDate(budget.end) }}
            </div>
          </div>
          <div>
            {{ getTotal(budget.planned) }}
          </div>
        </div>
        <TButton type="link" :to="`/app/budgets/${budget.id}`">
          <TIcon name="edit" />
        </TButton>
      </div>
      <TButton type="primary" to="/app/budgets/-" class="inline-block mt-2">
        Add Budget
      </TButton>
    </div>
  </div>
</template>

<script>
import useAuth from '~/use/auth'
import useCollection from '~/use/collection'
import TButton from '~/components/TButton'
import TIcon from '~/components/TIcon'
import { getDate } from '~/utils'

export default {
  layout: (ctx) => (ctx.isMobile ? 'mobile' : 'desktop'),
  components: {
    TButton,
    TIcon
  },
  setup() {
    const { docs: budgets } = useCollection('budgets')
    const { updateAccount, budgetId } = useAuth()

    return { budgets, updateAccount, getDate, budgetId }
  },
  methods: {
    getTotal(planned) {
      if (!planned) {
        return 0
      }

      return Object.values(planned).reduce(
        (previous, current) => +previous + parseInt(current || 0),
        0
      )
    },
    selectBudget(budgetId) {
      this.updateAccount({
        budgetId
      })

      this.$router.push('/app/')
    }
  }
}
</script>
