<template>
  <b-form-row>
    <b-col>
      <b-form-select v-model="min" :options="dataMin" />
    </b-col>
    <b-col>
      <b-form-select v-model="max" :options="dataMax" />
    </b-col>
  </b-form-row>
</template>

<script>

export default {
  filters: {
    locale (item) {
      return item ? item.toLocaleString() : ''
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['unit', 'values', 'name'],
  data: () => {
    return {
      min: 0,
      max: 0
    }
  },
  computed: {
    dataMin () {
      return this.selectData('min')
    },
    dataMax () {
      return this.selectData('max')
    }
  },
  methods: {
    selectData (str) {
      return this.values.map((value) => {
        const valueLocale = this.$options.filters.locale(value)
        return {
          value,
          text: value ? `${valueLocale} ${this.unit}` : `-- ${this.name} ${str} --`,
          disabled: !value
        }
      })
    }
  }
}
</script>
