<template>
  <gmap-map
    id="gmap"
    ref="gmap"
    :center="current | maps"
    :map-type-id="mapTypeId"
    :zoom="zoom"
    @bounds_changed="update($event)"
    @idle="commit()"
    @dragend="user = true"
    @zoom_changed="user = true"
  >
    <gmap-cluster>
      <gmap-marker
        v-for="(l, index) in data"
        :key="index"
        :position="l"
        @click="set(l.id)"
      />
    </gmap-cluster>
  </gmap-map>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      zoom: 15,
      mapTypeId: 'terrain',
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ],
      user: false

    }
  },
  computed: {
    ...mapGetters(['current'])
  },
  methods: {
    update ($event) {

    },
    set (id) {

    },
    commit () {

    }
  }
}
</script>

<style scoped>
#gmap {
  height: 100%;
}
</style>
