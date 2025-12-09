<template>
  <div class="relative">
    <BaseFilePicker
      :button-class="buttonClass"
      :disabled="uploading || disabled"
      :accept="accept"
      @select="onFileSelect"
    >
      <template #default="slotProps">
        <slot
          name="default"
          :uploading="uploading"
          :selecting="slotProps.selecting"
          :dragging="slotProps.dragging"
          :disabled="slotProps.disabled"
        />
        <slot
          name="loading"
          :uploading="uploading"
          :selecting="slotProps.selecting"
          :dragging="slotProps.dragging"
          :disabled="slotProps.disabled"
        >
          <BaseLoadingCover
            :delay="0"
            icon-class="text-primary-600 w-6 h-6"
            :model-value="loading || uploading || slotProps.selecting"
          />
        </slot>
      </template>
    </BaseFilePicker>
  </div>
</template>

<script lang="ts" setup>
import { config } from '@/index';
import { PropType } from 'vue';
import { UploadedFile } from '@/types/UploadedFile';
import { toHumanList, fileSizeFormat } from '@/utils';
import { useNotificationsStore } from '@/stores/notifications';
import BaseLoadingCover from '@/components/BaseLoadingCover.vue';
import BaseFilePicker from './BaseFilePicker.vue';

const http = config.http;
const i18n = useI18n();
const notifications = useNotificationsStore();

const props = defineProps({
  url: {
    default: undefined,
    type: String,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  beforeUpload: {
    default: (): boolean => {
      return true;
    },
    type: Function as PropType<() => boolean>,
  },
  buttonClass: {
    default: '',
    type: String,
  },
  maxSize: {
    default: 1024 * 1024 * 20, // 20 MB,
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
});

const emit = defineEmits([
  'upload:start',
  'upload:success',
  'upload:fail',
  'upload:end',
]);

const uploading = ref(false);

async function onFileSelect(file: File) {
  if (uploading.value) {
    return;
  }

  uploading.value = true;

  if (!(await props.beforeUpload())) {
    uploading.value = false;
    return;
  }

  try {
    if (file.size > props.maxSize) {
      notifications.push({
        color: 'danger',
        title: i18n.t('sui.error'),
        text: i18n.t('sui.the_file_size_must_not_exceed_x', {
          x: fileSizeFormat(props.maxSize),
        }),
      });

      uploading.value = false;
      return;
    }

    const extension = file.name.split('.').pop();

    if (
      extension &&
      props.acceptedExtensions &&
      props.acceptedExtensions.length
    ) {
      if (!props.acceptedExtensions.includes(extension)) {
        notifications.push({
          color: 'danger',
          title: i18n.t('sui.error'),
          text:
            i18n.t('sui.the_file_type_is_invalid') +
            ' ' +
            i18n.t('sui.file_must_be_of_type') +
            ' ' +
            toHumanList(props.acceptedExtensions, i18n.t('sui.or')) +
            '.',
        });

        uploading.value = false;
        return;
      }
    }

    const formData = new FormData();

    formData.append('file', file);

    emit('upload:start');

    const response = await http.post(props.url ?? config.upload_url, formData);

    const payload = response.data as UploadedFile;
    payload.original_file = file;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      payload.data_url = e.target.result;
      onSuccess(payload);
    };

    reader.onerror = (e: any) => {
      onSuccess(payload);
    };

    if (payload.mime_type.includes('image')) {
      reader.readAsDataURL(file);
    } else {
      onSuccess(payload);
    }
  } catch (e: unknown) {
    emit('upload:fail');
    notifications.push({
      color: 'danger',
      title: i18n.t('sui.error'),
      text: i18n.t('sui.upload_failed'),
    });
  } finally {
    emit('upload:end');
    uploading.value = false;
  }
}

function onSuccess(payload: any) {
  emit('upload:success', payload);
}
</script>
