<template>
  <b-card-group v-if="data.length > 0" class="list">
    <list-item v-for="item in data" :key="item.id" class="list-item flex-shrink-1" :item="item" :active="$store.state.id == item.id" />
  </b-card-group>
  <div v-else-if="!loading" class="d-flex align-items-start justify-content-center">
    <div>
      <h1 class="ml-auto text-center">
        <i class="fa fa-eye-slash text-secondary" />
      </h1>
      <b-alert show variant="danger">
        We don't have any estate in this area with these filters.
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['loading'])
  }

}
</script>

<style scoped lang="scss">

.list {
  flex-wrap: wrap;
}
.list-item {
  /* number of columns */
  flex-basis: 30%;
  height: 200px;
  overflow: hidden;
}

</style>
