import apartmentFixture from './fixtures/apartment.json'
import { mutations, state } from '@/store/index'

describe('Mutations', () => {
  const add = (apartment) => { mutations.add(state, apartment) }
  const reset = () => { mutations.reset(state) }
  const set = (data) => { mutations.set(state, data) }
  const activate = (id) => { mutations.activate(state, id) }
  let fixture

  beforeEach(() => {
    reset()
    fixture = JSON.parse(JSON.stringify(apartmentFixture))
  })

  it('adds a new apartment', () => {
    // act
    add(fixture)

    // assert
    expect(state.data.length).toBe(1)
    expect(state.data[0]).toEqual(fixture)
  })

  it('can assign an array', () => {
    const max = 10
    const data = []
    for (let i = 0; i < max; i++) {
      fixture.id = i
      data.push(fixture)
    }

    // act
    set(data)

    // assert
    expect(state.data.length).toBe(max)
  })

  it('can activate entry by object id', () => {
    const id = fixture.id

    // act
    set([fixture])
    activate(id)

    // assert
    expect(state.index).toBe(0)
  })

  it('throws error with entry of same id', () => {
    fixture.id = 0
    const call = () => add(fixture)

    // first call
    expect(call).not.toThrowError()

    // second call
    expect(call).toThrowError(Error)
  })
})
