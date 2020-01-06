<template>
  <b-container id="main" fluid class="d-flex flex-column">
    <b-row class="mb-3 pt-5">
      <b-col>
        <logo />
      </b-col>
      <b-col v-if="debug">
        data.length={{ data.length }}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row v-if="loading && count === 0" class="loading">
      <b-spinner type="grow" label="Loading..." variant="primary" />
    </b-row>
    <b-row v-else class="mb-3 h-100">
      <b-col id="listview" cols="6" class="h-100 overflow-auto pb-5">
        <list v-model="currentId" :data="paginated | list" />
      </b-col>
      <b-col id="mapsview" cols="6">
        <maps :data="paginated | maps" />
      </b-col>
      <b-pagination v-model="current" :total-rows="count" :per-page="perPage" class="w-100 fixed-bottom col-6 place-center" />
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/Navbar.vue'
import Maps from '~/components/Maps.vue'
import List from '~/components/List.vue'

export default {
  filters: {
    maps (data) {
      return data ? data.map((item) => {
        return {
          id: item.id,
          lat: item.l,
          lng: item.g
        }
      }) : []
    },
    list (data) {
      return data ? data.map((item) => {
        const { id, t, p, r, b, n, i } = item
        return {
          id,
          title: t,
          price: p,
          bedrooms: r,
          bathrooms: b,
          condition: n,
          images: i.map(i => i.imageUrl)
        }
      }) : []
    }
  },
  components: {
    Logo,
    Navbar,
    Maps,
    List
  },
  computed: {
    debug () {
      return process.env.NODE_ENV === 'development'
    },
    current: {
      get () {
        return this.page
      },
      set (index) {
        this.setPage(index)
      }
    },
    currentId: {
      get () {
        return this.getId
      },
      set (id) {
        this.activate(id)
      }
    },
    ...mapGetters(['data', 'loading', 'paginated', 'count', 'getIndex', 'getId', 'perPage', 'page'])
  },
  async mounted () {
    await this.fetch()
    this.begin()
  },
  methods: {
    ...mapActions(['fetch']),
    ...mapMutations(['activate', 'setPage', 'begin'])
  }
}
</script>

<style>
#main {
  height: 100vh;
  overflow: hidden;
}
#listview {
}
.loading {
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.place-center {
  place-content: center;
}
</style>
