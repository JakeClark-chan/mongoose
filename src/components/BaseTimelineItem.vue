<template>
  <div class="relative flex space-x-3">
    <div>
      <span
        :class="[
          iconBackgroundClass,
          'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
        ]"
      >
        <BaseIcon
          class="h-5 w-5 text-white"
          aria-hidden="true"
          :icon="item.icon"
        />
      </span>
    </div>
    <div
      class="flex min-w-0 flex-1 justify-between space-x-4"
      :class="{ 'pt-1.5': !item.description }"
    >
      <div>
        <p class="text-sm leading-tight text-slate-600">
          {{ item.title }}
        </p>
        <p
          v-if="item.description"
          class="mt-1 text-xs leading-tight text-slate-500"
        >
          {{ item.description }}
        </p>
      </div>
      <div
        v-if="item.date"
        class="whitespace-nowrap text-right text-sm text-slate-500"
      >
        <time :datetime="item.date">{{ item.date }}</time>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TimelineItem } from '../types/TimelineItem';
import { Color } from '../types/Color';
import { PropType } from 'vue';
import { BaseIcon } from '.';

const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<TimelineItem>,
  },
});

const iconBackgroundClass = computed((): string => {
  if (props.item.color == Color.primary) {
    return 'bg-primary-600';
  }
  if (props.item.color == Color.danger) {
    return 'bg-red-600';
  }
  if (props.item.color == Color.warning) {
    return 'bg-yellow-600';
  }
  if (props.item.color == Color.info) {
    return 'bg-blue-500';
  }
  if (props.item.color == Color.grey) {
    return 'bg-slate-500';
  }
  if (props.item.color == Color.black) {
    return 'bg-slate-900';
  }
  if (props.item.color == Color.success) {
    return 'bg-green-500';
  }
  return 'bg-slate-500';
});
</script>
