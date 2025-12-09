<template>
  <div :class="classes">
    <div class="group flex grow items-center">
      <BaseIcon v-if="icon" :icon="icon" :class="iconClasses" />
      {{ label }}
    </div>
    <div v-if="count" class="relative -top-px ml-[5px]">
      <BaseCounter :count="count" :max-digit="2" :color="'primary'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon as BaseIcon } from '@iconify/vue';
import BaseCounter from './BaseCounter.vue';

const props = defineProps({
  label: {
    default: undefined,
    type: String,
  },
  icon: {
    default: undefined,
    type: String,
  },
  active: {
    default: false,
    type: Boolean,
  },
  count: {
    default: undefined,
    type: Number,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

const classes = computed(() => {
  const classList = [
    'text-left px-3 py-2 rounded-md flex text-base font-medium w-full',
  ];

  if (props.dark) {
    classList.push('');
  } else {
    classList.push('');
  }

  if (props.active) {
    if (props.dark) {
      classList.push('bg-slate-700 text-white');
    } else {
      classList.push('bg-slate-100 text-slate-900');
    }
  } else {
    if (props.dark) {
      classList.push('hover:bg-slate-800 hover:text-white text-slate-300');
    } else {
      classList.push('hover:bg-slate-50 hover:text-slate-900 text-slate-800');
    }
  }

  return classList;
});

const iconClasses = computed((): string[] => {
  const classList = ['w-5 h-5 shrink-0 mr-2 leading-none inline-block'];
  if (props.active) {
    classList.push('opacity-100');
  } else {
    classList.push('opacity-70 group-hover:opacity-100');
  }
  return classList;
});
</script>
