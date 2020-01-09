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
  const scheme = (item) => {
    return {
      id: item.id,
      lat: item.l,
      lng: item.g
    }
  }
  try {
    return data ? data.map(i => scheme(i)) : {}
  } catch (e) {
    return scheme(data)
  }
})

Vue.filter('list', (data) => {
  const scheme = (item) => {
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
  }
  try {
    return data ? data.map(i => scheme(i)) : {}
  } catch (e) {
    return scheme(data)
  }
})
