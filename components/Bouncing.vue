<template>
  <img ref="logo" class="logo" src="~/assets/green-home-icon-32-177826.png" alt="bouncing logo">
</template>
<script>
export default {
  props: {
    play: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    play (newValue) {
      this.$refs.logo.style['animation-play-state'] = newValue ? 'running' : 'paused'
    }
  }
}
</script>
<style scoped>
.logo {
  animation: bounce 3s infinite ease-in-out;
  animation-play-state: paused
}
@keyframes bounce {
  0% {
    transform: translateY(0px) scaleY(1) scaleX(1);
  }
  10% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  20% {
    transform: translateY(0px) scaleY(0.8) scaleX(1.2);
  }
  30% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  40% {
    transform: translateY(0px) scaleY(0.8) scaleX(1.2);
  }
  50% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  60% {
    transform: translateY(0px) scaleY(0.8) scaleX(1.2);
  }
  70% {
    transform: translateY(-15px) scaleY(1) scaleX(1);
  }
  80% {
    transform: translateY(0px) scaleY(1) scaleX(1);
  }
  100% {
    transform: translateY(0px) scaleY(1) scaleX(1);
  }
}
</style>
