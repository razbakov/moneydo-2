<template>
  <div
    class="container mx-auto md:max-w-md md:shadow-lg md:my-4 md:border border-primary md:rounded"
  >
    <header class="bg-dark text-white font-bold h-16 flex items-center shadow">
      <THamburger v-model="isMenuOpen" class="pt-1" />
      <div class="text-lg">March</div>
    </header>
    <main class="p-2">
      <div class="nav"></div>
      <h4 class="mb-1 font-bold text-xs text-gray-600">
        Budget
      </h4>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="envelope in envelopes"
          :key="envelope.label"
          class="p-2 bg-white rounded text-gray-600 shadow-top text-center"
        >
          <div class="text-lg font-bold font-mono text-green-500 leading-none">
            {{ envelope.today }}
          </div>
          <div class="text-xs text-gray-600">{{ envelope.label }}</div>
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
  </div>
</template>

<script>
import TIcon from '~/components/TIcon'
import THamburger from '~/components/THamburger'

export default {
  layout: 'empty',
  transition: 'slide-down',
  components: {
    TIcon,
    THamburger
  },
  data: () => ({
    isMenuOpen: false,
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
  })
}
</script>
