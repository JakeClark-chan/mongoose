<template>
  <component :is="as" ref="button" class="btn">
    <div
      class="flex items-center justify-center"
      :class="{ 'opacity-0': loading }"
    >
      <slot />
    </div>

    <div
      v-if="loading"
      class="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
        />
      </svg>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    as: {
      default: 'button',
      type: String,
    },
  },
});
</script>
