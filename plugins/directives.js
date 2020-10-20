import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import VueTour from 'vue-tour'
import WScreenshot from '~/components/WScreenshot'
import WFlex from '~/components/WFlex'
import WGrid from '~/components/WGrid'
import WBlock from '~/components/WBlock'
import WSlides from '~/components/WSlides'
import WList from '~/components/WList'
import WHero from '~/components/WHero'

Vue.component('WScreenshot', WScreenshot)
Vue.component('WGrid', WGrid)
Vue.component('WFlex', WFlex)
Vue.component('WBlock', WBlock)
Vue.component('WSlides', WSlides)
Vue.component('WList', WList)
Vue.component('WHero', WHero)

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

Vue.use(Vue2TouchEvents)
Vue.use(VueTour)

// document.oncontextmenu = () => {
//   return false
// }
