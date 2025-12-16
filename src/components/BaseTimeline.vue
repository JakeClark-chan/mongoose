<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(item, index) in items" :key="index">
        <div class="relative pb-8">
          <span
            v-if="index != items.length - 1"
            class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
            aria-hidden="true"
          />
          <BaseTimelineItem :item="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { TimelineItem } from '../types/TimelineItem';
import { PropType } from 'vue';
import BaseTimelineItem from './BaseTimelineItem.vue';

defineProps({
  items: {
    required: true,
    type: Array as PropType<TimelineItem[]>,
  },
});
</script>
