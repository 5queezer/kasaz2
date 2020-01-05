import api from './api'

export const state = () => ({
  data: [],
  loading: false,
  index: undefined,
  perPage: 10
})

export const getters = {
  data (state) {
    return state.data
  },
  loading (state) {
    return state.loading
  },
  page (state) {
    return state.index ? parseInt(state.index / state.perPage) + 1 : 1
  },
  perPage (state) {
    return state.perPage
  },
  paginated (state, getters) {
    const start = (getters.page % state.perPage) - 1
    const end = start + state.perPage
    return getters.data.slice(start, end)
  },
  count (state) {
    return state.data.length
  },
  getIndex (state) {
    return state.index
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
  },
  setPage (state, page) {
    const startIndex = (page * state.perPage) - state.perPage
    const offset = state.index % 10
    state.index = startIndex + offset
  },
  next (state) {
    const index = state.index + state.perPage
    const max = state.data.length - 1
    state.index = index > max ? max : index
  },
  prev (state) {
    const index = state.index - state.perPage
    state.index = index < 0 ? 0 : index
  },
  begin (state) {
    state.index = state.data.length > 0 ? 0 : undefined
  },
  end (state) {
    const max = state.data.length - 1
    state.index = max
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
