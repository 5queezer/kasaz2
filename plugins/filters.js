import Vue from 'vue'

Vue.filter('toLocale', function (value, unit) {
  if (!value) { return '' }
  value = value.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (unit) {
    value += ' ' + unit
  }
  return value
})

Vue.filter('maps', (data) => {
  return data ? data.map((item) => {
    return {
      id: item.id,
      lat: item.l,
      lng: item.g
    }
  }) : []
})

Vue.filter('list', (data) => {
  return data ? data.map((item) => {
    const { id, t, p, r, b, n, s, i } = item
    return {
      id,
      title: t,
      price: p,
      bedrooms: r,
      bathrooms: b,
      condition: n,
      surface: s,
      images: i.map(i => i.imageUrl)
    }
  }) : []
})
