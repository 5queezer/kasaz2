import { setup } from 'axios-cache-adapter'

const api = setup({
  // baseURL: 'http://localhost:43287/',
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

function getApartments (params) {
  let url
  if (typeof params === 'undefined') {
    params = {}
  }
  if (process.env.NODE_ENV === 'development') {
    url = `/response.json?random=${Math.random().toString(36).substring(7)}`
  } else {
    url = 'https://www.kasaz.com/api/v1/search/update_map_results'
  }
  return api.get(url, params)
    .then((response) => {
      let data = response.data.markers
      if (process.env.NODE_ENV === 'development') {
        if (params.filters.price.min) { data = data.filter(item => item.p >= params.filters.price.min) }
        if (params.filters.price.max) { data = data.filter(item => item.p <= params.filters.price.max) }
        if (params.filters.surface.min) { data = data.filter(item => item.s >= params.filters.surface.min) }
        if (params.filters.surface.max) { data = data.filter(item => item.s <= params.filters.surface.max) }
        if (params.filters.bedrooms) { data = data.filter(item => item.r === params.filters.bedrooms) }
        if (params.filters.bathrooms) { data = data.filter(item => item.b === params.filters.bathrooms) }
      }
      return data
    })
}

export default {
  getApartments
}
