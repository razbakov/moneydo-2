<template>
  <div class="grid grid-cols-12 gap-4 p-4">
    <div class="col-span-5 flex items-center">
      <div @mouseleave="restart">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="block text-left w-full py-2 px-4 hover:bg-brand-primary"
          :class="
            current === index
              ? 'bg-brand-primary text-white'
              : 'bg-brand-primary+2'
          "
          @mouseover="goto(index)"
        >
          {{ slide.title }}
        </button>
      </div>
    </div>
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="block text-center align-middle col-span-7"
      :class="current === index ? 'block' : 'hidden'"
    >
      <img class="inline-block" :src="slide.image" :alt="slide.title" />
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
      default: true
    },
    interval: {
      type: Number,
      default: 2000
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
    this.restart()
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    stop() {
      if (this.autoInterval) {
        clearInterval(this.autoInterval)
      }
    },
    restart() {
      if (this.auto) {
        if (this.autoInterval) {
          clearInterval(this.autoInterval)
        }

        this.autoInterval = setInterval(() => {
          this.inc()
        }, this.interval)
      }
    },
    goto(slide) {
      this.stop()
      this.current = slide
    },
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
