<template>
  <b-form-row>
    <b-col>
      <b-form-select v-model="min" :options="dataMin" @changed="emit($event, min)" />
    </b-col>
    <b-col>
      <b-form-select v-model="max" :options="dataMax" @changed="emit($event, min)" />
    </b-col>
  </b-form-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
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
  watch: {
    min (newValue) {
      if (this.max && newValue > this.max) {
        this.max = newValue
      }
      this.set({ key: 'filters[price][min]', value: newValue })
    },
    max (newValue) {
      if (this.min && newValue < this.min) {
        this.min = newValue
      }
      this.set({ key: 'filters[price][max]', value: newValue })
    }
  },
  methods: {
    selectData (str) {
      return this.values.map((value) => {
        const valueLocale = this.$options.filters.toLocale(value, this.unit)
        return {
          value: value || undefined,
          text: value ? valueLocale : `-- ${this.name} ${str} --`,
          disabled: !value
        }
      })
    },
    ...mapMutations('filters', ['set'])
  }
}
</script>
