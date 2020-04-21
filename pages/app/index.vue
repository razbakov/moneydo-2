<template>
  <main class="p-2 bg-light">
    <portal to="title">
      <transition appear name="slide-down">
        <div class="text-lg">March</div>
      </transition>
    </portal>
    <div
      v-if="isPointerShown"
      class="rounded-full w-6 h-6 bg-primary absolute"
      :style="{ left: mouseLeft - 12 + 'px', top: mouseTop - 12 + 'px' }"
    ></div>
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
        v-touch:touchhold="editCategory(categoryIndex)"
        :to="`/app/${categoryIndex}`"
      >
        <div
          class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex justify-between p-2"
        >
          <div class="flex">
            <div
              class="w-6 ml-2 mr-4 flex items-center text-primary justify-center"
            >
              <TIcon v-if="category.icon" :name="category.icon" />
            </div>
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
            {{ category.total || 0 }}
          </div>
        </div>
      </router-link>

      <div
        class="bg-white cursor-pointer hover:bg-gray-200 rounded shadow mb-2 flex items-center text-gray-600 p-2"
        @click="addCategory"
      >
        <div class="w-6 ml-2 mr-4 text-3xl leading-none text-center">+</div>
        <div class="text-xs font-bold leading-none">
          Add Category
        </div>
      </div>
    </div>
    <TPopup
      v-if="isMovingEditorShown"
      :title="
        `Moving from ${envelopes[draggingItem].label} to ${envelopes[draggingTo].label}`
      "
      @close="moveend()"
    >
      <TField v-model="movingAmount" auto-focus label="Amount" type="tel" />
      <TField :label="envelopes[draggingItem].label">
        <div class="font-mono">
          {{ envelopes[draggingItem].today - parseInt(movingAmount || 0) }}
        </div>
      </TField>
      <TField :label="envelopes[draggingTo].label">
        <div class="font-mono">
          {{ envelopes[draggingTo].today + parseInt(movingAmount || 0) }}
        </div>
      </TField>
      <div class="flex justify-end">
        <TButton type="link" @click="moveend()">Cancel</TButton>
        <TButton type="primary" @click="moveend()">Move</TButton>
      </div>
    </TPopup>
    <TPopup
      v-if="editingCategory !== -1"
      :title="categories[editingCategory] ? 'Edit Cateogry' : 'Add Category'"
      @close="editingCategory = -1"
    >
      <TField
        v-model="categories[editingCategory].label"
        v-focus
        label="Name"
      />
      <TSelect
        v-model="categories[editingCategory].envelope"
        label="Envelope"
        :options="envelopes.map((e) => e.label)"
      />
      <TSelect
        v-model="categories[editingCategory].icon"
        label="Icon"
        :options="[
          'car',
          'coffee',
          'fridge',
          'house',
          'lobby',
          'notes',
          'store'
        ]"
      />
      <div class="flex justify-between">
        <TButton type="secondary" color="red-500" @click="editingCategory = -1"
          >Delete</TButton
        >
        <div class="flex justify-end">
          <TButton type="link" @click="editingCategory = -1">Cancel</TButton>
          <TButton type="primary" @click="editingCategory = -1">{{
            categories[editingCategory] ? 'Save' : 'Add'
          }}</TButton>
        </div>
      </div>
    </TPopup>
  </main>
</template>

<script>
import TIcon from '~/components/TIcon'
import TPopup from '~/components/TPopup'
import TField from '~/components/TField'
import TSelect from '~/components/TSelect'
import TButton from '~/components/TButton'

export default {
  layout: 'app',
  transition: 'slide-down',
  components: {
    TIcon,
    TPopup,
    TField,
    TSelect,
    TButton
  },
  data: () => ({
    category: {},
    movingAmount: null,
    editingCategory: -1,
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
  watch: {
    isMovingEditorShown() {
      this.movingAmount = null
    }
  },
  methods: {
    addCategory() {
      const length = this.categories.push({})
      this.editingCategory = length - 1
    },
    editCategory(categoryIndex) {
      return () => {
        this.editingCategory = categoryIndex
      }
    },
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
