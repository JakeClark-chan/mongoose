<template>
  <div class="flex items-center -space-x-4">
    <div
      v-for="(user, index) in users"
      :key="user.email + '-' + index"
      role="tooltip"
      class="shrink-0"
      :aria-label="user.full_name + '\n' + user.email"
      :style="{
        marginLeft: index === 0 ? '0' : '-' + spacing,
      }"
    >
      <div class="rounded-full border-[3px] border-white">
        <BaseAvatar
          :user="user"
          :size="size"
          :show-details="false"
          :to="to ? to(user) : undefined"
        />
      </div>
    </div>
    <div
      v-if="isLimitReached"
      class="z-10 shrink-0"
      :style="{
        marginLeft: '-' + spacing,
      }"
    >
      <div class="rounded-full border-[3px] border-white bg-slate-300">
        <div
          :class="[sizeClass, fontSizeClass]"
          class="flex items-center justify-center rounded-full font-semibold text-slate-700"
        >
          <span v-if="hiddenItemsCount > 99"> ... </span>
          <span v-else> +{{ hiddenItemsCount }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from '@/types/User';
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import BaseAvatar from './BaseAvatar.vue';

const props = defineProps({
  users: {
    required: true,
    type: Array as PropType<User[]>,
  },
  size: {
    default: 'base',
    type: String,
  },
  to: {
    default: undefined,
    type: Function as PropType<(user: User) => RouteLocationRaw>,
  },
  max: {
    default: 10,
    type: Number,
  },
});

const spacing = computed(() => {
  switch (props.size) {
    case 'xl':
      return '1.4rem';
    case 'lg':
      return '1.25rem';
    case 'base':
      return '1rem';
    case 'sm':
      return '0.875rem';
    case 'xs':
      return '0.8rem';
    default:
      return '1rem';
  }
});

const maxInternal = computed(() => {
  return props.max > 3 ? props.max : 3;
});

const users = computed(() => {
  return props.users.length > maxInternal.value
    ? props.users.slice(0, maxInternal.value)
    : props.users;
});

const hiddenItemsCount = computed(() => {
  return Array.isArray(props.users) && props.users.length > maxInternal.value
    ? props.users.length - maxInternal.value
    : 0;
});

const isLimitReached = computed(() => {
  return (
    (Array.isArray(props.users) && props.users.length > maxInternal.value) ??
    false
  );
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

const fontSizeClass = computed((): string => {
  const base = 'text-xs';

  if (props.size == 'xs') {
    return 'text-[8px]';
  }
  if (props.size == 'sm') {
    return 'text-[10px]';
  }
  if (props.size == 'base') {
    return 'text-xs';
  }
  if (props.size == 'lg') {
    return 'text-sm';
  }
  if (props.size == 'xl') {
    return 'text-sm';
  }
  return base;
});
</script>
