import apartmentFixture from './fixtures/apartment.json'
import { mutations, state } from '@/store/index'

describe('Main Data Mutations', () => {
  let fixture

  beforeEach(() => {
    mutations.reset(state)
    fixture = JSON.parse(JSON.stringify(apartmentFixture))
  })

  it('adds a new apartment', () => {
    // act
    mutations.add(state, fixture)

    // assert
    expect(state.data.length).toBe(1)
    expect(state.data[0]).toEqual(fixture)
  })

  it('can assign an array', () => {
    const max = 100
    const data = []
    for (let i = 0; i < max; i++) {
      fixture.id = i
      data.push(fixture)
    }

    // act
    mutations.save(state, data)

    // assert
    expect(state.data.length).toBe(max)
  })

  it('can activate entry by object id', () => {
    const id = fixture.id

    // act
    mutations.save(state, [fixture])
    mutations.activate(state, id)

    // assert
    expect(state.index).toBe(0)
  })

  it('throws error with entry of same id', () => {
    fixture.id = 0
    const call = () => mutations.add(state, fixture)

    // first call
    expect(call).not.toThrowError()

    // second call
    expect(call).toThrowError(Error)
  })
})
