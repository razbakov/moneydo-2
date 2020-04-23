<template>
  <div class="container mx-auto md:max-w-lg md:mb-16">
    <main class="card">
      <TLoader v-if="loading || signingIn" />
      <div v-else-if="emailSent" class="typo">
        <h2>Almost there</h2>
        <p>Check your email and click the invitation link.</p>
      </div>
      <div v-else>
        <div class="typo">
          <h2>Sign in with</h2>
        </div>
        <div class="text-center">
          <TButton
            class="w-full flex items-center justify-center"
            @click="signInWithGoogle"
          >
            <TIcon name="google" />
            Google
          </TButton>
        </div>
        <div class="divider">or</div>
        <form class="md:flex items-end" @submit.prevent="submit">
          <TField
            v-model="email"
            type="email"
            placeholder="elon@musk.com"
            label="Email"
            label-position="top"
          />
          <TButton type="primary" class="mt-2 w-full md:mt-0 md:w-24 md:ml-4">
            Sign In
          </TButton>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import TLoader from '~/components/TLoader'
import useAuth from '~/use/auth'
import TButton from '~/components/TButton'
import TIcon from '~/components/TIcon'
import TField from '~/components/TField'

export default {
  components: {
    TLoader,
    TButton,
    TIcon,
    TField
  },
  data: () => ({
    email: '',
    emailSent: false
  }),
  setup() {
    const {
      uid,
      loading,
      signingIn,
      signInWithGoogle,
      sendSignInLinkToEmail,
      signOut
    } = useAuth()

    return {
      uid,
      loading,
      signingIn,
      signInWithGoogle,
      sendSignInLinkToEmail,
      signOut
    }
  },
  watch: {
    uid: {
      handler(val) {
        if (val) {
          let target = window.localStorage.getItem('target')
          window.localStorage.removeItem('target')

          if (!target) {
            target = '/app'
          }

          this.$router.push(target)
        }
      }
    }
  },
  methods: {
    submit() {
      this.sendSignInLinkToEmail(this.email)
      this.emailSent = true
    }
  }
}
</script>
