<template>
  <div class="flex min-h-screen h-full">
    <div class="w-56 bg-brand-black text-white text-sm">
      <div class="p-4 flex items-center justify-left leading-none text-lg">
        <TIcon class="h-8 w-8" name="logo" />
        <span class="ml-2 font-bold text-2xl">
          {{ app.name }}
        </span>
      </div>

      <div class="mt-8">
        <TButton type="nav" to="/app/">Dashboard</TButton>
        <TButton type="nav" to="/app/budgets/-">+ Create Budget</TButton>
        <TButton type="nav" to="/app/account">Account</TButton>
        <TButton type="nav" to="/app/signout">Logout</TButton>
      </div>
    </div>
    <div class="overflow-hidden flex-grow max-w-screen-md p-4">
      <div class="flex mb-4 px-1">
        <portal-target name="nav"></portal-target>
        <portal-target name="title" class="w-full"></portal-target>
        <portal-target name="actions" class="flex"></portal-target>

        <transition appear name="slide-up">
          <div
            v-if="$nuxt.isOnline"
            class="absolute right-0 top-0 bg-green rounded-full h-2 w-2 mr-2 mt-2"
          />
          <div
            v-else
            class="absolute right-0 top-0 bg-red-700 rounded-full h-2 w-2 mr-2 mt-2"
          />
        </transition>
      </div>
      <nuxt />
    </div>
    <div class="bg-brand-black lg:flex-grow">
      <br />
    </div>
  </div>
</template>

<script>
import TIcon from '~/components/TIcon'
import TButton from '~/components/TButton'

export default {
  components: {
    TIcon,
    TButton
  },
  setup() {
    const app = process.env.app

    return { app }
  }
}
</script>
