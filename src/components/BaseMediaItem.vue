<template>
  <div class="rounded bg-white shadow">
    <div class="relative flex">
      <div class="shrink-0">
        <BaseMediaPreview class="h-12 w-12 rounded-l" :media="media" />
      </div>
      <component
        :is="url ? 'a' : 'p'"
        :href="url"
        target="_blank"
        class="flex grow items-center overflow-hidden px-3"
      >
        <div class="text-left leading-tight">
          <p class="mb-px grow truncate text-[13px] font-medium">
            {{ name }}
          </p>
          <p class="shrink-0 text-[10px] text-slate-400">
            {{ size }}
          </p>
        </div>
      </component>
      <div v-if="showRemove" class="shrink-0 p-0.5">
        <button
          type="button"
          class="rounded-full bg-white p-1 text-slate-400 hover:bg-slate-100"
          @click="$emit('remove')"
        >
          <BaseIcon icon="heroicons:x-mark-20-solid" class="h-4 w-4"></BaseIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Media } from '@/types/Media';
import { UploadedFile } from '@/types/UploadedFile';
import { PropType } from 'vue';
import { fileSizeFormat } from '@/utils';
import BaseMediaPreview from './BaseMediaPreview.vue';
import { BaseIcon } from '.';

defineEmits(['remove']);

const props = defineProps({
  media: {
    required: true,
    type: Object as PropType<Media | UploadedFile>,
  },
  showRemove: {
    default: true,
    type: Boolean,
  },
});

const name = computed(() => {
  return props.media.file_name;
});

const size = computed(() => {
  return fileSizeFormat(props.media.size);
});

const url = computed(() => {
  if ('url' in props.media) {
    return props.media.url;
  }

  return null;
});
</script>
