<template>
  <div
    :class="
      `mt-4 bg-${finalColor}-100 border border-${finalColor}-400 text-${finalColor}-700 px-4 py-3 rounded relative`
    "
    role="alert"
  >
    <strong v-if="type === 'tip'" class="font-bold">Tip: </strong>
    <strong v-if="type === 'warning'" class="font-bold">Warning: </strong>
    <span class="block sm:inline">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'tip'
    },
    color: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    colors: {
      tip: 'blue',
      warning: 'orange',
      success: 'green',
      error: 'red'
    }
  }),
  computed: {
    finalColor() {
      return this.color ? this.color : this.colors[this.type] || 'blue'
    }
  }
}
</script>
