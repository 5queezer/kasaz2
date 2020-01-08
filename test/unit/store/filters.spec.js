import { mutations, state } from '@/store/filters'
import { traverse } from '@/assets/api'

describe('Filter Mutations', () => {
  beforeEach(() => {
    mutations.reset(state)
  })

  it('set a filter with { key, value }', () => {
    const key = 'filters[price][max]'
    const value = 1e6

    // set
    mutations.set(state, { key, value })
    expect(state.filters.price).toHaveProperty('max', value)
  })

  it('set a filter with an object of settings', () => {
    const value = 1e6
    const filters = {
      price: {
        max: value
      }
    }

    // set
    mutations.set(state, { filters })
    expect(state.filters.price).toHaveProperty('max', value)
  })

  it('remove a filter with { key, value } 1', () => {
    const key = 'filters[price][max]'
    const value = 1e6

    // set
    mutations.set(state, { key, value })
    expect(state.filters.price).toHaveProperty('max', value)

    // remove
    mutations.set(state, { key, value: null })
    expect(state.filters.price).not.toHaveProperty('max')
  })
  it('remove a filter with { key, value } 2', () => {
    const key = 'filters[bathrooms]'
    const value = 1

    // set
    mutations.set(state, { key, value })
    expect(state.filters).toHaveProperty('bathrooms', value)

    // remove
    mutations.set(state, { key, value: null })
    expect(state.filters).not.toHaveProperty('bathrooms')
  })

  it('remove a filter with an object-scheme', () => {
    const filters = {
      price: {
        max: 1e6
      },
      bedrooms: 1
    }

    // set
    mutations.set(state, { filters })

    // remove
    filters.price.max = undefined
    filters.bedrooms = undefined
    mutations.set(state, { filters })

    expect(state.filters.price).not.toHaveProperty('max')
    expect(state.filters).not.toHaveProperty('bedrooms')
  })

  it('flatten an object structure', () => {
    const params = {
      filters: {
        sortby: 'relevance',
        price: { min: 0 },
        surface: { min: 20, max: undefined },
        bathrooms: 0
      }
    }
    const results = {}
    for (const [key, value] of traverse(params)) {
      results[key] = value
    }
    expect(results).toEqual({
      'filters[sortby]': 'relevance',
      'filters[price][min]': 0,
      'filters[price][surface][min]': 20,
      'filters[price][surface][bathrooms]': 0
    })
  })
})
