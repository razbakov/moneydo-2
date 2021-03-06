<template>
  <div class="flex flex-col">
    <div v-if="editable" class="flex justify-end mb-4">
      <TButton class="mr-2" @click="download">Download</TButton>
      <TButton @click="removeSelected">Delete</TButton>
    </div>
    <div class="bg-white py-4 flex flex-row mb-4 items-center border-b">
      <input
        v-model="selectedAll"
        type="checkbox"
        class="mb-2 md:ml-2 md:mb-0"
        @click="selectAll(!selectedAll)"
      />

      <TInputSelect
        v-model="activeFilter"
        class="mb-2 md:ml-2 md:mb-0"
        :options="filterOptions"
      />
      <TInput
        v-model="nameFilter"
        class="mb-2 md:ml-2 md:mb-0"
        placeholder="Search"
      />
    </div>

    <div :class="{ 'overflow-y-scroll h-64': verticalScroll }">
      <div class="mb-4 text-center text-xs">{{ items.length }} users</div>
      <div
        v-for="item in items"
        :key="item.id"
        :class="{ 'border-green-500': item.selected }"
        class="p-4 mb-4 border border-gray-500 rounded"
      >
        <div class="flex flex-col md:flex-row">
          <div>
            <div
              class="border w-4 h-4 rounded-full border-gray-500 mr-2"
              :class="selected[item.id] ? 'bg-green-500 border-green-500' : ''"
              @click="select(item)"
            ></div>
          </div>
          <div class="flex-grow">
            <div class="float-right -mr-2">
              <TMenu>
                <template v-slot:button>
                  <TIcon
                    class="cursor-pointer rounded-full hover:bg-gray-200 p-1"
                    name="more_vert"
                  />
                </template>
                <template v-slot:menu="{ closeMenu }">
                  <div class="p-4 bg-white rounded-lg shadow-xl border">
                    <TField
                      v-model="item.lists"
                      hide-label
                      type="multi"
                      :options="list"
                      @input="(val) => applyList(item.id, val, closeMenu)"
                    />

                    <TButtonEditProfile :uid="item.id" class="mt-4" />
                  </div>
                </template>
              </TMenu>
            </div>
            <div>{{ item.name }} &lt;{{ item.email }}&gt;</div>
            <pre v-if="item.marketing.ref" class="text-xs">
ref: {{ item.marketing.ref }}</pre
            >
            <pre v-if="Object.keys(item.marketing.utms).length" class="text-xs">
utms: {{ item.marketing.utms }}</pre
            >
            <pre class="text-xs">joined: {{ getDate(item.createdAt) }}</pre>
            <pre class="text-xs">used: {{ item.daysUsed }} days</pre>
          </div>
        </div>

        <div class="flex justify-end">
          <div v-if="item.lists" class="text-xs">
            {{ Object.keys(item.lists).join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { computed, ref } from '@vue/composition-api'
import useCollection from '~/use/collection'
import useDoc from '~/use/doc'
import { sortBy, getTime, getDate, saveCSV } from '~/utils'

export default {
  name: 'TGridAccounts',
  props: {
    value: {
      type: [Object, String],
      default: () => ({})
    },
    verticalScroll: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { docs } = useCollection('accounts', false, true)
    const { remove: removeAccount, update: updateAccount } = useDoc('accounts')
    const nameFilter = ref('')
    const activeFilter = ref('')
    const selectedAll = ref(false)
    const selected = ref({})
    const list = ref([
      {
        value: 'Lead',
        label: 'Lead'
      },
      {
        value: 'Trial',
        label: 'Trial'
      },
      {
        value: 'Membership',
        label: 'Membership'
      }
    ])
    const applyList = (id, lists, closeMenu) => {
      updateAccount(id, {
        lists
      })
      closeMenu()
    }

    const filterOptions = computed(() => [
      {
        value: '',
        label: `Everyone (${docs.value.length})`,
        filter: (account) => true
      },
      {
        value: 'selected',
        label: `Selected (${Object.keys(selected.value).length})`,
        filter: (account) => selected.value[account.id]
      },
      {
        value: 'used_more_10d',
        label: 'More than 10 days',
        filter: (account) => account.daysUsed > 10
      },
      {
        value: 'used_more_1d',
        label: 'More than 1 day',
        filter: (account) => account.daysUsed > 1
      },
      {
        value: 'used_less_2d',
        label: 'Less than 2 day',
        filter: (account) => account.daysUsed < 2
      }
    ])

    const activeFilterItem = computed(() =>
      filterOptions.value.find((item) => item.value === activeFilter.value)
    )

    const matchString = (str, match) => {
      if (!str) {
        return false
      }

      return str.toLowerCase().includes(match)
    }

    const items = computed(() =>
      docs.value
        .filter(activeFilterItem.value.filter)
        .filter((item) => {
          if (!nameFilter.value || !nameFilter.value.toLowerCase) {
            return true
          }

          const search = nameFilter.value.toLowerCase()

          return (
            matchString(item.name, search) || matchString(item.email, search)
          )
        })
        .sort(sortBy('-createdAt'))
    )

    return {
      nameFilter,
      activeFilter,
      filterOptions,
      selectedAll,
      items,
      getTime,
      selected,
      getDate,
      removeAccount,
      list,
      applyList
    }
  },
  computed: {
    count() {
      return Object.keys(this.selected).length
    }
  },
  watch: {
    value: 'load',
    selected(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      if (!this.value) {
        this.selected = {}
        return
      }

      this.selected = this.value
    },
    download() {
      saveCSV(this.items)
    },
    removeSelected() {
      Object.keys(this.selected).forEach((uid) => {
        this.removeAccount(uid)
      })

      this.selected = {}
    },
    select(item, mark) {
      if (typeof mark === 'undefined') {
        mark = !this.selected[item.id]
      }

      if (mark) {
        Vue.set(this.selected, item.id, {
          email: item.email,
          name: item.name
        })
      } else {
        Vue.delete(this.selected, item.id)
      }
    },
    selectAll(mark) {
      this.items.forEach((item) => {
        this.select(item, mark)
      })
    }
  }
}
</script>
