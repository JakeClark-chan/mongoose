<template>
  <div
    class="pb-8 md:grid md:grid-cols-3 md:gap-8"
    :class="[bordered ? 'mb-8 border-b border-slate-300' : '']"
  >
    <div class="px-4 md:col-span-1 md:px-0">
      <h3 class="text-lg font-medium leading-tight text-slate-900">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm leading-tight text-slate-500">
        {{ description }}
      </p>
    </div>
    <div class="mt-5 md:col-span-2 md:mt-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    description: {
      default: null,
      type: String,
    },
    bordered: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
