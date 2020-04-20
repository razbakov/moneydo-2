<template>
  <main class="flex items-center justify-center h-screen">
    <div class="-mt-32">
      <h1 class="font-bold text-4xl text-center leading-tight">
        Your money under control
      </h1>
      <p class="text-lg text-center">
        Simple. Fast. Smart.
      </p>
      <div class="flex justify-center mt-3 p-4 w-full md:flex">
        <nuxt-link v-if="!uid" to="/signup" class="block btn m-2">
          Start for free
        </nuxt-link>
        <nuxt-link v-else to="/account" class="block btn m-2">
          Go to my Account
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import useAuth from '~/use/auth'

export default {
  setup() {
    const { uid } = useAuth()

    return {
      uid
    }
  }
}
</script>
