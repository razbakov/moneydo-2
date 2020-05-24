<template>
  <div class="grid grid-cols-12 gap-4 p-4">
    <div class="col-span-5 flex items-center">
      <div @mouseleave="restart">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="block text-left w-full cursor-pointer hover:text-brand-black font-bold"
          :class="
            current === index ? 'text-brand-black' : 'text-brand-primary+2'
          "
          @mouseover="goto(index)"
        >
          <div class="py-2 leading-tight">
            {{ slide.title }}
          </div>
          <div
            :style="{ width: `${progress}%` }"
            :class="
              current === index
                ? 'border-brand-dark border-b-2'
                : 'border-brand-white border-b-2'
            "
          ></div>
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
      default: 1000
    }
  },
  data: () => ({
    current: 0,
    autoInterval: null,
    timeLeft: 0
  }),
  computed: {
    max() {
      return this.slides.length - 1
    },
    progress() {
      if (!this.interval) {
        return 100
      }

      return ((this.interval - this.timeLeft) / this.interval) * 100
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
        this.timeLeft = this.interval
        clearInterval(this.autoInterval)
      }
    },
    restart() {
      if (this.auto) {
        this.timeLeft = this.interval
        const progressIncrement = 1

        if (this.autoInterval) {
          clearInterval(this.autoInterval)
        }

        this.autoInterval = setInterval(() => {
          this.timeLeft -= progressIncrement

          if (this.timeLeft < 0) {
            this.timeLeft = this.interval
            this.inc()
          }
        }, progressIncrement)
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
