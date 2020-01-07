<template>
  <gmap-map
    id="gmap"
    ref="gmap"
    :center="center"
    :map-type-id="['roadmap', 'hybrid', 'sattelite', 'terrain'][0]"
    map-style="green"
    :zoom="zoom"
    @bounds_changed="update($event)"
    @idle="commit()"
    @dragend="user = true"
    @zoom_changed="user = true"
  >
    <gmap-cluster :zoom-on-click="true">
      <gmap-marker
        v-for="(m, index) in marker"
        :key="index"
        :position="{ lat: m.l, lng: m.g }"
        :title="m.t"
        @click="selected = m.id"
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
      zoom: 15,
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
    ...mapGetters(['current', 'data'])
  },
  watch: {
    center ({ lat, lng }) {
      this.$refs.gmap.panTo({ lat, lng })
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
