<template>
  <main v-if="!isAdmin" class="text-sm text-center">
    Only admin can access this area.
  </main>
  <main v-else>
    <TTitle>Accounts</TTitle>
    <TGridAccounts v-model="accounts" editable />
  </main>
</template>

<script>
import useAuth from '~/use/auth'

export default {
  layout: 'admin',
  data: () => ({
    accounts: {}
  }),
  setup() {
    const { isAdmin } = useAuth()

    return {
      isAdmin
    }
  }
}
</script>
