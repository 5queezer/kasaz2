<template>
  <b-navbar toggleable="lg">
    <b-nav-form>
      <b-input />
    </b-nav-form>
    <b-navbar-nav class="ml-3">
      <range
        :values="areaRange"
        name="Area"
        unit="m²"
      />
    </b-navbar-nav>
  </b-navbar>
</template>
<script >
import Range from '~/components/Range.vue'

export default {
  components: {
    Range
  },
  computed: {
    areaRange () {
      return this.lodash.range(0, 40, 5).concat(this.lodash.range(40, 151, 10)).concat(200, 300)
    }
  }
}
</script>
