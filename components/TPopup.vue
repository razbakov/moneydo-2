<template>
  <div>
    <div
      class="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-40"
    ></div>

    <div
      class="absolute w-full h-full top-0 left-0 flex items-end md:items-center justify-center z-50"
    >
      <transition appear name="slide-up">
        <div class="bg-white p-4 rounded w-full md:w-auto">
          <h4 class="font-bold text-lg mb-4">
            {{ title }}
          </h4>
          <div class="p-2">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
    const el = document.getElementsByTagName('body')[0]
    el.classList.add('overflow-y-hidden')
  },
  beforeDestroy() {
    const el = document.getElementsByTagName('body')[0]
    el.classList.remove('overflow-y-hidden')
  }
}
</script>

<style></style>
