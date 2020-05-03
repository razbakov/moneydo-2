<template>
  <div>
    <main
      class="flex items-end justify-center w-screen mt-16 md:max-w-2xl mx-auto"
    >
      <div class="p-4">
        <h1 class="font-bold text-4xl text-center leading-tight">
          {{ $t('home.title') }}
        </h1>
        <p class="text-lg text-center mt-2">
          {{ $t('home.subtitle') }}
        </p>
        <div class="flex justify-center mt-3 p-4 w-full md:flex">
          <TButton v-if="!uid" type="primary" to="/signup">
            {{ $t('trial.start') }}
          </TButton>
          <TButton v-else type="primary" to="/app/">
            {{ $t('dashboard.from_home') }}
          </TButton>
        </div>
      </div>
    </main>

    <div class="mt-16 md:max-w-lg mx-auto p-4 text-center">
      <h3 class="text-2xl font-semibold">
        What is Kakeibo?
      </h3>
      <div class="text-left mt-4 typo">
        <p>
          The Japanese tradition of using a kakeibo, which translates to
          “household finance ledger,” offers an easy solution to mindless
          spending habits. This budgeting system combines tracking purchases
          with the habit of mindfulness in order to reign in unnecessary
          spending and help you achieve savings goals.
        </p>
        <p>
          The four category system helps kakeibo users become more mindful of
          their spending habits and avoid wasting money on things that don’t
          align with their goals.
        </p>
        <p>
          A kakeibo is an excellent tool for those who are interested in
          minimalism. Its special attention to mindfulness separates it from
          other budgeting systems, making it a good match for those who want to
          ensure their money goes toward the things that bring joy to their
          lives.
        </p>
        <p>Some benefits of kakeibo are:</p>
        <ul>
          <li>
            It simplifies finances by grouping spending into four distinct
            categories.
          </li>
          <li>It encourages realistic monthly savings goals.</li>
          <li>It pays attention to present, past and future.</li>
          <li>
            It encourages saving small amounts daily rather than occasional big
            sums.
          </li>
          <li>It celebrates small achievements.</li>
        </ul>
      </div>
    </div>

    <div class="mt-16 md:max-w-2xl mx-auto p-4 text-center">
      <h3 class="text-2xl font-semibold">
        Why MoneyDo?
      </h3>
      <div class="mt-8 flex items-center">
        <div class="text-left mr-4 w-1/2 typo">
          <ul>
            <li>establish your budget with recommendations</li>
            <li>
              calculate daily limits
            </li>
            <li>
              add expense: click-type-click
            </li>
            <li>
              re-adjust budget with drag-type-click
            </li>
            <li>
              mobile and desktop
            </li>
            <li>
              available offline
            </li>
            <li>
              install in 10 seconds (less than 1 MB)
            </li>
          </ul>
        </div>
        <div class="flex justify-center w-1/2">
          <img src="/screens/app.png" alt="App Screenshot" />
        </div>
      </div>
    </div>

    <div class="mt-8 container md:max-w-4xl text-center mx-auto p-4">
      <h2 class="text-3xl font-semibold">
        Achieve more with a good strategy
      </h2>
      <div class="md:flex mx-auto p-4 text-center">
        <div class="md:w-1/2">
          <div class="p-4">
            <h3 class="font-bold">Long-term planning</h3>
            <div>
              Set up a strategy for paying off a dept, achieve saving goals,
              plan expensive purchases and vacations with assistance.
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold">Mid-term planning</h3>
            <div>
              Monthly goals (like buying new pair of shoes, gadget, etc.)
              followed up with course of action.
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-bold">Short-term planning</h3>
            <div>
              Daily decisions made simple: Can I accept invitation of friends to
              join restaurant? How much can I spend today?
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <div class="p-4">
            <h3 class="font-bold">Adjust</h3>
            <div>
              Empty envelope? Don't worry — re-adjust the budget.
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold">Take a break</h3>
            <div>
              Forgot to track expenses for a while? Count what's left and
              continue from actual amount.
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-bold">Restart anytime</h3>
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
