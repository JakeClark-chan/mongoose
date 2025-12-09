<template>
  <div>
    <BaseFileUploader
      :max-size="maxSize"
      :disabled="disabled"
      class="w-full"
      button-class="w-full"
      :accept="accept"
      :accepted-extensions="acceptedExtensions"
      :url="uploadUrl"
      @upload:start="onUploadStart"
      @upload:end="onUploadEnd"
      @upload:fail="$emit('upload:fail', $event)"
      @upload:success="onUploadSuccess"
    >
      <template #default="baseFileUploaderProps">
        <slot
          name="default"
          v-bind="baseFileUploaderProps"
          :max-size="maxSize"
          :max="normalizedMax"
        >
          <div
            class="rounded border border-dashed p-6 duration-150"
            :class="[
              baseFileUploaderProps.dragging ? 'bg-blue-100' : 'bg-white',
              baseFileUploaderProps.disabled
                ? 'cursor-not-allowed border-slate-300'
                : 'border-slate-300 hover:bg-slate-100',
            ]"
          >
            <div :class="[baseFileUploaderProps.disabled ? 'opacity-30' : '']">
              <BaseIcon
                icon="heroicons:arrow-up-on-square"
                class="mx-auto mb-3 h-6 w-6 text-slate-500"
              />
              <div class="text-center">
                <p class="mb-0 text-sm font-medium leading-tight">
                  {{ $t('sui.drop_or_click_to_upload') }}
                </p>

                <div class="mt-1 text-xs leading-tight text-slate-500">
                  <p v-if="maxFileText">{{ maxFileText }}</p>
                  <p>{{ maxFileSize }}</p>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </BaseFileUploader>

    <div
      v-if="currentMediaInternal.length + normalizedModelValue.to_add.length"
      class="mt-5"
    >
      <div class="-m-1 flex flex-wrap">
        <div
          v-for="(media, index) in currentMediaInternal"
          :key="media.id"
          class="min-w-[220px] flex-1 p-1"
        >
          <BaseMediaItem
            :media="media"
            :show-remove="!disabled"
            @remove="promptRemoveMedia(index)"
          >
            {{ media.file_name }}
          </BaseMediaItem>
        </div>

        <div
          v-for="(file, index) in normalizedModelValue.to_add"
          :key="file.id"
          class="min-w-[220px] flex-1 p-1"
        >
          <BaseMediaItem
            :media="file"
            :show-remove="!disabled"
            @remove="promptRemoveUploadedFile(index)"
          >
            {{ file.file_name }}
          </BaseMediaItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { cloneDeep, isArray, isObject, capitalize } from 'lodash';
import { UploadedFile } from '@/types/UploadedFile';
import { Media } from '@/types/Media';
import { MediaLibraryPayload } from '@/types';
import { fileSizeFormat } from '@/utils';
import { useDialogsStore } from '@/stores/dialogs';
import { useNotificationsStore } from '@/stores/notifications';
import BaseMediaItem from '@/components/BaseMediaItem.vue';
import BaseFileUploader from './BaseFileUploader.vue';
import { useField } from '@/composables/field';

const i18n = useI18n();

const dialogs = useDialogsStore();
const notifications = useNotificationsStore();

const props = defineProps({
  modelValue: {
    default: undefined,
    type: Object as PropType<MediaLibraryPayload | null | undefined>,
  },
  name: {
    default: undefined,
    type: String,
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    default: undefined,
    type: Number,
  },
  maxSize: {
    default: 20 * 1024 * 1024,
    type: Number,
  },
  accept: {
    default: undefined,
    type: String,
  },
  acceptedExtensions: {
    default: undefined,
    type: Array as PropType<string[]>,
  },
  currentMedia: {
    default() {
      return [];
    },
    type: Array as PropType<Media[]>,
  },
  uploadUrl: {
    default: undefined,
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'upload:start',
  'upload:success',
  'upload:fail',
  'upload:end',
]);

const { emitUpdate, enableForm, disableForm } = useField({
  name: computed(() => props.name),
  required: computed(() => false),
  hasError: computed(() => props.hasError),
  emit: emit,
  errorType: 'alert',
});

const normalizedMax = computed(() => {
  if (props.max == null) {
    return 100;
  }

  return props.max;
});

const currentMediaInternal = ref(cloneDeep(props.currentMedia));

const normalizedModelValue = computed(() => {
  if (
    props.modelValue &&
    isObject(props.modelValue) &&
    isArray(props.modelValue.to_add) &&
    isArray(props.modelValue.to_remove)
  ) {
    return props.modelValue;
  }

  return {
    to_add: [],
    to_remove: [],
  };
});

const numberOfFiles = computed((): number => {
  return (
    currentMediaInternal.value.length +
    (props.modelValue?.to_add.length ?? 0) -
    (props.modelValue?.to_remove.length ?? 0)
  );
});

sync(normalizedModelValue.value);

function onUploadSuccess(file: UploadedFile) {
  if (file == null) {
    return;
  }

  if (numberOfFiles.value >= normalizedMax.value && normalizedMax.value > 1) {
    notifications.push({
      title: i18n.t('sui.whoops'),
      text: i18n.t('sui.you_can_upload_up_to_n_files', {
        count: normalizedMax.value,
      }),
      color: 'danger',
    });
    return;
  }

  const modelValue = cloneDeep(normalizedModelValue.value);

  if (normalizedMax.value == 1) {
    // Remove everything...
    modelValue.to_remove.push(...currentMediaInternal.value.map((m) => m.id));
    modelValue.to_add = [];
    currentMediaInternal.value = [];
  }

  modelValue.to_add.push(file);

  sync(modelValue);

  emit('upload:success', file);
}

function promptRemoveUploadedFile(index: number, length = 1) {
  dialogs.push({
    title: i18n.t('sui.remove_file'),
    message: i18n.t('sui.remove_file_description'),
    color: 'warning',
    onConfirm() {
      removeUploadedFile(index, length);
    },
  });
}

function promptRemoveMedia(index: number) {
  dialogs.push({
    title: i18n.t('sui.remove_file'),
    message: i18n.t('sui.remove_file_description'),
    color: 'warning',
    onConfirm() {
      removeMedia(index);
    },
  });
}

function removeUploadedFile(index: number, length = 1) {
  const modelValue = cloneDeep(normalizedModelValue.value);

  modelValue?.to_add.splice(index, length);

  sync(modelValue);
}

function removeMedia(index: number) {
  const media = currentMediaInternal.value[index];

  if (media) {
    const modelValue = cloneDeep(normalizedModelValue.value);

    modelValue.to_remove.push(media.id);

    sync(modelValue);

    currentMediaInternal.value.splice(index, 1);
  }
}

function sync(modelValue: MediaLibraryPayload) {
  emitUpdate(modelValue);
}

const maxFileText = computed(() => {
  return i18n.t('sui.you_can_upload_up_to_n_files', {
    count: normalizedMax.value,
  });
});

const maxFileSize = computed(() => {
  return capitalize(
    i18n.t('sui.up_to_x', { x: fileSizeFormat(props.maxSize) })
  );
});

function onUploadStart(event: any) {
  emit('upload:start', event);
  disableForm();
}

function onUploadEnd(event: any) {
  emit('upload:end', event);
  enableForm();
}
</script>
