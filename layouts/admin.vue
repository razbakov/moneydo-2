<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen flex flex-col"
  >
    <header>
      <nav class="flex items-center justify-between flex-wrap p-6">
        <div class="font-bold">
          Admin Dashboard
        </div>

        <div class="menu flex md:mt-0 items-center">
          <router-link
            v-for="nav in navs"
            :key="nav.link"
            :to="nav.link"
            class="px-4 py-2 mx-4 md:block hidden"
          >
            {{ nav.name }}
          </router-link>
        </div>
      </nav>
    </header>
    <div class="flex-grow bg-white rounded container mx-auto my-4 p-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const navs = [
      {
        link: 'accounts',
        name: 'Account'
      },
      {
        link: 'emails',
        name: 'Emails'
      },
      {
        link: 'templates',
        name: 'Templates'
      }
    ]

    return { navs }
  }
}
</script>
