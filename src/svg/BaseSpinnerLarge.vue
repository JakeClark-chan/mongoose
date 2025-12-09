<template>
  <svg
    class="spinner h-20 w-20"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      fill="transparent"
      stroke-width="2"
      cx="33"
      cy="33"
      r="30"
      stroke="url(#gradient)"
    />
    <linearGradient id="gradient">
      <stop offset="50%" stop-color="#2563eb" stop-opacity="1" />
      <stop offset="65%" stop-color="#2563eb" stop-opacity=".5" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </linearGradient>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.spinner {
  animation: rotate 1s linear infinite;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.path {
  stroke-dasharray: 170;
  stroke-dashoffset: 20;
}
</style>
