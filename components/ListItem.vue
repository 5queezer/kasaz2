<template>
  <b-card class="card mr-2" :class="active ? 'shadow':''" @mouseenter="slide = true" @mouseleave="slide = false">
    <b-card-header class="p-0 flex-grow-1 border-bottom-0 overflow-hidden position-relative image" :style="{ 'background-image': `url(${image})` }" rel="preload">
      <b-badge v-if="item.condition" :variant="condition(item.condition)" class="sticky-top float-right mr-2 mt-2">
        {{ item.condition | condition }}
      </b-badge>

      <div class="position-absolute banner">
        <div class="ml-2 mr-2">
          <span class="text-light bg-warning title">
            {{ item.title }}
          </span>
        </div>
        <p class="mb-0 w-100">
          <strong class="text-light price pl-2">{{ item.price | toLocale('€') }}</strong>
          <small class="text-dark float-right mr-2 ratio">{{ item.price / item.surface | toLocale('€/m²') }}</small>
        </p>
      </div>
    </b-card-header>
    <b-card-footer class="h-20 d-flex justify-content-between text-secondary">
      <span><i class="fa fa-bed" /> {{ item.bedrooms }} </span>
      <span><i class="fa fa-bath" /> {{ item.bathrooms }} </span>
      <span><i class="fa fa-expand" /> {{ item.surface }} m² </span>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  filters: {
    condition (label) {
      return label.split('_').join(' ')
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
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
  left:0;
  right:0;
  color: white;

  > *:nth-child(2) {
    background-color: rgba(255,255,255,0.5);
  }

}
.card {
  > * {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
}
.image {
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
}
.price {
  text-shadow: 0px 0px 5px black;
}
.title {
  text-shadow: 0 0 5px black;
}
.ratio {
  font-weight: bold;
}
</style>
