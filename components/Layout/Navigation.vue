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
