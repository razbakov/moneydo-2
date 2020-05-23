<template>
  <div :class="`md:grid grid-cols-${cols} gap-4`">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>
