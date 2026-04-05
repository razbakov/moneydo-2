<template>
  <main class="p-2 bg-light min-h-screen">
    <portal to="title">
      <transition appear name="slide-down">
        <div class="text-lg">Welcome to MoneyDo</div>
      </transition>
    </portal>

    <transition appear name="zoom-in-out">
      <div
        v-if="!showWizard"
        class="w-full text-center text-primary rounded bg-white p-4 shadow my-2 mx-auto max-w-screen-sm"
      >
        <TIcon class="inline-block" name="piggy" />
        <div class="text-3xl mt-2 leading-tight">
          Take your money under control
        </div>
        <div class="mt-2 text-gray-600">
          Plan your budget using the Kakeibo method
        </div>
        <TButton
          type="primary"
          class="inline-block mt-4"
          @click="showWizard = true"
        >
          Create Budget
        </TButton>
        <div class="mt-3">
          <TButton type="link" to="/app/budgets/-">
            Quick setup (advanced)
          </TButton>
        </div>
      </div>
    </transition>

    <BudgetWizard v-if="showWizard" />
  </main>
</template>

<script>
import TIcon from '~/components/TIcon'
import TButton from '~/components/TButton'
import BudgetWizard from '~/components/Budget/Wizard'

export default {
  components: {
    TIcon,
    TButton,
    BudgetWizard
  },
  data: () => ({
    showWizard: false
  })
}
</script>
