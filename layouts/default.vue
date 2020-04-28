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
            {{ $t('app.open') }}
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
    <footer
      class="md:flex text-center p-4 text-white bg-dark justify-between items-center"
    >
      <div class="menu md:mt-0 items-center">
        <router-link
          v-for="nav in app.nav"
          :key="nav.link"
          :to="nav.link"
          class="px-4 py-2 mx-4"
        >
          {{ $t(`${nav.name}.nav`) }}
        </router-link>
      </div>
      <div class="md:flex mt-8 md:mt-0">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="block p-2"
          :class="{ 'font-bold': $i18n.locale === locale.code }"
          >{{ locale.name }}</nuxt-link
        >
      </div>
      <div class="md:flex mt-8 md:mt-0">
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
