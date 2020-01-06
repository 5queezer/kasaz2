<template>
  <b-navbar toggleable="lg">
    <b-navbar-nav>
      <b-nav-item>
        <b-input />
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-3">
        <range
          :values="priceRange"
          name="Price"
          unit="€"
          @change="update('price', $event)"
        />
        <range
          :values="surfaceRange"
          name="Area"
          unit="m²"
          @change="update('surface', $event)"
        />
        <selectr
          :values="bedroomRange"
          name="Bedrooms"
          @change="update('bedrooms', $event)"
        />
        <selectr
          :values="bathroomRange"
          name="Bathrooms"
          @change="update('bathrooms', $event)"
        />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script >
import { mapMutations } from 'vuex'
import Range from '~/components/Range.vue'
import Selectr from '~/components/Selectr.vue'

export default {
  components: {
    Range,
    Selectr
  },
  computed: {
    surfaceRange () {
      return this.lodash.range(0, 40, 5).concat(this.lodash.range(40, 151, 10)).concat(200, 300)
    },
    priceRange () {
      return this.lodash.range(0, 350e3, 25e3).concat(this.lodash.range(350e3, 600e3, 50e3))
    },
    bedroomRange () {
      return this.lodash.range(0, 6)
    },
    bathroomRange () {
      return this.lodash.range(0, 6)
    }
  },
  methods: {
    update (setting, value) {
      const { min, max } = value
      if (min || max) {
        if (min) {
          this.set({ key: `filters[${setting}][min]`, value: min || undefined })
        }
        if (max) {
          this.set({ key: `filters[${setting}][max]`, value: max || undefined })
        }
      } else {
        this.set({ key: `filters[${setting}]`, value: value || undefined })
      }
    },
    ...mapMutations('filters', ['set'])
  }
}
</script>
