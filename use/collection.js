import Vue from 'vue'
import { computed, toRefs } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = Vue.observable({})

export default (name, filter, onLoaded) => {
  let field = ''
  let value = ''

  if (filter) {
    field = Object.keys(filter)[0]
    value = filter[field]
  }

  const hash = `${name}-${field}-${value}`

  if (!state[hash]) {
    const firestore = firebase.firestore()
    const collection = firestore.collection(name)

    let filteredCollection = collection

    Vue.set(state, hash, {})

    if (filter) {
      const field = Object.keys(filter)[0]
      const value = filter[field]

      filteredCollection = collection.where(field, '==', value)
    }

    filteredCollection.onSnapshot((snapshot) => {
      if (onLoaded) {
        onLoaded()
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified' || change.type === 'added') {
          Vue.set(state[hash], change.doc.id, change.doc.data())
        }
        if (change.type === 'removed') {
          Vue.delete(state[hash], change.doc.id)
        }
      })
    })
  }

  function getById(id) {
    if (!state[hash]) {
      return {}
    }

    return state[hash][id]
  }

  const docs = computed(() => {
    if (!state[hash]) {
      return []
    }

    return Object.keys(state[hash]).map((key) => ({
      ...state[hash][key],
      id: key
    }))
  })

  return {
    ...toRefs(state),
    getById,
    docs
  }
}
