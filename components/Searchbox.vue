<template>
  <b-input-group>
    <gmap-autocomplete class="form-control" @place_changed="update();commit()">
      <template v-slot:input="slotProps">
        <b-form-input
          ref="input"
          v-model="location"
          type="search"
          placeholder="Location"
          @listeners="slotProps.listeners"
          @attrs="slotProps.attrs"
        />
      </template>
    </gmap-autocomplete>
    <b-input-group-append>
      <b-button variant="success" @click="commit">
        <i class="fa fa-search" aria-label="Search" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      location: '',
      filters: {}
    }
  },
  methods: {
    update (event) {
      const location = { city: event.name }
      const viewport = {
        neLat: event.geometry.viewport.pa.h,
        swLat: event.geometry.viewport.pa.g,
        neLng: event.geometry.viewport.ka.h,
        swLng: event.geometry.viewport.ka.g
      }
      const filters = { location: event.formatted_address }
      this.filters = { viewport, location, filters }
    },
    commit () {
      this.set({ filters: this.filters })
    },
    ...mapMutations('filters', ['set'])
  }
}
</script>
