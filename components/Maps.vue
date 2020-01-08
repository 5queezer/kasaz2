<template>
  <gmap-map
    id="gmap"
    ref="gmap"
    :map-type-id="['roadmap', 'hybrid', 'sattelite', 'terrain'][0]"
    :center="centerInit"
    map-style="green"
    :zoom="zoom"
    @bounds_changed="updateViewport($event)"
    @idle="commitViewport()"
    @dragend="user = true"
    @zoom_changed="user = true"
  >
    <gmap-cluster :zoom-on-click="true">
      <gmap-marker
        v-for="(m, index) in marker"
        :key="index"
        :position="{ lat: m.l, lng: m.g }"
        :title="m.t"
        @click="centerMove({ lat: m.l, lng: m.g })"
      />
    </gmap-cluster>
  </gmap-map>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    marker: {
      type: Array,
      required: true
    },
    center: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: false,
      zoom: 12,
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ],
      centerInit: { lat: 0, lng: 0 },
      viewport: {
        neLat: 0,
        neLng: 0,
        swLat: 0,
        swLng: 0
      }
    }
  },
  computed: {
    ...mapGetters(['data'])
  },
  watch: {
    center (newValue) {
      this.centerMove(newValue)
    }
  },
  mounted () {
    this.centerInit = this.center
  },
  methods: {
    updateViewport (event) {
      if (!event) { return }
      const { ka, pa } = event
      this.viewport.neLat = pa.h
      this.viewport.neLng = ka.h
      this.viewport.swLat = pa.g
      this.viewport.swLng = ka.g
    },
    commitViewport () {
      if (this.user) {
        this.set({ viewport: this.viewport })
        this.user = false
      }
    },
    centerMove ({ lat, lng }) {
      this.$refs.gmap.panTo({ lat, lng })
    },
    ...mapMutations(['activate']),
    ...mapMutations('filters', ['set'])
  }
}
</script>

<style scoped>
#gmap {
  height: 100%;
}
</style>
