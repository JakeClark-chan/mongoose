<template>
  <nav aria-label="Sidebar" class="relative">
    <div class="absolute bottom-0 left-0 h-full w-px bg-slate-300" />
    <div
      class="relative overflow-x-auto overflow-y-hidden"
      data-scroll-lock-scrollable
    >
      <div class="space-y-2">
        <slot />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
