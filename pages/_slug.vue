<template>
  <nuxt-content :document="page" />
</template>

<script>
import useAuth from '~/use/auth'

export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'

    let page = {}

    try {
      page = await $content(slug).fetch()
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }

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
