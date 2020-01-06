export const state = () => ({
  // init state with reset first
  filters: {},
  locale: '',
  location: {},
  viewport: {}
})
export const getters = {
  get (state) {
    return state
  }
}
export const mutations = {
  set (state, param) {
    if (typeof param === 'object') {
      if (param.key && param.value) {
        const command = param.key.split(']').join('').split(/\[+/)
        const last = command.pop()
        let path = state
        command.forEach((attribute) => {
          path = path[attribute]
        })
        path[last] = param.value
      } else {
        for (const [key, value] of Object.entries(param)) {
          state[key] = JSON.parse(JSON.stringify(value))
        }
      }
    }
  },
  reset (state) {
    const init = {
      filters: {
        sortby: 'relevance',
        price: {
          min: undefined,
          max: undefined
        },
        surface: {
          min: undefined,
          max: undefined
        },
        bedrooms: undefined,
        bathrooms: undefined
      },
      locale: 'es',
      location: { city: 'Barcelona' },
      viewport: {
        neLat: undefined,
        neLng: undefined,
        swLat: undefined,
        swLng: undefined
      }
    }
    Object.freeze(init)

    for (const [key, value] of Object.entries(init)) {
      state[key] = value
    }
  }
}
