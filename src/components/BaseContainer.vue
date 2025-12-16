<template>
  <div
    class="mx-auto w-full md:px-8"
    :class="[width, { 'px-4': !paddinglessMobile }]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      default: '7xl',
      type: String,
    },
    paddinglessMobile: {
      default: false,
      type: Boolean,
    },
    fluid: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    width() {
      if (this.fluid) {
        return 'max-w-full';
      }

      const sizes = {
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full',
      } as { [key: string]: string };

      return sizes[this.size] || 'max-w-5xl';
    },
  },
});
</script>
