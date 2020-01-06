export const state = () => ({
  'filters[sortBy]': 'relevance'
})
export const getters = {
  get (state) {
    // non-reactive and thus cannot be watched
    return state
  }
}
export const mutations = {
  set (state, { name, newValue }) {
    if (newValue === null || newValue === undefined) {
      delete state[name]
    } else {
      state[name] = newValue
    }
  },
  reset (state) {
    state = {
      'filters[sortBy]': 'relevance'
    }
  }
}
