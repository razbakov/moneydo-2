<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen"
  >
    <header>
      <nav class="flex items-center justify-between flex-wrap p-6">
        <router-link
          :to="localePath('/')"
          class="no-underline flex items-center justify-center leading-none hover:no-underline text-4xl"
        >
          <TIcon class="h-12 w-12" name="logo" />
          <span class="ml-2 font-bold text-2xl">
            {{ app.name }}
          </span>
        </router-link>

        <div class="menu flex md:mt-0 items-center">
          <router-link
            v-for="nav in app.nav"
            :key="nav.link"
            :to="localePath(nav.link)"
            class="px-4 py-2 mx-4 md:block hidden"
          >
            {{ $t(`${nav.name}.nav`) }}
          </router-link>

          <TButton
            v-if="uid && account"
            type="secondary"
            :to="localePath('/app')"
            exact
          >
            {{ $t('app.nav') }}
          </TButton>

          <TButton
            v-if="!uid"
            type="secondary"
            :to="localePath('/signup')"
            exact
          >
            {{ $t('auth.signin') }}
          </TButton>
        </div>
      </nav>
    </header>
    <nuxt />
    <footer class="md:flex p-4 text-white bg-dark justify-evenly">
      <div class="menu text-left">
        <router-link
          v-for="nav in app.nav"
          :key="nav.link"
          :to="nav.link"
          class="block px-4 py-2"
        >
          {{ $t(`${nav.name}.nav`) }}
        </router-link>
      </div>
      <div class="mt-8 md:mt-0">
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
  computed: {
    lang: {
      get() {
        return this.$i18n.locale
      },
      set(val) {
        this.switchLocalePath(val)
      }
    },
    localesDropdown() {
      return this.$i18n.locales.map((locale) => ({
        value: locale.code,
        label: locale.name
      }))
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
  },
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  }
}
</script>
