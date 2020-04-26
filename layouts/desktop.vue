<template>
  <div class="flex min-h-screen h-full">
    <div class="w-56 bg-brand-black text-white text-sm">
      <LayoutNavigation />
    </div>
    <div class="overflow-hidden flex-grow max-w-screen-md p-4">
      <div class="flex mb-4 px-1 items-center">
        <portal-target name="nav" class="text-brand-black"></portal-target>
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
import LayoutNavigation from '~/components/Layout/Navigation'

export default {
  components: {
    LayoutNavigation
  }
}
</script>
