<template>
  <div class="flex w-full space-x-4">
    <div v-if="back">
      <router-link
        :to="back"
        class="block rounded-full border border-slate-200 bg-white p-2 shadow duration-150 hover:bg-slate-100"
      >
        <BaseIcon class="h-6 w-6" icon="mdi:chevron-left" />
      </router-link>
    </div>
    <div class="grow sm:flex sm:items-start">
      <div class="sm:flex-auto">
        <component :is="`h${level}`" :class="titleClass">
          {{ title }}
        </component>
        <p v-if="subtitle" :class="subtitleClass">
          {{ subtitle }}
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      default: '',
      type: String,
    },
    level: {
      default: 1,
      type: Number,
    },
    back: {
      default: '',
      type: [String, Object] as PropType<RouteLocationRaw>,
    },
  },
  computed: {
    titleClass(): string {
      let classes =
        'font-display md:leading-tight font-semibold text-slate-900';

      if (this.level == 1) {
        classes += ' md:text-3xl text-3xl leading-9';
      }

      if (this.level == 2) {
        classes += ' md:text-xl text-xl leading-6';
      }

      return classes;
    },
    subtitleClass(): string {
      let classes = 'mt-1 text-slate-600';

      if (this.level == 1) {
        classes += ' text-base leading-5';
      }

      if (this.level == 2) {
        classes += ' text-base leading-5';
      }

      return classes;
    },
  },
});
</script>
