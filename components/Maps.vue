<template>
  <p>
    {{ JSON.stringify(locations, 2) }}
  </p>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      required: true
    }
  }
}
</script>
