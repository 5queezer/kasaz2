<template>
  <p>
    {{ JSON.stringify(data, 2) }}
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
