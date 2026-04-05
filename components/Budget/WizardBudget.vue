<template>
  <div>
    <h2 class="text-gray-700 text-xl font-bold mb-2">
      Envelope Allocation
    </h2>
    <p class="mb-4 text-gray-500">
      Distribute your remaining budget across four envelopes. We've
      pre-calculated based on the 50/30/20 rule.
    </p>

    <div class="p-3 bg-gray-100 rounded mb-4">
      <div class="flex justify-between text-gray-700">
        <span>Income</span>
        <span class="font-mono">{{ income }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1">
        <span>Fixed Expenses</span>
        <span class="font-mono">-{{ expenses }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1">
        <span>Savings</span>
        <span class="font-mono">-{{ savings }}</span>
      </div>
      <div class="flex justify-between text-gray-700 mt-1 border-t pt-1">
        <span class="font-bold">To allocate</span>
        <span class="font-mono font-bold">{{ leftover }}</span>
      </div>
    </div>

    <div v-for="envelope in envelopesList" :key="envelope.name" class="mb-4">
      <TField
        :value="localPlanned[envelope.name]"
        :label="envelope.label"
        type="tel"
        class="rounded border p-2"
        :description="envelope.description"
        @input="updateEnvelope(envelope.name, $event)"
      />
    </div>

    <div
      class="mt-4 p-3 rounded"
      :class="balance === 0 ? 'bg-green-100' : 'bg-orange-100'"
    >
      <div class="flex justify-between">
        <span
          class="font-bold"
          :class="balance === 0 ? 'text-green-700' : 'text-orange-700'"
        >
          Balance
        </span>
        <span
          class="font-mono font-bold"
          :class="balance === 0 ? 'text-green-700' : 'text-orange-700'"
        >
          {{ balance }}
        </span>
      </div>
    </div>

    <TTip v-if="balance !== 0" type="warning" class="mt-4">
      Adjust your envelopes so the balance is 0. You have
      {{
        balance > 0
          ? balance + ' left to allocate'
          : Math.abs(balance) + ' over-allocated'
      }}.
    </TTip>

    <TTip v-else type="success" class="mt-4">
      Your budget is balanced. Every euro is accounted for.
    </TTip>
  </div>
</template>

<script>
import TField from '~/components/TField'
import TTip from '~/components/TTip'
import useEnvelopes from '~/use/envelopes'

export default {
  components: {
    TField,
    TTip
  },
  props: {
    planned: {
      type: Object,
      default: () => ({})
    },
    income: {
      type: [String, Number],
      default: 0
    },
    expenses: {
      type: [String, Number],
      default: 0
    },
    savings: {
      type: [String, Number],
      default: 0
    }
  },
  setup() {
    const { envelopes } = useEnvelopes()
    return { envelopesList: envelopes }
  },
  computed: {
    localPlanned() {
      return this.planned || {}
    },
    leftover() {
      return (
        parseInt(this.income || 0) -
        parseInt(this.expenses || 0) -
        parseInt(this.savings || 0)
      )
    },
    envelopesTotal() {
      return Object.values(this.localPlanned).reduce(
        (sum, val) => sum + parseInt(val || 0),
        0
      )
    },
    balance() {
      return this.leftover - this.envelopesTotal
    }
  },
  methods: {
    updateEnvelope(name, value) {
      const updated = { ...this.localPlanned, [name]: value }
      this.$emit('update:planned', updated)
    }
  }
}
</script>
