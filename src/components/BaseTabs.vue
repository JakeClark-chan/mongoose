<template>
  <div class="relative">
    <div class="absolute bottom-0 left-0 h-px w-full bg-slate-300" />
    <div
      class="relative overflow-x-auto overflow-y-hidden"
      data-scroll-lock-scrollable
    >
      <ul class="flex space-x-4 text-center">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
