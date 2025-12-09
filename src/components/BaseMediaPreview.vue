<template>
  <component
    :is="url ? 'a' : 'div'"
    :href="url"
    target="_blank"
    class="relative flex items-center justify-center overflow-hidden"
    :class="[url ? 'duration-100 hover:bg-slate-100' : 'bg-white']"
  >
    <img
      v-if="type == 'image' && url"
      :src="url"
      class="h-full w-full bg-black object-contain object-center"
      :alt="name"
    />
    <img
      v-else-if="type == 'image' && 'data_url' in media"
      :src="media.data_url"
      class="h-full w-full bg-black object-contain object-center"
      :alt="name"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center bg-slate-100"
    >
      <BaseIcon
        v-if="extension == 'pdf'"
        class="max-w-8 h-1/2 max-h-8 w-1/2 text-slate-600"
        icon="mdi:file-pdf-box"
      />
      <BaseIcon
        v-else-if="type == 'image'"
        class="max-w-8 h-1/2 max-h-8 w-1/2 text-slate-600"
        icon="mdi:camera"
      />
      <BaseIcon
        v-else-if="type == 'audio'"
        class="max-w-8 h-1/2 max-h-8 w-1/2 text-slate-600"
        icon="mdi:music"
      />
      <span
        v-else
        class="text-xs font-semibold uppercase leading-tight text-slate-600"
      >
        {{ extension }}
      </span>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { Media } from '@/types/Media';
import { UploadedFile } from '@/types/UploadedFile';
import { PropType } from 'vue';
import { BaseIcon } from './index';

defineEmits(['delete']);

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

const type = computed(() => {
  const parts = props.media.mime_type.split('/');
  return parts[0];
});

const extension = computed(() => {
  const parts = props.media.mime_type.split('/');
  return parts[parts.length - 1];
});

const url = computed(() => {
  if ('url' in props.media) {
    return props.media.url;
  }

  return null;
});
</script>
