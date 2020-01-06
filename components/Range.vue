<template>
  <b-form-row>
    <b-col>
      <b-form-select
        v-model="min"
        :options="dataMin"
        @change="updateMin()"
      />
    </b-col>
    <b-col>
      <b-form-select
        v-model="max"
        :options="dataMax"
        @change="updateMax()"
      />
    </b-col>
  </b-form-row>
</template>

<script>

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

  },
  methods: {
    updateMin () {
      if (this.max && this.min > this.max) {
        this.max = this.min
      }
      this.$emit('change', { min: this.min })
    },
    updateMax () {
      if (this.min && this.max < this.min) {
        this.min = this.max
      }
      this.$emit('change', { max: this.max })
    },
    selectData (str) {
      return this.values.map((value) => {
        const valueLocale = this.$options.filters.toLocale(value, this.unit)
        return {
          value,
          text: value ? valueLocale : `-- ${this.name} ${str} --`,
          disabled: !value
        }
      })
    }
  }
}
</script>
