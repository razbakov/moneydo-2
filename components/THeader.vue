<template>
  <header>
    <nav class="flex items-center text-dark justify-between flex-wrap p-6">
      <div class="sm:flex mb-4">
        <router-link
          to="/"
          class="no-underline leading-none hover:no-underline font-extrabold text-4xl"
        >
          <img class="h-10" src="/img/logo.svg" alt="MoneyDo" />
        </router-link>
      </div>
      <ul
        class="md:flex text-lg fixed left-0 right-0 bottom-0 top-0 md:relative bg-light md:bg-transparent"
        :class="{ hidden: !isMenuOpen }"
      >
        <li v-for="item in nav" :key="item.link">
          <router-link
            class="mr-2 md:px-4 md:py-2 p-4 w-full block"
            :to="item.link"
            exact
            >{{ item.text }}</router-link
          >
        </li>
        <li v-if="uid && account">
          <router-link
            class="mr-2 md:px-4 md:py-2 p-4 w-full block"
            to="/account"
            exact
            >{{ account.name || 'My account' }}</router-link
          >
        </li>
        <li v-if="!uid">
          <router-link
            class="mr-2 md:px-4 md:py-2 p-4 w-full block text-primary"
            to="/signup"
            exact
            >Sign in</router-link
          >
        </li>
      </ul>
      <div
        class="right-0 top-0 mr-5 mt-5 md:hidden z-50"
        :class="isMenuOpen ? 'fixed' : 'absolute'"
      >
        <button
          class="hamburger hamburger--elastic"
          :class="{ 'is-active': isMenuOpen }"
          type="button"
          aria-label="Menu"
          aria-controls="navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import useAuth from '~/use/auth'

export default {
  data: () => ({
    isMenuOpen: false,
    title: 'Guten Abend',
    description: 'Quarantine Club',
    social: {
      twitter: 'https://twitter.com/AbendKantine',
      instagram: 'https://www.instagram.com/AbendKantine',
      facebook: 'https://www.facebook.com/abendkantine',
      slack:
        'https://join.slack.com/t/guten-abend/shared_invite/zt-dkaf1w0m-GJFmiVjeUJ4NW4t~RC7eTQ'
    },
    nav: []
  }),
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  },
  setup() {
    const { uid, account } = useAuth()

    return {
      uid,
      account
    }
  }
}
</script>

<style></style>
