<template>
  <span
    class="inline-flex items-center rounded-full font-medium"
    :class="[colorClasses, sizeClasses]"
    :style="colorStyle"
  >
    <BaseIcon v-if="icon" :icon="icon" :class="iconSizeClasses"> </BaseIcon>
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { BaseIcon } from '.';

const props = withDefaults(
  defineProps<{
    contrast: 'low' | 'high';
    color:
      | 'gray'
      | 'red'
      | 'orange'
      | 'yellow'
      | 'green'
      | 'blue'
      | 'indigo'
      | 'purple'
      | 'pink'
      | string;
    size: 'sm' | 'base' | 'lg';
    icon?: string;
  }>(),
  {
    contrast: 'high',
    color: 'gray',
    size: 'base',
    icon: undefined,
  }
);

const colorClasses = computed(() => {
  if (props.color == 'gray') {
    if (props.contrast == 'high') {
      return 'bg-slate-600 text-white';
    }
    return 'bg-slate-100 text-slate-800';
  }
  if (props.color == 'red') {
    if (props.contrast == 'high') {
      return 'bg-red-600 text-white';
    }
    return 'bg-red-100 text-red-900';
  }
  if (props.color == 'orange') {
    if (props.contrast == 'high') {
      return 'bg-orange-500 text-white';
    }
    return 'bg-orange-100 text-yellow-900';
  }
  if (props.color == 'yellow') {
    if (props.contrast == 'high') {
      return 'bg-yellow-500 text-white';
    }
    return 'bg-yellow-100 text-yellow-900';
  }
  if (props.color == 'green') {
    if (props.contrast == 'high') {
      return 'bg-green-600 text-white';
    }
    return 'bg-green-100 text-green-900';
  }
  if (props.color == 'blue') {
    if (props.contrast == 'high') {
      return 'bg-blue-600 text-white';
    }
    return 'bg-blue-100 text-blue-900';
  }
  if (props.color == 'indigo') {
    if (props.contrast == 'high') {
      return 'bg-indigo-600 text-white';
    }
    return 'bg-indigo-100 text-indigo-900';
  }
  if (props.color == 'purple') {
    if (props.contrast == 'high') {
      return 'bg-purple-600 text-white';
    }
    return 'bg-purple-100 text-purple-900';
  }
  if (props.color == 'pink') {
    if (props.contrast == 'high') {
      return 'bg-pink-600 text-white';
    }
    return 'bg-pink-100 text-pink-900';
  }
  if (!props.color) {
    return 'bg-slate-100 text-slate-900';
  }
  return '';
});

const colorStyle = computed((): Record<string, string> => {
  if (
    props.color &&
    (props.color.startsWith('#') || props.color.startsWith('rgb'))
  ) {
    let textColor = 'white';

    if (props.contrast == 'low') {
      textColor = 'rgba(0,0,0,0.8)';
    }

    return {
      backgroundColor: props.color,
      color: textColor,
    };
  }
  return {};
});

const sizeClasses = computed(() => {
  if (props.size == 'sm') {
    return 'px-2 py-px text-[11px]';
  }
  if (props.size == 'base') {
    return 'px-2.5 py-0.5 text-xs';
  }
  if (props.size == 'lg') {
    return 'px-3 py-0.5 text-sm';
  }
  return 'px-2.5 py-0.5 text-xs';
});

const iconSizeClasses = computed(() => {
  if (props.size == 'sm') {
    return 'h-2.5 w-2.5 mr-1 -ml-px';
  }
  if (props.size == 'base') {
    return 'h-3 w-3 mr-1 -ml-0.5';
  }
  if (props.size == 'lg') {
    return 'h-4 w-4 mr-1 -ml-0.5';
  }
  return 'h-3 w-3 mr-1 -ml-0.5';
});
</script>
