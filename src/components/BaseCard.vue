<template>
  <div
    ref="card"
    class="border-t border-b border-slate-300 bg-white"
    :class="{
      'rounded-lg border-r border-l shadow-sm': width != windowWidth,
      'relative isolate overflow-hidden': clipped,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';

defineProps({
  clipped: {
    default: false,
    type: Boolean,
  },
});

// windowWidth should not be equal to width when the card is mounted
const windowWidth = ref(1);
const width = ref(0);
const card = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener('resize', onResizeDebounced);
  onResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResizeDebounced);
});

const onResizeDebounced = debounce(() => {
  onResize();
}, 200);

function onResize() {
  windowWidth.value = document.body.clientWidth;
  if (!card.value) {
    return;
  }
  width.value = (card.value as HTMLElement).offsetWidth;
}
</script>
