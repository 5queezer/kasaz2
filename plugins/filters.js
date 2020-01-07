import Vue from 'vue'

Vue.filter('toLocale', function (value, unit) {
  if (!value) { return '' }
  value = value.toLocaleString(undefined, { maximumFractionDigits: 0 })
  if (unit) {
    value += ' ' + unit
  }
  return value
})
