<template>
  <div>
    <p
      ref="content"
      class="overflow-hidden whitespace-pre-line"
      :style="showMore ? undefined : lineClampStyle"
    >
      <slot />
    </p>
    <button
      v-if="!showMore && isClamped"
      type="button"
      class="mt-1 inline appearance-none border-b border-dashed border-slate-400 bg-transparent px-0.5 py-0 text-slate-900 hover:text-slate-600"
      @click="showMore = true"
    >
      <span class="text-base font-medium">{{ $t('sui.read_more') }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useMutationObserver } from '@vueuse/core';
import { StyleValue } from 'vue';

const content = ref<null | HTMLParagraphElement>(null);

const props = defineProps({
  maxLines: {
    default: 3,
    type: Number,
  },
});

const showMore = ref(false);
const isClamped = ref(false);

const lineClampStyle = computed((): StyleValue | undefined => {
  return {
    display: '-webkit-box',
    '-webkit-line-clamp': props.maxLines,
    '-webkit-box-orient': 'vertical',
  };
});

onMounted(() => {
  init();

  useMutationObserver(
    content.value,
    () => {
      showMore.value = false;
      nextTick(() => {
        init();
      });
    },
    {
      childList: true,
      subtree: true,
    }
  );
});

function init() {
  const el = content.value;

  if (!el) {
    return;
  }

  isClamped.value = el.scrollHeight > el.clientHeight;
}
</script>
