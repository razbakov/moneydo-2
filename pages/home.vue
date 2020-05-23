<template>
  <div>
    <main
      class="flex items-end justify-center w-screen mt-16 md:max-w-2xl mx-auto"
    >
      <div class="p-4">
        <h1 class="font-bold text-4xl text-center leading-tight">
          {{ page.title }}
        </h1>
        <p class="text-lg text-center mt-2">
          {{ page.subtitle }}
        </p>
        <div class="flex justify-center mt-3 p-4 w-full md:flex">
          <TButton v-if="!uid" type="primary" :to="page.cta">
            {{ page.ctaLabel }}
          </TButton>
          <TButton v-else type="primary" to="/app/">
            {{ $t('dashboard.from_home') }}
          </TButton>
        </div>
      </div>
    </main>
    <div class="mt-16 md:max-w-lg mx-auto p-4 typo">
      <nuxt-content :document="page" />
    </div>
  </div>
</template>

<script>
import useAuth from '~/use/auth'

export default {
  async asyncData({ $content }) {
    const page = await $content('pages', 'home').fetch()

    return {
      page
    }
  },
  setup() {
    const { uid } = useAuth()

    return {
      uid
    }
  }
}
</script>
