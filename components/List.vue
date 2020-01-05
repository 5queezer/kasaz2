<template>
  <p>
    {{ debug }}
  </p>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    debug () {
      return this.data.map((d) => {
        return {
          ...d
        }
      })
    }
  }
}
</script>
