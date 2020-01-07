<template>
  <b-container id="main" fluid class="h-100vh d-flex flex-column">
    <b-row class="mb-2 pt-5">
      <b-col>
        <logo />
      </b-col>
      <b-col v-if="debug">
        <b-alert show dismissible>
          <dl>
            <dt>data.length</dt><dd>{{ count }}</dd>
            <dt>id</dt><dd>{{ getId }}</dd>
          </dl>
        </b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row v-if="init || (count == 0 && loading)" class="loading">
      <b-spinner type="grow" label="Loading..." variant="primary" />
    </b-row>
    <b-row v-else class="mb-2 flex-fill overflow-hidden">
      <b-col cols="6" class="h-100 d-flex flex-column">
        <list id="listview" v-model="currentId" :data="paginated | list" class="flex-grow-1" />
        <b-pagination v-model="currentPage" :total-rows="count - 1" :per-page="perPage" class="w-100 mt-2 d-flex justify-content-center" />
      </b-col>
      <b-col id="mapsview" cols="6">
        <maps :data="paginated | maps" />
      </b-col>
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
        const { id, t, p, r, b, n, s, i } = item
        return {
          id,
          title: t,
          price: p,
          bedrooms: r,
          bathrooms: b,
          condition: n,
          surface: s,
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
    ...mapGetters(['loading', 'paginated', 'count', 'getIndex', 'getId', 'perPage', 'page']),
    ...mapGetters('filters', { getFilter: 'get' })
  },
  async mounted () {
    this.init = false
    this.$store.commit('filters/reset')
    await this.fetch(this.getFilter)
    this.begin()

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'filters/set') {
        this.fetch(this.getFilter)
      }
    })
  },
  methods: {
    ...mapActions(['fetch']),
    ...mapMutations(['activate', 'setPage', 'begin'])
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
  max-height: 100%
}
</style>
