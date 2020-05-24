<template>
  <div :class="classes">
    <nuxt-content :document="page" />
  </div>
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
  computed: {
    classes() {
      let classes = this.page.container || 'p-4 mx-auto max-w-2xl'

      classes += this.page.notypo ? '' : 'typo'

      return classes
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
