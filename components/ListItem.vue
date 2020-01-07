<template>
  <b-card class="card mr-2 mb-2" :class="item.id === getId ? 'shadow-sm bg-primary text-white active':'text-secondary'" @mouseenter="slide = true" @mouseleave="slide = false" @click="activate(item.id)">
    <b-card-header class="p-0 flex-grow-1 border-bottom-0 overflow-hidden position-relative image" :style="{ 'background-image': `url(${image(index)})` }" rel="preload">
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
    <b-card-footer class="h-20 d-flex justify-content-between">
      <span><i class="fa fa-bed" /> {{ item.bedrooms }} </span>
      <span><i class="fa fa-bath" /> {{ item.bathrooms }} </span>
      <span><i class="fa fa-expand" /> {{ item.surface }}&nbsp;m² </span>
    </b-card-footer>
  </b-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
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
    return {
      index: 0,
      slide: false,
      interval: 1000
    }
  },
  computed: {
    ...mapGetters(['getId'])
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

    // chrome precaching
    for (const index in this.item.images) {
      const url = this.item.images[index]
      const preloadLink = document.createElement('link')
      preloadLink.href = url
      preloadLink.rel = 'preload'
      preloadLink.as = 'image'
      document.head.appendChild(preloadLink)
    }
  },
  methods: {
    image (index) {
      // firefox precaching
      return this.item.images.map((url) => { const i = new Image(); i.src = url; return i.src })[index]
    },
    condition (condition) {
      return condition === 'good_condition' ? 'success'
        : condition === 'new' ? 'primary'
          : condition === 'remodeled' ? 'danger'
            : condition === 'to_remodel' ? 'warning'
              : 'light'
    },
    ...mapMutations(['activate'])
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

  &:hover {
    box-shadow: 0 0 5px grey;
    cursor: pointer;
  }
}
.image {
  background-size: cover;
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
.card {
  transition: transform .2s;
  &.active {
    transform: scale(0.98);
  }
}

</style>
