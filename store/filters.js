import deepCleaner from 'deep-cleaner'
import { mergeDeep } from '@/assets/utils'

export const state = () => ({
  // init state with reset first
  // filters: {},
  // locale: '',
  // location: {},
  // viewport: {}
})
export const getters = {
  get (state) {
    return state
  }
}
export const mutations = {
  set (state, param) {
    if (param.key && typeof param.value !== 'undefined') {
      // key as string of object structure
      // e.g. filters[price][max]
      const value = param.value
      const command = param.key.split(']').join('').split(/\[+/)
      const last = command.pop()
      let key = state
      command.forEach((attribute) => {
        if (!key[attribute]) {
          key.attribute = {}
        }
        key = key[attribute]
      })
      if (value === null) {
        delete key[last]
      } else {
        key[last] = value
      }
    } else {
      for (const [key, value] of Object.entries(param)) {
        if (!state[key]) {
          state.key = value
        } else {
          state[key] = mergeDeep(state[key], value)
        }
      }
      deepCleaner(state)
    }
  },
  reset (state) {
    // filter scheme
    const init = {
      filters: {
        lodgingType: {
          attic: true,
          duplex: true,
          flat: true,
          ground_floor: true,
          house: true,
          loft: true,
          studio: true
        },
        showHiddenListings: false,
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
