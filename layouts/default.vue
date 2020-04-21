<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen"
  >
    <THeader />
    <nuxt />
    <footer
      class="md:flex text-center p-4 text-white bg-dark justify-end items-center"
    >
      <div class="m-3 text-md font-bold">
        Follow us
      </div>
      <div class="m-3">
        <a
          class="underline hover:no-underline hover:text-blue-500"
          :href="social.twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
      <div class="m-3">
        <a
          class="underline hover:no-underline hover:text-pink-500"
          :href="social.instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
      <div class="m-3">
        <a
          class="underline hover:no-underline hover:text-blue-500"
          :href="social.facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import THeader from '~/components/THeader'
import useAuth from '~/use/auth'

export default {
  components: {
    THeader
  },
  data: () => ({
    social: {
      twitter: 'https://twitter.com/AbendKantine',
      instagram: 'https://www.instagram.com/AbendKantine',
      facebook: 'https://www.facebook.com/abendkantine',
      slack:
        'https://join.slack.com/t/guten-abend/shared_invite/zt-dkaf1w0m-GJFmiVjeUJ4NW4t~RC7eTQ'
    }
  }),
  setup() {
    const { isAdmin } = useAuth()

    return {
      isAdmin
    }
  }
}
</script>
