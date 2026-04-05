<template>
  <div>
    <div class="font-serif text-gray-700 leading-loose">
      <p>Hello,</p>
      <p class="mt-2">
        Let's plan your personal budget together. We'll use the
        <strong>Kakeibo</strong> method combined with the
        <strong>50/30/20</strong> rule to help you spend mindfully.
      </p>
    </div>

    <dl class="mt-6">
      <dt
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3 cursor-pointer select-none"
        @click="faq1 = !faq1"
      >
        What is Kakeibo?
      </dt>
      <dd v-if="faq1" class="px-2 text-gray-600 mb-3">
        <p class="mb-4">
          Kakeibo was invented in 1904 by Japan's first female journalist,
          Motoko Hani.
        </p>
        <p>
          The Japanese tradition of using a kakeibo, which translates to
          "household finance ledger," offers an easy solution to mindless
          spending habits. This budgeting system combines tracking purchases
          with the habit of mindfulness in order to reign in unnecessary
          spending and help you achieve savings goals.
          <a
            class="underline text-primary"
            href="https://www.credit.com/personal-finance/kakeibo/"
            target="_blank"
            rel="noopener noreferrer"
            >Learn more</a
          >.
        </p>
      </dd>

      <dt
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3 cursor-pointer select-none"
        @click="faq2 = !faq2"
      >
        What is 50/30/20?
      </dt>
      <dd v-if="faq2" class="px-2 text-gray-600 mb-3">
        <p class="mb-4">
          Elizabeth Warren popularized the 50/30/20 budget rule in her book "All
          Your Worth: The Ultimate Lifetime Money Plan".
        </p>
        <p>
          The 50-30-20 rule puts 50% of your income toward necessities, like
          housing and bills. Twenty percent should then go toward financial
          goals, like paying off debt or saving for retirement. Finally, 30% of
          your income can be allocated to wants, like dining or entertainment.
          <a
            class="underline text-primary"
            href="https://www.thebalance.com/the-50-30-20-rule-of-thumb-453922"
            target="_blank"
            rel="noopener noreferrer"
            >Learn more</a
          >.
        </p>
      </dd>
    </dl>

    <TTip class="mt-4">
      In the next steps, we'll help you set up your income, expenses, savings,
      and spending envelopes with sensible defaults.
    </TTip>
  </div>
</template>

<script>
import TTip from '~/components/TTip'

export default {
  components: {
    TTip
  },
  data: () => ({
    faq1: false,
    faq2: false
  })
}
</script>
