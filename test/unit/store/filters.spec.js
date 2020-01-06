import { mutations, state } from '@/store/filters'

describe('Filter Mutations', () => {
  beforeEach(() => {
    mutations.reset(state)
  })

  it('can set a filter with key and value', () => {
    const key = 'filters[price][max]'
    const value = 1e6
    mutations.set(state, { key, value })
    expect(state.filters.price).toHaveProperty('max', value)
  })

  it('can set a filter with an object', () => {
    const newValue = 1e6
    const filters = {
      price: {
        max: newValue
      }
    }
    mutations.set(state, { filters })
    expect(state.filters.price).toHaveProperty('max', newValue)
  })

  it('can remove a filter', () => {
    const key = 'filters[price][max]'
    const value = 1e6
    mutations.set(state, { key, value })
    mutations.set(state, { key, value: undefined })
    expect(state).not.toHaveProperty(name)
  })

  it('can remove a filter object-style', () => {
    const filters = {
      price: {
        max: 1e6
      }
    }
    mutations.set(state, { filters })
    filters.price.max = undefined
    mutations.set(state, { filters })
    expect(state.filters.price).not.toHaveProperty('max')
  })
})
