<template>
  <main class="p-2 bg-light min-h-screen flex items-center">
    <portal to="title">
      <transition appear name="slide-down">
        <div class="text-lg">Welcome to MoneyDo</div>
      </transition>
    </portal>
    <transition appear name="zoom-in-out">
      <div
        class="w-full text-center text-primary rounded bg-white p-4 shadow my-2"
      >
        <TIcon class="inline-block" name="piggy" />
        <div class="text-3xl mt-2 leading-tight">
          Take € under control
        </div>
        <div>by creating your first budget</div>
        <TButton type="primary" class="inline-block mt-4" to="/app/budgets/-"
          >Create Budget</TButton
        >
      </div>
    </transition>
  </main>
</template>

<script>
import TIcon from '~/components/TIcon'
import TButton from '~/components/TButton'

export default {
  components: {
    TIcon,
    TButton
  }
}
</script>
