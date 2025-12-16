<template>
  <form ref="form" class="relative" @submit.prevent="submit()">
    <slot
      :errors="errors"
      :loading="loading"
      :disabled="disabled"
      :submit="submit"
    />

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <slot v-if="loading" name="loading">
        <div
          class="absolute inset-0 flex h-full w-full items-center justify-center"
        >
          <div
            class="absolute inset-0 h-full w-full opacity-80"
            :class="loadingMaskClass"
          />
          <svg
            class="relative h-6 w-6 animate-spin text-blue-600"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
            />
          </svg>
        </div>
      </slot>
    </transition>
  </form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { serialize } from 'object-to-formdata';
import { Method, DataFormat } from '@/types';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { config, useNotificationsStore } from '@/index';
import { get, isArray } from 'lodash';

const notifications = useNotificationsStore();

type NextFunction = () => void;

const props = defineProps({
  url: {
    required: true,
    type: String,
  },
  method: {
    required: true,
    type: String as PropType<Method>,
    validator: (value: string) => {
      return Object.values(Method).includes(value as Method);
    },
  },
  data: {
    required: true,
    type: Object as PropType<Record<string, any>>,
  },
  axiosInstance: {
    default: null,
    type: Object as PropType<AxiosInstance | null>,
  },
  format: {
    type: String as PropType<DataFormat>,
    default: DataFormat.json,
    validator: (value: string) => {
      return Object.values(DataFormat).includes(value as DataFormat);
    },
  },
  beforeSubmit: {
    default: (next: NextFunction) => {
      next();
    },
    type: Function as PropType<(next: NextFunction) => void>,
  },
  successHandler: {
    default: undefined,
    type: Function as PropType<(response: any) => void>,
  },
  errorHandler: {
    default: (error: AxiosError) => {
      error;
    },
    type: Function as PropType<(error: AxiosError) => void>,
  },
  loadingMaskClass: {
    default: 'bg-white',
    type: String,
  },
  showNotificationOnError: {
    default: true,
    type: Boolean,
  },
  showNotificationOnSuccess: {
    default: true,
    type: Boolean,
  },
});

const i18n = useI18n();
const emit = defineEmits(['error', 'success']);

const form = ref<null | HTMLFormElement>(null);
const loading = ref(false);
const disabled = ref(false);
const errors = ref<Record<string, string[]>>({});

const httpClient = computed((): AxiosInstance => {
  if (props.axiosInstance) {
    return props.axiosInstance;
  }

  return config.http;
});

const htmlFormElement = computed((): HTMLFormElement | null => {
  return form.value;
});

const hasErrors = computed((): boolean => {
  return Object.keys(errors.value).length > 0;
});

const elementWithError = computed((): HTMLElement | null => {
  if (!hasErrors.value) {
    return null;
  }

  const keys = Object.keys(errors.value);

  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const element = findElementByName(name);
    if (element) {
      return element;
    }
  }

  return null;
});

function findElementByName(name: string): HTMLElement | null {
  let el = htmlFormElement.value?.querySelector(`[name='${name}']`) as
    | HTMLElement
    | undefined;
  if (el) {
    return el;
  }

  el = htmlFormElement.value?.querySelector(`[data-name='${name}']`) as
    | HTMLElement
    | undefined;

  if (el) {
    return el;
  }

  return null;
}

function submit() {
  props.beforeSubmit(query);
}

function query() {
  if (loading.value) {
    return;
  }

  loading.value = true;

  let method = props.method as Method;
  let data = props.data;
  let headers = { 'Content-Type': 'application/json' };

  if (props.format == 'formData') {
    method = Method.post;

    data = serialize(props.data, {
      nullsAsUndefineds: false,
      booleansAsIntegers: true,
      allowEmptyArrays: true,
    });

    if (props.method !== Method.post) {
      data.append('_method', props.method);
    }

    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  httpClient.value[method](props.url, data, { headers: headers })
    .then((response) => {
      loading.value = false;

      errors.value = {};

      successHandler(response);

      emit('success', response);
    })
    .catch((error: AxiosError<AxiosResponse<any>>) => {
      console.error(error);

      loading.value = false;

      if (error.response && error.response.status == 422) {
        loadErrors(error);
      }

      props.errorHandler(error);

      const errorMessage = get(error, 'response.data.message', null);

      if (props.showNotificationOnError && errorMessage) {
        notifications.push({
          color: 'danger',
          title: i18n.t('sui.error'),
          text: errorMessage,
        });
      }

      emit('error', error);
    });
}

function successHandler(response: AxiosResponse<any, any>) {
  if (props.successHandler) {
    props.successHandler(response);
  } else {
    const message = response.data.message ?? ('' as string);

    if (!message) {
      return;
    }

    if (props.showNotificationOnSuccess) {
      notifications.push({
        color: 'success',
        title: i18n.t('sui.success'),
        text: message,
      });
    }
  }
}

function loadErrors(error: AxiosError): void {
  errors.value = error?.response?.data.errors ?? {};

  if (elementWithError.value) {
    elementWithError.value.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}

function getErrorMessageByName(name: string): string | null {
  if (!errors.value[name]) {
    return null;
  }

  if (!isArray(errors.value[name])) {
    return null;
  }

  if (errors.value[name].length == 0) {
    return null;
  }

  return errors.value[name][0];
}

function clearErrors(name = null): void {
  if (name == null) {
    errors.value = {};
  } else {
    delete errors.value[name];
  }
}

function disabledForm() {
  disabled.value = true;
}

function enableForm() {
  disabled.value = false;
}

provide('form:errors', readonly(errors));
provide('form:getErrorMessageByName', getErrorMessageByName);
provide('form:clearErrors', clearErrors);

provide('form:disabled', readonly(disabled));
provide('form:enable', enableForm);
provide('form:disable', disabledForm);

defineExpose({
  submit,
  errors,
  hasErrors,
  clearErrors,
  disabled,
  loading,
});
</script>
