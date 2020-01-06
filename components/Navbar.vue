<template>
  <b-navbar toggleable="lg">
    <b-nav-form>
      <b-input />
    </b-nav-form>
    <b-navbar-nav class="ml-3">
      <range
        :values="priceRange"
        name="Price"
        unit="€"
        @change="update('price', $event)"
      />
    </b-navbar-nav>
    <b-navbar-nav class="ml-3">
      <range
        :values="surfaceRange"
        name="Area"
        unit="m²"
        @change="update('surface', $event)"
      />
    </b-navbar-nav>
  </b-navbar>
</template>
<script >
import { mapMutations } from 'vuex'
import Range from '~/components/Range.vue'

export default {
  components: {
    Range
  },
  computed: {
    surfaceRange () {
      return this.lodash.range(0, 40, 5).concat(this.lodash.range(40, 151, 10)).concat(200, 300)
    },
    priceRange () {
      return this.lodash.range(0, 350e3, 25e3).concat(this.lodash.range(350e3, 600e3, 50e3))
    }
  },
  methods: {
    update (setting, { min, max }) {
      if (min) {
        this.set({ key: `filters[${setting}][min]`, value: min })
      }
      if (max) {
        this.set({ key: `filters[${setting}][max]`, value: max })
      }
    },
    ...mapMutations('filters', ['set'])
  }
}
</script>
