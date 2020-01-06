import { mutations, state } from '@/store/filters'

describe('Filter Mutations', () => {
  beforeEach(() => {
    mutations.reset(state)
  })

  it('can set a filter', () => {
    const name = 'filters[price][max]'
    const newValue = 1e6
    mutations.set(state, { name, newValue })
    expect(state).toHaveProperty(name, newValue)
  })

  it('can remove a filter', () => {
    const name = 'filters[price][max]'
    const newValue = 1e6
    mutations.set(state, { name, newValue })
    mutations.set(state, { name, newValue: undefined })
    expect(state).not.toHaveProperty(name)
  })
})
