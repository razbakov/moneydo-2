<template>
  <div class="flex items-end justify-center my-16">
    <div class="p-4">
      <h1 class="font-bold text-4xl text-center leading-tight">
        {{ title }}
      </h1>
      <p class="text-lg text-center mt-2">
        {{ subtitle }}
      </p>
      <div class="flex justify-center mt-3 p-4 w-full md:flex">
        <TButton v-if="!uid" type="primary" :to="to">
          {{ button }}
        </TButton>
        <TButton v-else type="primary" to="/app/">
          {{ $t('dashboard.from_home') }}
        </TButton>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from '~/use/auth'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { uid } = useAuth()

    return {
      uid
    }
  }
}
</script>
