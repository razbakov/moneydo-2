<template>
  <router-link
    v-if="to"
    class="cursor-pointer"
    :class="classes"
    :to="to"
    v-on="$listeners"
  >
    <slot />
  </router-link>
  <button v-else class="cursor-pointer" :class="classes" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    classes() {
      const map = {
        primary: 'btn',
        base:
          'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow',
        secondary: 'btn-secondary',
        link: 'underline font-semibold py-2 px-4 hover:no-underline',
        nav: 'block font-semibold py-2 px-4'
      }

      return map[this.type]
    }
  }
}
</script>
