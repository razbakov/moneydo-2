<template>
  <div>
    <main class="flex items-end justify-center w-screen mt-16">
      <div class="container mx-auto md:max-w-lg mb-8 p-4">
        <h1 class="font-bold text-4xl text-center leading-tight">
          We'll help you save more. See for yourself with a 30-day free trial.
        </h1>
        <p class="text-center mt-2">
          For just <span class="font-bold">3€ per month</span> you get access to
          a web app with seamless syncing of your data. All we need is your
          email to start your 30-day free trial, no credit card required.
        </p>
        <div class="flex justify-center mt-3 p-4 w-full md:flex">
          <TButton v-if="!uid" type="primary" to="/signup">
            Sign Up
          </TButton>
          <TButton v-else type="primary" to="/app/">
            Go to Dashboard
          </TButton>
        </div>
      </div>
    </main>
    <div class="mt-8 container md:max-w-4xl mx-auto p-4">
      <h2 class="text-3xl font-semibold text-center">
        Frequently Asked Questions
      </h2>
      <div class="md:flex mx-auto p-4">
        <div class="md:w-1/2">
          <div class="p-4">
            <h3 class="font-bold">Why a subscription?</h3>
            <div>
              A subscription model is the only sustainable approach for an
              actively developed product. Not only does it buy our syncing
              service (and in the future, downloading transactions), but it
              funds continual active development of the project. We want this to
              be around for a long time.
            </div>
          </div>
        </div>
      </div>
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
