<template>
  <div class="max-w-md mx-auto typo mb-8 px-4">
    {{ page.title }}

    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('pages', 'privacy').fetch()

    return {
      page
    }
  }
}
</script>
