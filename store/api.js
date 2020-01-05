import { setup } from 'axios-cache-adapter'

const api = setup({
  // baseURL: 'http://localhost:43287/',
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

function getApartments (params) {
  return api.get('/response.json', { params })
    .then((response) => {
      const simulatedData = {
        data: {
          markers: response
        }
      }
      return simulatedData.data.markers
    })
}

export default {
  getApartments
}
