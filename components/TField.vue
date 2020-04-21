<template>
  <div class="flex w-full justify-start items-top mb-6">
    <div
      v-if="label"
      class="w-1/3 text-gray-700 font-bold text-right mb-0 pr-4"
    >
      <label :for="elementId">
        {{ label }}
      </label>
    </div>
    <div class="w-2/3">
      <slot>
        <input
          :id="elementId"
          ref="input"
          v-bind="$attrs"
          autocomplete="off"
          :value.sync="value"
          class="w-full block bg-gray-200 appearance-none font-mono border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          @input="input($event)"
        />
      </slot>
    </div>
  </div>
</template>

<script>
const getId = (text) => {
  return text.replace(' ', '')
}

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    autoFocus: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    elementId: ''
  }),
  mounted() {
    this.elementId = getId(this.label)

    if (this.autoFocus) {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    input(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
