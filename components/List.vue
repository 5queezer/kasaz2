<template>
  <p>
    {{ data }}
  </p>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
