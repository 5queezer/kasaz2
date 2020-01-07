<template>
  <b-navbar toggleable="md">
    <b-navbar-brand href="#">
      <b-nav-text>
        <b-nav-title>kasaaaz</b-nav-title>
        <sup><b-badge variant="success">
          {{ count }}
        </b-badge></sup>
      </b-nav-text>
      <bouncing class="d-inline" :play="loading" />
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-text>
        <search-box />
      </b-nav-text>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
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
import { mapMutations, mapGetters } from 'vuex'
import Range from '~/components/Range.vue'
import Selectr from '~/components/Selectr.vue'
import SearchBox from '~/components/Searchbox.vue'
import Bouncing from '~/components/Bouncing.vue'

export default {
  components: {
    Range,
    Selectr,
    SearchBox,
    Bouncing
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
    },
    ...mapGetters(['loading', 'count'])
  },
  methods: {
    update (setting, value) {
      const { min, max } = value
      if (min || max) {
        if (min) {
          this.set({ key: `filters[${setting}][min]`, value: min || null })
        }
        if (max) {
          this.set({ key: `filters[${setting}][max]`, value: max || null })
        }
      } else if (value) {
        this.set({ key: `filters[${setting}]`, value: value || null })
      }
    },
    ...mapMutations('filters', ['set'])
  }
}
</script>
