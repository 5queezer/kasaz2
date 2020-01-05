import apartmentFixture from './fixtures/apartment.json'
import { actions } from '@/store/index'
import api from '@/store/api'
jest.mock('@/store/api')

describe('store actions', () => {
  let commit
  let fixture

  beforeEach(() => {
    commit = jest.fn()
    fixture = JSON.parse(JSON.stringify(apartmentFixture))
  })

  it('can fetch', async () => {
    const response = [{ ...fixture, id: 0 }]
    api.getApartments.mockResolvedValue(response)
    await actions.fetch({ commit })
    expect(commit).toBeCalledWith('save', response)
  })
})
