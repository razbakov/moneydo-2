<template>
  <div class="mt-8 flex items-center">
    <div class="text-left mr-4 w-1/2">
      {{ alt }}
    </div>
    <div class="flex justify-center w-1/2">
      <img :src="src" :alt="alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'widget-screenshot',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>
