import api from './api'

export const state = () => ({
  data: [],
  loading: false,
  index: undefined
})

export const getters = {
  data (state) {
    return state.data
  },
  loading (state) {
    return state.loading
  }
}

export const mutations = {
  add (state, apartment) {
    if (typeof apartment.l === 'undefined' || typeof apartment.g === 'undefined') {
      throw new TypeError(`malformed geo location { lat: ${apartment.l}, lng: ${apartment.g} }`)
    }
    if (typeof apartment.id === 'undefined') {
      apartment.id = Math.max(state.data.map(s => s.id)) + 1
    } else {
      for (const entry of state.data) {
        if (entry.id === apartment.id) { throw new Error('double entry') }
      }
    }

    state.data.push(apartment)
  },
  reset (state) {
    state.data = []
    state.index = undefined
  },
  save (state, data) {
    state.data = data
  },
  loading (state, value) {
    state.loading = !!value
  },
  activate (state, id) {
    state.index = state.data.findIndex(item => item.id === id)
  }
}

export const actions = {
  fetch ({ commit }, params) {
    return new Promise((resolve, reject) => {
      try {
        commit('loading', true)
        resolve(api.getApartments(params))
      } catch (error) {
        reject(error)
      }
    })
      .then((result) => {
        commit('save', result)
        commit('loading', false)
        return result.length > 0
      })
  }
}
