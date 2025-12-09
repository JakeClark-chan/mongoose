<template>
  <div
    class="inline-flex h-4 w-auto items-center justify-center rounded-full px-1.5"
    :class="[sizeClass, colorClass]"
  >
    {{ countLabel }}
  </div>
</template>

<script lang="ts" setup>
import { padStart } from 'lodash';
import { PropType } from 'vue';

const props = defineProps({
  count: {
    required: true,
    type: Number,
  },
  maxDigit: {
    default: 3,
    type: Number,
  },
  size: {
    default: 'sm',
    type: String,
  },
  color: {
    default: 'danger',
    type: String as PropType<'danger' | 'primary' | 'dark' | 'light' | 'white'>,
  },
});

const countLabel = computed((): string => {
  const realMaxDigit = Math.max(1, props.maxDigit);

  const countString = props.count + '';
  const numberOfDigit = countString.length;
  if (numberOfDigit > realMaxDigit) {
    return padStart('+', realMaxDigit + 1, '9');
  }
  return countString;
});

const sizeClass = computed((): string => {
  if (props.size == 'xs') {
    return 'text-[10px]';
  }
  if (props.size == 'sm') {
    return 'text-xs';
  }
  if (props.size == 'base') {
    return 'text-sm';
  }
  return 'text-xs';
});

const colorClass = computed((): string => {
  if (props.color == 'danger') {
    return 'bg-red-500 text-white';
  }
  if (props.color == 'primary') {
    return 'bg-primary-500 text-white';
  }
  if (props.color == 'dark') {
    return 'bg-slate-900 text-white';
  }
  if (props.color == 'light') {
    return 'bg-slate-200 text-slate-900';
  }
  return 'bg-white text-slate-900';
});
</script>
