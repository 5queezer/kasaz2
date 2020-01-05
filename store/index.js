import api from './api'

export const state = () => ({
  data: [],
  loading: false,
  index: undefined
})

export const getters = {
  data (state) {
    return state.data
  }
}

export const mutations = {
  reset (state) {
    state.data = []
    state.index = undefined
  },
  set(state, data) {
    state.data = data
  },
  loading(state, value) {
    state.loading = !!value
  },
  activate(state, id) {
    state.index = state.data.findIndex(item => item.id === id)
  }
}

export const actions = {
  fetch ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('loading', true)
        const apartments = await api.getApartments(params)
        commit('set', apartments)
        commit('loading', false)
        resolve(apartments.length)
      } catch (error) {
        reject(error)
      }
    })
  }
}
