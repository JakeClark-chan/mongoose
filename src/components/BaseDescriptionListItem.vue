<template>
  <div
    ref="item"
    :class="{
      'px-4 py-4': mobile,
      'grid grid-cols-3 gap-4 py-5 px-6': !mobile,
    }"
  >
    <dt class="text-sm font-medium leading-tight text-slate-500">
      <slot name="left" />
    </dt>
    <dd
      class="text-sm leading-tight text-slate-900"
      :class="{
        'mt-1.5': mobile,
        'col-span-2': !mobile,
      }"
    >
      <slot name="right" />
    </dd>
  </div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { debounce } from 'lodash';
import breakpoints from '../../config/breakpoints.json';

const DEFAULT_WIDTH = 800;

const item = ref<HTMLElement | null>(null);
const width = ref(DEFAULT_WIDTH);

const mobile = computed(() => {
  return width.value < breakpoints.sm;
});

function setWidth() {
  width.value = item.value?.clientWidth ?? DEFAULT_WIDTH;
}

onMounted(() => {
  setWidth();
});

useResizeObserver(item, debounce(setWidth, 50));
</script>
