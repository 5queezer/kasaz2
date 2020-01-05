import { actions } from '@/store/index'
import api from '@/store/api'
jest.mock('@/store/api')

describe('store actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
  })

  it('can fetch', async () => {
    const resp = [{ id: 0 }, { id: 1 }]
    api.getApartments.mockResolvedValue(resp)
    await actions.fetch({ commit })
    expect(commit).toBeCalledWith('set', resp)
  })
})
