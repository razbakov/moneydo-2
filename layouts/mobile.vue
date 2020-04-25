<template>
  <div
    class="container mx-auto md:max-w-md md:shadow-lg md:my-4 md:border border-primary md:rounded"
  >
    <header
      class="sticky overflow-hidden top-0 bg-dark text-white font-bold h-16 shadow z-10 w-full flex items-center"
    >
      <portal-target name="nav">
        <THamburger v-model="isMenuOpen" class="pt-1" />
      </portal-target>
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
    </header>

    <div
      v-if="isMenuOpen"
      class="absolute w-full h-full top-0 left-0 bg-black opacity-50 z-20"
      @click="isMenuOpen = false"
    />
    <transition name="slide">
      <nav
        v-if="isMenuOpen"
        class="text-lg absolute left-0 w-56 bottom-0 top-0 bg-dark text-white z-30 shadow-lg"
      >
        <div class="p-4 flex items-center justify-left leading-none text-lg">
          <img class="h-8" src="/logo.svg" :alt="app.name" />
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
      </nav>
    </transition>
    <div class="overflow-hidden">
      <nuxt />
    </div>
  </div>
</template>

<script>
import THamburger from '~/components/THamburger'
import TButton from '~/components/TButton'

export default {
  components: {
    THamburger,
    TButton
  },
  setup() {
    const app = process.env.app

    return { app }
  },
  data: () => ({
    isMenuOpen: false
  }),
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  }
}
</script>
