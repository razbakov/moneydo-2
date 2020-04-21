import Vue from 'vue'
import LongPress from 'vue-directive-long-press'

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

Vue.directive('long-press', LongPress)

document.oncontextmenu = () => {
  return false
}
