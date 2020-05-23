<template>
  <w-grid cols="2">
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
    }
  }
}
</script>
