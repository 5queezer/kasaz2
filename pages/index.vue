<template>
  <b-container id="main" fluid class="d-flex flex-column">
    <b-row class="mb-3">
      <b-col>
        <logo />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row v-if="loading && data.length === 0" class="loading">
      <b-spinner type="grow" label="Loading..." />
    </b-row>
    <b-row v-else class="mb-3">
      <b-col id="listview" cols="6" />
      <b-col id="mapsview" cols="6" />
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Logo,
    Navbar
  },
  computed: {
    ...mapGetters(['data', 'loading'])
  },
  async mounted () {
    await this.fetch()
  },
  methods: {
    ...mapActions(['fetch'])
  }
}
</script>

<style>
#main {
  min-height: 100vh;
}
.loading {
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
</style>
