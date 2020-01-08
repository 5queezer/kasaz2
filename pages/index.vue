<template>
  <b-container id="main" fluid class="h-100vh d-flex flex-column">
    <b-row class="mb-2 shadow-sm mb-3">
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row v-if="init || (count == 0 && loading)" class="loading">
      <b-spinner type="grow" label="Loading..." variant="primary" />
    </b-row>
    <b-row v-else class="mb-2 flex-fill overflow-hidden">
      <b-col cols="6" class="h-100 d-flex flex-column">
        <list id="listview" :data="paginated | list" class="flex-grow-1" />
        <b-pagination v-model="currentPage" :total-rows="count - 1" :per-page="perPage" class="w-100 mt-2 d-flex justify-content-center" />
      </b-col>
      <b-col id="mapsview" cols="6">
        <maps :center="currentLocation" :marker="data" @viewport_changed="setViewport($event)" />
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
      init: true
    }
  },
  computed: {
    debug () {
      return process.env.NODE_ENV === 'development'
    },
    currentPage: {
      get () {
        return this.currentPage
      },
      set (index) {
        this.setPage(index)
      }
    },
    currentId: {
      get () {
        return this.current.id
      },
      set (id) {
        this.activate(id)
      }
    },
    currentLocation () {
      const location = { lat: this.current.l, lng: this.current.g }
      return location
    },
    ...mapGetters(['loading', 'paginated', 'data', 'count', 'current', 'perPage', 'currentPage', 'current']),
    ...mapGetters('filters', { getFilter: 'get' })
  },
  watch: {

  },
  async mounted () {
    this.init = false // helper var for the loading indicator
    this.$store.commit('filters/reset')
    await this.fetch(this.getFilter)
    this.begin()

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'filters/set') {
        this.fetch(state.filters)
      }
    })
  },
  methods: {
    setViewport (viewport) {
      this.set({ viewport })
    },
    ...mapActions(['fetch']),
    ...mapMutations(['activate', 'setPage', 'begin']),
    ...mapMutations('filters', ['set'])
  }
}
</script>

<style>
.h-100vh {
  height: 100vh;
}
.loading {
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
