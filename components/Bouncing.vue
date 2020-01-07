<template>
  <div>
    <b-img-lazy v-if="play" ref="logo" class="animated" src="~/assets/green-home-icon-32-177826.png" alt="bouncing logo" />
    <b-img-lazy v-else src="~/assets/green-home-icon-32-177826.png" alt="static logo" />
  </div>
</template>
<script>
export default {
  props: {
    play: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.animated {
  animation: bounce 1.5s infinite ease-in-out;
  animation-delay: 1s;
}
@keyframes bounce {
  0% {
    transform: translateY(0px) scaleY(1) scaleX(1);
  }
  25% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  50% {
    transform: translateY(0px) scaleY(0.8) scaleX(1.2);
  }
  75% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  100% {
    transform: translateY(0px) scaleY(1) scaleX(1);
  }
}
</style>
