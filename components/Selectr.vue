<template>
  <b-nav-item>
    <b-form-select
      v-model="value"
      :options="data"
      @change="update()"
    />
  </b-nav-item>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['values', 'name'],
  data: () => {
    return {
      value: 0
    }
  },
  computed: {
    data () {
      return this.selectData('all')
    }
  },
  methods: {
    selectData (str) {
      return this.values.map((value) => {
        const valueLocale = this.$options.filters.toLocale(value, this.unit)
        return {
          value,
          text: value ? valueLocale : `-- ${this.name} ${str} --`
          // disabled: !value
        }
      })
    },
    update () {
      this.$emit('change', this.value)
    }
  }
}
</script>
