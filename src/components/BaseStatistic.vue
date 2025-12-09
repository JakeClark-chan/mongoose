<template>
  <div class="inline-flex rounded-xl p-4" :class="[centerClass]">
    <section>
      <!-- Label -->
      <header class="mb-0.5 text-base font-medium">
        {{ label }}
      </header>
      <!-- Content -->
      <div class="flex" :class="[centerClass]">
        <div class="text-3xl font-bold leading-tight">
          {{ primaryValue }}
        </div>

        <div
          v-if="secondaryValue"
          class="ml-1 flex rounded-md px-1 text-lg font-bold"
          :class="[backgroundClass, textClass, centerClass]"
        >
          <!-- Icon trend -->
          <div v-if="trend">
            <BaseIcon :icon="icon" :class="iconClass" />
          </div>
          <div class="text-lg">{{ secondaryValue }}</div>
        </div>
      </div>
      <!-- Caption -->
      <footer class="text-base text-slate-500">
        {{ caption }}
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BaseIcon } from '.';

export default defineComponent({
  components: { BaseIcon },
  props: {
    label: {
      default: null,
      type: String as PropType<string | null>,
    },
    primaryValue: {
      required: true,
      type: String,
    },
    secondaryValue: {
      default: null,
      type: String as PropType<string | null>,
    },
    trend: {
      default: null,
      type: String as PropType<'up' | 'down' | null>,
    },
    caption: {
      default: null,
      type: String as PropType<string | null>,
    },
  },
  computed: {
    backgroundClass(): string {
      if (this.trend == 'up') {
        return 'bg-green-50';
      }
      if (this.trend == 'down') {
        return 'bg-red-50';
      }
      return '';
    },
    textClass(): string {
      if (this.trend == 'up') {
        return 'text-green-700';
      }
      if (this.trend == 'down') {
        return 'text-red-700';
      }
      return 'text-slate-400';
    },
    iconClass(): string {
      return 'w-5 h-5';
    },
    icon(): string {
      if (this.trend == 'up') {
        return 'heroicons-solid:chevron-up';
      }
      if (this.trend == 'down') {
        return 'heroicons-solid:chevron-down';
      }
      return '';
    },
    centerClass(): string {
      return 'items-center justify-center';
    },
  },
});
</script>
