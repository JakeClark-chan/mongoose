<template>
  <div :class="buttonClasses">
    <div class="flex items-center">
      <BaseIcon v-if="icon" :icon="icon" :class="iconClasses" />
      {{ label }}
    </div>
    <div v-if="count" class="relative -top-px ml-[5px]">
      <BaseCounter
        :count="count"
        :max-digit="2"
        :color="active ? 'white' : 'primary'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
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
  color: {
    default: 'dark',
    type: String as PropType<
      'dark' | 'light' | 'danger' | 'success' | 'warning'
    >,
  },
});

const textColor = computed((): string => {
  if (props.color == 'dark') {
    return 'text-slate-700';
  } else if (props.color == 'light') {
    return 'text-slate-600';
  } else if (props.color == 'danger') {
    return 'text-red-600';
  } else if (props.color == 'success') {
    return 'text-green-600';
  } else if (props.color == 'warning') {
    return 'text-yellow-600';
  }

  return '';
});

const buttonClasses = computed((): string => {
  let baseClasses =
    'flex items-center justify-between w-full leading-tight py-2 text-sm text-left rounded';

  if (!props.active) {
    baseClasses += ' bg-white';
    baseClasses += ' ' + textColor.value;
  } else {
    baseClasses += ' bg-primary-600 text-white';
  }

  if (props.icon) {
    baseClasses += ' pl-2 pr-4';
  } else {
    baseClasses += ' px-4';
  }

  return baseClasses;
});

const iconClasses = computed((): string => {
  let baseClasses = ' w-5 h-5 shrink-0 mr-2';

  if (!props.active) {
    baseClasses += ' opacity-70 ' + textColor.value;
  } else {
    baseClasses += ' text-primary-100';
  }

  return baseClasses;
});
</script>
