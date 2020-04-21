<template>
  <div
    class="container mx-auto md:max-w-md md:shadow-lg md:my-4 md:border border-primary md:rounded"
  >
    <header
      class="sticky top-0 bg-dark text-white font-bold h-16 flex items-center shadow z-10 w-full"
    >
      <portal-target name="nav">
        <THamburger v-model="isMenuOpen" class="pt-1" />
      </portal-target>
      <portal-target name="title" class="w-full"></portal-target>
    </header>

    <div
      v-if="isMenuOpen"
      class="absolute w-full h-full top-0 left-0 bg-black opacity-50 z-20"
      @click="isMenuOpen = false"
    />
    <transition name="slide">
      <nav
        v-if="isMenuOpen"
        class="text-lg absolute left-0 w-3/4 md:w-1/4 bottom-0 top-0 bg-dark text-white z-30 shadow-lg p-4"
      >
        <TButton type="nav" to="/app/">Dasboard</TButton>
        <TButton type="nav" to="/account">Account</TButton>
        <TButton type="nav" @click="signOut">Logout</TButton>
      </nav>
    </transition>
    <nuxt />
  </div>
</template>

<script>
import useAuth from '~/use/auth'
import THamburger from '~/components/THamburger'
import TButton from '~/components/TButton'

export default {
  layout: 'app',
  components: {
    THamburger,
    TButton
  },
  data: () => ({
    isMenuOpen: false
  }),
  setup() {
    const { signOut } = useAuth()

    return {
      signOut
    }
  },
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  }
}
</script>
