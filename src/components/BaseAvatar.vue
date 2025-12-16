<template>
  <component
    :is="to ? 'RouterLink' : 'div'"
    :to="to"
    class="flex shrink-0 items-center"
  >
    <img
      :src="user.avatar_url"
      :class="[sizeClass, detailsPosition == 'left' ? 'order-2' : 'order-1']"
      class="shrink-0 overflow-hidden rounded-full object-cover object-center"
    />
    <div
      v-if="showDetails"
      class="max-w-[120px] grow leading-tight"
      :class="[
        textSizeClass,
        detailsPosition == 'left' ? 'order-1 text-right' : 'order-2 text-left',
      ]"
      :style="{
        marginLeft: detailsPosition == 'right' ? spacing : '0',
        marginRight: detailsPosition == 'left' ? spacing : '0',
      }"
    >
      <div class="truncate">
        {{ user.full_name }}
      </div>
      <div class="truncate opacity-50">
        {{ user.email }}
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { User } from '@/types/User';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
  size: {
    default: 'base',
    type: String,
  },
  showDetails: {
    default: false,
    type: Boolean,
  },
  detailsPosition: {
    default: 'right',
    type: String as PropType<'left' | 'right'>,
  },
  to: {
    default: undefined,
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
});

const sizeClass = computed((): string => {
  const base = 'h-9 w-9';

  if (props.size == 'xs') {
    return 'h-6 w-6';
  }
  if (props.size == 'sm') {
    return 'h-8 w-8';
  }
  if (props.size == 'base') {
    return base;
  }
  if (props.size == 'lg') {
    return 'h-12 w-12';
  }
  if (props.size == 'xl') {
    return 'h-14 w-14';
  }
  return base;
});

const textSizeClass = computed((): string => {
  const base = 'text-sm';

  if (props.size == 'xs') {
    return 'text-xs';
  }
  if (props.size == 'sm') {
    return 'text-xs';
  }
  if (props.size == 'base') {
    return base;
  }
  if (props.size == 'lg') {
    return 'text-sm';
  }
  if (props.size == 'xl') {
    return 'text-base';
  }
  return base;
});

const spacing = computed(() => {
  switch (props.size) {
    case 'xl':
      return '0.95rem';
    case 'lg':
      return '0.85rem';
    case 'base':
      return '0.75rem';
    case 'sm':
      return '0.65rem';
    case 'xs':
      return '0.5rem';
    default:
      return '1rem';
  }
});
</script>
