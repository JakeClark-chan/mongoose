<template>
  <div
    class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
        :class="{
          'bg-primary-100': color == 'info',
          'bg-red-100': color == 'danger',
          'bg-yellow-100': color == 'warning',
          'bg-green-100': color == 'success',
        }"
      >
        <BaseIcon
          v-if="color == 'danger'"
          class="h-6 w-6 text-red-600"
          icon="heroicons:exclamation-triangle-20-solid"
        />
        <BaseIcon
          v-else-if="color == 'warning'"
          class="h-6 w-6 text-yellow-600"
          icon="heroicons:exclamation-triangle-20-solid"
        />
        <BaseIcon
          v-else-if="color == 'success'"
          class="h-6 w-6 text-green-600"
          icon="heroicons:check-circle-20-solid"
        />
        <BaseIcon
          v-else
          class="h-6 w-6 text-primary-600"
          icon="heroicons:information-circle-20-solid"
        />
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <slot>
          <h3
            id="modal-title"
            class="text-lg font-medium leading-6 text-slate-900"
          >
            {{ title }}
          </h3>
          <div class="mt-2">
            <p class="text-base font-normal text-slate-600">
              {{ message }}
            </p>
          </div>
        </slot>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        ref="confirm"
        type="button"
        class="btn mb-2 w-full sm:mb-0 sm:w-auto"
        :class="{
          'btn-primary': color == 'info',
          'btn-danger': color == 'danger',
          'btn-warning': color == 'warning',
          'btn-success': color == 'success',
        }"
        @click="$emit('confirm')"
      >
        {{ confirmText ?? $t('sui.confirm') }}
      </button>
      <button
        type="button"
        class="btn w-full sm:mr-2 sm:w-auto"
        @click="$emit('cancel')"
      >
        {{ cancelText ?? $t('sui.cancel') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Icon as BaseIcon } from '@iconify/vue';

defineProps({
  color: {
    required: true,
    type: String as PropType<'info' | 'success' | 'danger' | 'warning'>,
  },
  title: {
    default: '',
    type: String,
  },
  message: {
    default: '',
    type: String,
  },
  confirmText: {
    default() {
      const i18n = useI18n();
      return i18n.t('sui.confirm');
    },
    type: String,
  },
  cancelText: {
    default() {
      const i18n = useI18n();
      return i18n.t('sui.cancel');
    },
    type: String,
  },
});

defineEmits(['cancel', 'confirm']);

const confirm = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  if (confirm.value) {
    confirm.value.focus();
  }
});
</script>
