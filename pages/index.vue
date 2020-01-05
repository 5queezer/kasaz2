<template>
  <b-container id="main" fluid>
    <b-row class="mb-3">
      <b-col>
        <logo />
      </b-col>
    </b-row>
    <b-row>
      <navbar />
    </b-row>
    <b-row v-if="!loading && false" class="mb-3">
      <b-col>
        <h1>{{ data.length }}</h1>
      </b-col>
      <b-col id="mapsview" cols="6" />
    </b-row>
    <b-row v-else>
      <b-col>
        <span>Loading...</span>
      </b-col>
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
