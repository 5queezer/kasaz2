<template>
  <b-list-group v-if="count > 0">
    <b-list-group-item v-for="item in data" :key="item.id" class="p-0 list-item flex-shrink-1">
      <list-item :item="item" />
    </b-list-group-item>
  </b-list-group>
  <div v-else-if="!loading" class="d-flex align-items-start justify-content-center">
    <b-alert show variant="danger">
      No data for your current filter settings
    </b-alert>
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
    ...mapGetters(['loading', 'count'])
  }

}
</script>

<style scoped lang="scss">

.list-item {
  flex-basis: 100%;

}

</style>
