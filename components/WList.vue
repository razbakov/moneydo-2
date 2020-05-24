<template>
  <w-grid :cols="cols">
    <div v-for="(item, index) in items" :key="index">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </w-grid>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    cols: {
      type: [String, Number],
      default: 2
    }
  }
}
</script>
