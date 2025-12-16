<template>
  <div ref="root">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useClickOutside } from '@/composables/clickOutside';
import { MaybeElement } from '@vueuse/core';
import { MaybeRef } from '@vueuse/shared';
import { PropType } from 'vue';

const props = defineProps({
  includes: {
    type: Array as PropType<(MaybeRef<MaybeElement> | string)[]>,
    default: () => [],
  },
});

const emit = defineEmits(['clickOutside']);

const root = ref<null | HTMLElement>(null);

const includes = [] as (MaybeRef<MaybeElement> | string)[];

function addInclude(include: MaybeRef<MaybeElement> | string) {
  includes.push(include);
}

provide('clickOutside:addInclude', addInclude);

useClickOutside(root, () => emit('clickOutside'), {
  includes: () => {
    return [...includes, ...props.includes];
  },
});
</script>
