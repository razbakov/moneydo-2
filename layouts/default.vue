<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen"
  >
    <header>
      <nav class="flex items-center justify-between flex-wrap p-6">
        <router-link
          to="/"
          class="no-underline flex items-center justify-center leading-none hover:no-underline text-4xl"
        >
          <TIcon class="h-12 w-12" name="logo" />
          <span class="ml-2 font-bold text-2xl">
            {{ app.name }}
          </span>
        </router-link>

        <TButton v-if="uid && account" type="secondary" to="/app" exact>
          Open App
        </TButton>

        <TButton v-if="!uid" type="secondary" to="/signup" exact>
          Sign in
        </TButton>
      </nav>
    </header>
    <nuxt />
    <footer
      class="md:flex text-center p-4 text-white bg-dark justify-end items-center"
    >
      <div class="m-3 text-md font-bold">
        Follow us
      </div>
      <div v-if="social.twitter" class="m-3">
        <a
          class="underline hover:no-underline hover:text-blue-500"
          :href="`https://twitter.com/${social.twitter}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
      <div v-if="social.instagram" class="m-3">
        <a
          class="underline hover:no-underline hover:text-pink-500"
          :href="`https://instagram.com/${social.instagram}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
      <div v-if="social.facebook" class="m-3">
        <a
          class="underline hover:no-underline hover:text-blue-500"
          :href="`https://facebook.com/${social.facebook}`"
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
import useAuth from '~/use/auth'
import TButton from '~/components/TButton'
import TIcon from '~/components/TIcon'

export default {
  components: {
    TButton,
    TIcon
  },
  data: () => ({
    isMenuOpen: false
  }),
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  },
  setup() {
    const { uid, account } = useAuth()

    const app = process.env.app
    const social = app.social

    return {
      uid,
      account,
      app,
      social
    }
  }
}
</script>
