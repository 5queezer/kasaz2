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

  it.skip('can remove a filter', () => {
    const name = 'filters[price][max]'
    const newValue = 1e6
    mutations.set(state, { name, newValue })
    mutations.set(state, { name, newValue: undefined })
    expect(state).not.toHaveProperty(name)
  })
})
