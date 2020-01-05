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
    api.getApartments.mockResolvedValue([fixture])
    await actions.fetch({ commit })
    expect(commit).toBeCalledWith('save', [fixture])
  })
})
