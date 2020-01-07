<template>
  <gmap-map
    id="gmap"
    ref="gmap"
    :center="center"
    :map-type-id="mapTypeId"
    map-style="green"
    :zoom="zoom"
    @bounds_changed="update($event)"
    @idle="commit()"
    @dragend="user = true"
    @zoom_changed="user = true"
  >
    <gmap-cluster :zoom-on-click="true">
      <gmap-marker
        v-for="(l, index) in marker"
        :key="index"
        :position="l"
        :title="data.find(d => d.id === l.id).t"
        @change="selected = l.id"
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
    }
  },
  data () {
    return {
      zoom: 15,
      mapTypeId: ['roadmap', 'hybrid', 'sattelite', 'terrain'][0],
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ],
      selected: undefined
    }
  },
  computed: {
    center: {
      get () {
        return this.selected
      }
    },
    ...mapGetters(['current', 'data'])
  },
  watch: {
    center (newValue) {
      const { id, l, g } = this.$store.state.data.find(d => d.id === newValue)
      const location = { id, lat: parseFloat(l), lng: parseFloat(g) }
      this.$refs.gmap.panTo(location)
      // this.activate(id)
    }
  },
  methods: {
    update ($event) {

    },
    commit () {

    },
    ...mapMutations(['activate'])
  }
}
</script>

<style scoped>
#gmap {
  height: 100%;
}
</style>
