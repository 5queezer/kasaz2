<template>
  <div class="PojoniLogo">
    <b-img-lazy src="~/assets/green-home-icon-64-177826.png" alt="Logo" />
    <span class="text-success">kasaz</span>
    <span class="text-secondary">search</span>
  </div>
</template>

<style>
.PojoniLogo {
  animation: 1s appear;
  font-size: 3em;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
