<template>
  <p class="bg-info h-100">
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
