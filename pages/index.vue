<template>
  <b-container id="main" fluid class="h-100vh d-flex flex-column">
    <b-row class="mb-2 shadow-sm mb-3">
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row v-if="init" class="loading">
      <b-spinner type="grow" label="Loading..." variant="primary" />
    </b-row>
    <b-row v-else class="mb-2 flex-fill overflow-hidden">
      <b-col v-if="empty && loading" class="loading">
        <b-spinner type="grow" label="Loading..." variant="primary" />
      </b-col>
      <b-col v-else cols="6" class="h-100 d-flex flex-column">
        <list id="listview" :data="paginated | list" class="flex-grow-1" />
        <b-pagination v-model="page" :total-rows="data.length - 1" :per-page="perPage" class="w-100 mt-2 d-flex justify-content-center" />
      </b-col>
      <b-col id="mapsview" cols="6">
        <maps :center="currentLocation" :marker="data || []" @viewport_changed="setFilter($event)" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Maps from '~/components/Maps.vue'
import List from '~/components/List.vue'

export default {
  components: {
    Navbar,
    Maps,
    List
  },
  data () {
    return {
      init: true,
      currentLocation: { lat: 0, lng: 0 }
    }
  },
  computed: {
    page: {
      get () {
        return this.currentPage
      },
      set (index) {
        this.setPage(index)
      }
    },
    midpoint () {
      const lat = this.data.map(d => d.l).reduce((accumulator, value) => (accumulator + value), 0) / this.data.length
      const lng = this.data.map(d => d.g).reduce((accumulator, value) => (accumulator + value), 0) / this.data.length
      return { lat, lng }
    },
    ...mapGetters(['loading', 'data', 'empty', 'paginated', 'current', 'paginated', 'perPage', 'currentPage']),
    ...mapGetters('filters', { getFilter: 'get' })
  },
  watch: {

  },
  async mounted () {
    this.$store.commit('filters/reset')
    await this.fetch(this.getFilter)
    this.init = false // helper var for the loading indicator

    // calculate midpoint of all values
    this.center(this.midpoint)

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'filters/set') {
        this.fetch(state.filters)
        if (state.filters.location) { this.center(this.midpoint) }
      }
      if (mutation.type === 'activate') {
        this.center()
      }
    })
  },
  methods: {
    center (position = { lat: this.current.l, lng: this.current.g }) {
      this.currentLocation = position
    },
    setFilter (viewport) {
      this.set({ viewport })
    },
    ...mapActions(['fetch']),
    ...mapMutations(['setPage']),
    ...mapMutations('filters', ['set'])
  }
}
</script>

<style>
.h-100vh {
  height: 100vh;
}
.loading {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
#listview {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
  align-content: flex-start;
}
</style>
