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
        const value = param.value
        const command = param.key.split(']').join('').split(/\[+/)
        const last = command.pop()
        let key = state
        command.forEach((attribute) => {
          key = key[attribute]
        })
        if (value !== undefined && value !== null) {
          key[last] = value
        } else {
          delete key[last]
        }
      } else {
        for (const [key, value] of Object.entries(param)) {
          if (value !== undefined && value !== null) {
            state[key] = JSON.parse(JSON.stringify(value))
          } else {
            delete state[key]
          }
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
