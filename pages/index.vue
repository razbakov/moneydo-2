<template>
  <div>
    <main class="flex items-end justify-center w-screen mt-16">
      <div>
        <h1 class="font-bold text-4xl text-center leading-tight">
          Your money under control
        </h1>
        <p class="text-lg text-center mt-2">
          Simple. Fast. Smart.
        </p>
        <div class="flex justify-center mt-3 p-4 w-full md:flex">
          <TButton v-if="!uid" type="primary" to="/signup">
            Start for free
          </TButton>
          <TButton v-else type="primary" to="/app/">
            Go to Dashboard
          </TButton>
        </div>
      </div>
    </main>
    <div class="flex justify-center my-16">
      <img src="/screens/app.png" alt="App Screenshot" class="h-screen" />
    </div>
  </div>
</template>

<script>
import useAuth from '~/use/auth'
import TButton from '~/components/TButton'

export default {
  components: {
    TButton
  },
  setup() {
    const { uid } = useAuth()

    return {
      uid
    }
  }
}
</script>
