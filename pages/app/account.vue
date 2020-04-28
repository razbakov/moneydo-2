<template>
  <TLoader v-if="loading" />
  <main v-else class="p-4 bg-white">
    <portal to="title">
      <div class="text-lg">Your Account</div>
    </portal>

    <TForm
      v-model="account"
      :fields="fields"
      :submit-label="`${confirmedAccount ? 'Save' : 'Confirm'}`"
      @save="save"
    />
  </main>
</template>

<script>
import ls from 'local-storage'
import useAuth from '~/use/auth'
import TForm from '~/components/TForm'
import TLoader from '~/components/TLoader'

export default {
  middleware: ['auth'],
  layout: (ctx) => (ctx.isMobile ? 'mobile' : 'desktop'),
  components: {
    TForm,
    TLoader
  },
  setup() {
    const {
      uid,
      account,
      signOut,
      updateAccount,
      confirmedAccount,
      loading
    } = useAuth()

    return {
      loading,
      uid,
      account,
      signOut,
      updateAccount,
      confirmedAccount
    }
  },
  data: () => ({
    fields: [
      {
        name: 'email',
        disabled: true
      },
      {
        name: 'name',
        label: 'Full Name',
        required: true,
        placeholder: '(Required)'
      }
    ]
  }),
  methods: {
    async save(data) {
      const changes = {
        ...data,
        confirmed: true
      }

      await this.updateAccount(changes)

      let target = ls('target')
      ls.remove('target')

      if (!target) {
        target = '/app'
      }

      this.$router.push(target)
    }
  }
}
</script>
