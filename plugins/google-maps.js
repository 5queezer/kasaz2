import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'
import GmapCluster from '@/node_modules/vue2-google-maps/src/components/cluster.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    libraries: 'places'
  }
})

Vue.component('gmap-cluster', GmapCluster)
