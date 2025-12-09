<template>
  <div class="relative isolate overflow-hidden rounded" :class="[background]">
    <div
      class="animate-shimmer absolute inset-0 -translate-x-full border-t border-white/80 bg-gradient-to-r from-transparent via-white/80 to-transparent"
      :style="{
        animationDelay: delay,
      }"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  delay: {
    default: '0s',
    type: String,
  },
  background: {
    default: 'bg-slate-200',
    type: String,
  },
});
</script>
