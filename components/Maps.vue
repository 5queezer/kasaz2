<template>
  <p>
    {{ paginated }}
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
