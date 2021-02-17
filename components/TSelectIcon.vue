<template>
  <div>
    <TButton
      v-for="icon in icons"
      :key="icon"
      class="m-2"
      @click="$emit('input', icon)"
    >
      <TIcon :name="icon" :class="{ 'text-primary': icon === value }" />
    </TButton>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    icons: [
      'car',
      'coffee',
      'fridge',
      'house',
      'lobby',
      'notes',
      'store',
      'academic',
      'beaker',
      'book',
      'cake',
      'fire',
      'gift',
      'heart',
      'library'
    ]
  })
}
</script>
