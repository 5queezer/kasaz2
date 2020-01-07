<template>
  <b-row class="h-100" @mouseenter="slide = true" @mouseleave="slide = false">
    <b-col cols="4" class="h-100 p-2 overflow-hidden position-relative image" :style="{ 'background-image': `url(${image})` }" rel="preload">
      <b-badge :variant="condition(item.condition)" class="sticky-top float-right">
        {{ item.condition | condition }}
      </b-badge>

      <div class="position-absolute banner">
        <p class="text-light bg-warning">
          {{ item.title }}
        </p>
        <p class="">
          <strong class="text-light ">{{ item.price | toLocale('€') }}</strong>
          <small class="text-dark float-right">{{ item.price / item.surface | toLocale('€/m²') }}</small>
        </p>
      </div>
    </b-col>
    <b-col cols="8">
      <i class="fa fa-bed" /> {{ item.bedrooms }} |
      <i class="fa fa-bath" /> {{ item.bathrooms }} |
      <i class="fa fa-expand" /> {{ item.surface }} m²
    </b-col>
  </b-row>
</template>

<script>
export default {
  filters: {
    condition (label) {
      return label.split('_').join(' ') || '?'
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return { index: 0, slide: false, interval: 1000 }
  },
  computed: {
    image () {
      return this.item.images[this.index]
    }
  },
  mounted () {
    setInterval(() => {
      if (this.slide) {
        if (this.index < this.item.images.length - 1) {
          ++this.index
        } else {
          this.index = 0
        }
      }
    }, this.interval)

    // preloader
    // doesn't work for firefox
    for (const url of this.item.images) {
      const preloadLink = document.createElement('link')
      preloadLink.href = url
      preloadLink.rel = 'preload'
      preloadLink.as = 'image'
      document.head.appendChild(preloadLink)
    }
  },
  methods: {
    condition (condition) {
      return condition === 'good_condition' ? 'success'
        : condition === 'new' ? 'primary'
          : condition === 'remodeled' ? 'danger'
            : condition === 'to_remodel' ? 'warning'
              : 'light'
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  bottom: 0;
  color: white;

  *:nth-child(2) {
    background-color: rgba(255,255,255,0.5);
  }

}
.image {
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
}
.banner {
  *:nth-child(1) {
    text-shadow: 0px 0px 5px black;
  }
}
</style>
