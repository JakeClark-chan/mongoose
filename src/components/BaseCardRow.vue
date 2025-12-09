<template>
  <div class="border-t border-slate-300 first:border-t-0">
    <div :class="paddingClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      default: 'base',
      type: String,
    },
  },
  computed: {
    paddingClass(): string {
      if (this.size == 'xs') {
        return 'md:p-3 p-2';
      }
      if (this.size == 'sm') {
        return 'md:p-4 p-3';
      }
      if (this.size == 'lg') {
        return 'md:p-8 p-6';
      }
      return 'md:p-6 px-4 py-5';
    },
  },
});
</script>
