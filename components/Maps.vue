<template>
  <gmap-map
    v-if="apiKey"
    v-cloak
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
  <b-alert v-else variant="danger" :show="true">
    Please set your Google Maps API Key in the <kbd>.env</kbd> file
    <!-- {{ google }} -->
  </b-alert>
</template>

<script>
// import { gmapApi } from 'vue2-google-maps'

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
      viewport: {
        neLat: 0,
        neLng: 0,
        swLat: 0,
        swLng: 0
      },
      current: null,
      centerInit: {},
      // loading: true,
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  },
  // computed: {
  //   google: gmapApi
  // },
  watch: {
    center (newValue, oldValue) {
      if (typeof newValue.lng === 'number' && typeof newValue.lat === 'number' && !this.deepEqual(newValue, oldValue)) {
        this.current = newValue
        this.centerMove()
      }
    }
  },
  mounted () {
    this.centerInit = this.center
    // this.$refs.gmap.$mapPromise.then(() => {
    //   this.loading = false
    // })
  },
  methods: {
    deepEqual (a, b) {
      return JSON.stringify(a) === JSON.stringify(b)
    },
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
        this.$emit('viewport_changed', this.viewport)
        this.user = false
      }
    },
    centerMove ({ lat, lng } = this.current) {
      this.$refs.gmap.$mapPromise.then(() => {
        this.$refs.gmap.panTo({ lat, lng })
      })
    }
  }
}
</script>

<style scoped>
#gmap {
  height: 100%;
}
</style>
