<template>
  <b-list-group v-if="count > 0">
    <b-list-group-item v-for="item in data" :key="item.id" class="p-0 list-item flex-shrink-1">
      <b-row>
        <b-col cols="2" class="mh-100">
          <img :src="item.images[0]" class="list-image">
        </b-col>
        <b-col cols="10">
          {{ item.title }}
          <strong>{{ item.price | toLocale('€') }}</strong>
          <i class="fa fa-bed" /> {{ item.bedrooms }}
          <i class="fa fa-bath" /> {{ item.bathrooms }}
          <v-text variant="warning">
            {{ item.condition }}
          </v-text>
        </b-col>
      </b-row>
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
export default {

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
img.list-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;

}
</style>
