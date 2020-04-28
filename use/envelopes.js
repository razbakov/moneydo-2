const envelopes = [
  {
    label: 'Needs',
    name: 'needs',
    description:
      'Things you can’t live without, like food, toilet paper and shampoo.'
  },
  {
    label: 'Wants',
    name: 'wants',
    description:
      'Purchases you enjoy but don’t need, like a takeout meal or pair of new shoes.'
  },
  {
    label: 'Culture',
    name: 'culture',
    description:
      'Things that enrich your life, like museums, books and education.'
  },
  {
    label: 'Extra',
    name: 'extra',
    description:
      'Unexpected costs that we all need to pay for, like a doctor’s visit, car repair or unplanned presents.'
  }
]

export default () => {
  function getEnvelope(name) {
    const result = envelopes.find((e) => e.name === name)

    if (!result) {
      return {}
    }

    return result
  }

  return { envelopes, getEnvelope }
}
