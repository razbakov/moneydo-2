<template>
  <div>
    <div class="p-4 flex items-center justify-left leading-none text-lg">
      <TIcon class="h-8 w-8" name="logo" />
      <span class="ml-2 font-bold text-2xl">
        {{ app.name }}
      </span>
    </div>

    <div class="mt-8">
      <TButton type="nav" to="/app/">Dashboard</TButton>
      <TButton type="nav" to="/app/account">Account</TButton>
      <TButton type="nav" to="/app/signout">Logout</TButton>
    </div>

    <div class="mt-8 px-4">
      <div class="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Language
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="locale in $i18n.locales"
          :key="locale.code"
          class="px-2 py-1 text-sm rounded"
          :class="
            $i18n.locale === locale.code
              ? 'bg-white text-dark font-bold'
              : 'text-gray-400 hover:text-white'
          "
          @click="$router.push(switchLocalePath(locale.code))"
        >
          {{ locale.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TIcon from '~/components/TIcon'
import TButton from '~/components/TButton'

export default {
  components: {
    TIcon,
    TButton
  },
  setup() {
    const app = process.env.app

    return { app }
  }
}
</script>
