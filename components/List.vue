<template>
  <b-list-group v-if="count > 0">
    <b-list-group-item v-for="item in data" :key="item.id" class="p-1">
      <b-row>
        <b-col cols="6">
          <!-- carousel>
            <img v-for="(image, index) in item.images" :key="index" :src="image">
          </carousel -->
        </b-col>
        <b-col cols="6">
          {{ item.title }}
          {{ item.price | toLocale('€') }}
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
  },
  methods: {
    // activate () {
    //   const vm = this
    //   return Object.assign({},
    //     // We add all the listeners from the parent
    //     this.$listeners,
    //     // Then we can add custom listeners or override the
    //     // behavior of some listeners. This ensures that
    //     // the component works with v-model
    //     {
    //       input (event) {
    //         vm.$emit('input', event.target.key)
    //       }
    //     }
    //   )
    // }
  }
}
</script>

<style scoped>
.slide img.w-100 {
  height: 100px;
  width: 200px;
}
</style>
