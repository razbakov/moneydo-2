<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </a>
  <router-link v-else-if="to" :class="classes" :to="to" v-on="$listeners">
    <slot />
  </router-link>
  <button v-else type="button" :class="classes" v-on="$listeners">
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
    href: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'simple'
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      const map = {
        simple:
          'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
        primary:
          'bg-primary no-underline text-white font-semibold py-2 px-4 rounded hover:text-white hover:bg-dark',
        base:
          'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow',
        secondary:
          'bg-transparent text-primary font-semibold py-2 px-4 border border-primary rounded no-underline hover:bg-primary hover:text-white hover:border-transparent',
        link: 'underline font-semibold py-2 px-4 hover:no-underline',
        nav:
          'w-full text-left border-b border-primary rounded block font-semibold py-2 px-4 hover:bg-primary'
      }

      let classes =
        map[this.type] + ' outline-none focus:outline-none cursor-pointer'

      if (this.color) {
        classes += ` text-${this.color} border-${this.color} hover:bg-${this.color} hover:text-white`
      }

      return classes
    }
  }
}
</script>
