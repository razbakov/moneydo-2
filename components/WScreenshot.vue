<template>
  <div class="mt-8 flex items-center">
    <div class="text-left mr-4 w-1/2">
      <slot />
    </div>
    <div v-if="src" class="flex justify-center w-1/2">
      <img :src="src" :alt="alt" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'Widget'
    }
  }
}
</script>
