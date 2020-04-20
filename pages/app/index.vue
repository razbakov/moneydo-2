<template>
  <div
    class="container mx-auto md:max-w-md md:shadow-lg md:my-4 md:border border-primary md:rounded"
  >
    <header class="bg-dark text-white font-bold h-16 flex items-center shadow">
      <THamburger v-model="isMenuOpen" class="pt-1" />
      <div class="text-lg">March</div>
    </header>
    <main class="p-2">
      <div
        v-if="isPointerShown"
        class="rounded-full w-6 h-6 bg-primary absolute"
        :style="{ left: mouseLeft - 12 + 'px', top: mouseTop - 12 + 'px' }"
      ></div>
      <div class="nav"></div>
      <h4 class="mb-1 font-bold text-xs text-gray-600">
        Budget
      </h4>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="(envelope, envelopeIndex) in envelopes"
          :key="envelope.label"
          :class="{
            'bg-gray-200': draggingTo === envelopeIndex,
            'opacity-50': draggingItem === envelopeIndex
          }"
          class="p-2 bg-white rounded text-gray-600 shadow-top text-center"
          draggable="true"
          @dragstart="dragstart(envelopeIndex, $event)"
          @dragend="dragend($event)"
          @dragenter="dragenter(envelopeIndex, $event)"
          @dragleave="dragleave(envelopeIndex, $event)"
          @dragover.prevent
        >
          <div class="text-lg font-bold font-mono text-green-500 leading-none">
            {{ envelope.today }}
          </div>
          <div class="text-xs text-gray-600">
            {{ envelope.label }}
          </div>
        </div>
      </div>
      <div class="mt-2">
        <h4 class="mb-1 font-bold text-xs text-gray-600">
          Expenses by Category
        </h4>
        <router-link
          v-for="(category, categoryIndex) in categories"
          :key="category.label"
          :to="`/app/${categoryIndex}`"
          class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex justify-between p-2"
        >
          <div class="flex">
            <TIcon
              class="flex items-center text-primary justify-center ml-2 mr-4"
              :name="category.icon"
            />
            <div>
              <div class="text-lg text-black font-bold leading-tight">
                {{ category.label }}
              </div>
              <div class="text-xs text-gray-600 leading-none">
                {{ category.envelope }}
              </div>
            </div>
          </div>
          <div class="font-mono text-black text-lg items-center flex">
            {{ category.total }}
          </div>
        </router-link>
        <div
          class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex items-center text-gray-600 p-2"
        >
          <div class="w-6 ml-2 mr-4 text-3xl leading-none text-center">+</div>
          <div class="text-xs font-bold leading-none">
            Add Category
          </div>
        </div>
      </div>
    </main>
    <template v-if="isMovingEditorShown">
      <div
        class="absolute w-full h-full top-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute w-full h-full top-0 left-0 flex items-center justify-center"
      >
        <div class="bg-white p-4 rounded">
          <TForm
            v-model="moving"
            :fields="movingFields"
            submit-label="Move"
            show-cancel
            @cancel="moveend()"
            @save="moveend()"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TIcon from '~/components/TIcon'
import THamburger from '~/components/THamburger'
import TForm from '~/components/TForm'

export default {
  layout: 'empty',
  transition: 'slide-down',
  components: {
    TIcon,
    THamburger,
    TForm
  },
  data: () => ({
    moving: null,
    movingFields: [
      {
        name: 'amount',
        type: 'tel',
        autocomplete: 'off'
      }
    ],
    isMenuOpen: false,
    isPointerShown: false,
    draggingItem: null,
    draggingTo: null,
    isMovingEditorShown: false,
    mouseLeft: 0,
    mouseTop: 0,
    categories: [
      {
        label: 'Groceries',
        envelope: 'Needs',
        total: 130,
        icon: 'fridge'
      },
      {
        label: 'Coffee',
        envelope: 'Wants',
        total: 50,
        icon: 'coffee'
      },
      {
        label: 'House',
        envelope: 'Wants',
        total: 60,
        icon: 'house'
      },
      {
        label: 'Health',
        envelope: 'Needs',
        total: 30,
        icon: 'store'
      },
      {
        label: 'Transport',
        envelope: 'Needs',
        total: 55,
        icon: 'car'
      },
      {
        label: 'Eating out',
        envelope: 'Wants',
        total: 70,
        icon: 'lobby'
      }
    ],
    envelopes: [
      {
        label: 'Needs',
        today: 50
      },
      {
        label: 'Wants',
        today: 60
      },
      {
        label: 'Culture',
        today: 6
      },
      {
        label: 'Extra',
        today: 9
      }
    ]
  }),
  methods: {
    moveend() {
      this.isMovingEditorShown = false
      this.draggingItem = null
      this.draggingTo = null
    },
    dragstart(item, e) {
      this.draggingItem = item
      e.dataTransfer.setData('text/plain', 'dummy')
    },
    dragend(e) {
      this.isMovingEditorShown = true
    },
    dragenter(index, e) {
      this.draggingTo = index
    },
    dragleave(item, e) {},
    listenToMouseMove(isActive) {
      this.isPointerShown = isActive

      if (!this.isPointerShown) {
        document.onmousemove = () => {
          return false
        }
      }

      if (window.Event) {
        document.captureEvents(Event.MOUSEMOVE)
      }

      document.onmousemove = (e) => {
        this.mouseLeft = e.pageX
        this.mouseTop = e.pageY
      }
    }
  }
}
</script>
