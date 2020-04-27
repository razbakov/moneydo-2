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

    <div class="conatiner md:max-w-4xl md:flex mx-auto p-4 text-center">
      <div class="md:w-1/3 p-4">
        <h3 class="text-2xl font-semibold">Simple</h3>
        <div class="text-lg">
          Classic budgets are huge, but you can gain more control over your
          pocket with only 4&nbsp;envelopes.
        </div>
      </div>
      <div class="md:w-1/3 p-4">
        <h3 class="text-2xl font-semibold">Smart</h3>
        <div class="text-lg">
          Track only your irregular spendings on things you don’t want to plan.
          Calculate your regular expenses once a month only and let your bank do
          the rest.
        </div>
      </div>
      <div class="md:w-1/3 p-4">
        <h3 class="text-2xl font-semibold">Fast</h3>
        <div class="text-lg">
          Enjoy conversation with friends, while adding a new expense in
          2&nbsp;clicks.
        </div>
      </div>
    </div>

    <div class="mt-8 conatiner md:max-w-4xl text-center mx-auto p-4">
      <h2 class="text-3xl font-semibold">
        Achieve more with a good strategy
      </h2>
      <div class="md:flex mx-auto p-4 text-center">
        <div class="md:w-1/2">
          <div class="p-4">
            <h3 class="text-xl font-bold">Long-term planning</h3>
            <div>
              Set up a strategy for paying off a dept, achieve saving goals,
              plan expensive purchases and vacations with assistance.
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold">Mid-term planning</h3>
            <div>
              Monthly goals (like buying new pair of shoes, gadget, etc.)
              followed up with course of action.
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold">Short-term planning</h3>
            <div>
              Daily decisions made simple: Can I accept invitation of friends to
              join restaurant? How much can I spend today?
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <div class="p-4">
            <h3 class="text-xl font-bold">Adjust</h3>
            <div>
              Empty envelope? Don't worry — re-adjust the budget.
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold">Take a break</h3>
            <div>
              Forgot to track expenses for a while? Count what's left and
              continue from actual amount.
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold">Restart anytime</h3>
            <div>
              Messed up? Start over from scratch in one click.
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
