<template>
  <div class="border text-brand-black relative mb-8">
    <button
      class="absolute left-0 mt-40 ml-2 w-6 h-6 text-brand-black rounded-full flex justify-center content-center hover:text-brand-primary"
      @click="dec"
    >
      <TIcon name="back" />
    </button>
    <button
      class="absolute right-0 mt-40 mr-2 w-6 h-6 text-brand-black rounded-full flex justify-center content-center hover:text-brand-primary"
      @click="inc"
    >
      <TIcon name="forward" />
    </button>

    <div class="text-center mb-2">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="block"
        :class="current === index ? 'block' : 'hidden'"
      >
        <div
          class="font-bold mb-6 h-16 text-2xl leading-tight text-center flex justify-center items-center"
        >
          <div>{{ slide.title }}</div>
        </div>
        <div class="text-center">
          <img
            class="inline-block h-64"
            :src="slide.image"
            :alt="slide.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    current: 0,
    autoInterval: null
  }),
  computed: {
    max() {
      return this.slides.length - 1
    }
  },
  mounted() {
    if (this.auto) {
      if (this.autoInterval) {
        clearInterval(this.autoInterval)
      }

      this.autoInterval = setInterval(() => {
        this.inc()
      }, 1000)
    }
  },
  beforeDestroy() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval)
    }
  },
  methods: {
    inc() {
      if (this.current >= this.max) {
        this.current = 0
      } else {
        this.current++
      }
    },
    dec() {
      if (this.current <= 0) {
        this.current = this.max
      } else {
        this.current--
      }
    }
  }
}
</script>
