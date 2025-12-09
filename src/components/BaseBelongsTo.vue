<template>
  <BaseAutocompleteFetch
    ref="autocompleteFetch"
    :model-value="model"
    :url="url"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    :value-key="primaryKey"
    :label-key="field"
    :has-error="hasError"
    :inline="inline"
    :size="size"
    :dropdown-show="dropdownShow"
    :show-model-value="showModelValue"
    :show-empty-option="showEmptyOption"
    :empty-option-label="emptyOptionLabel"
    :visible-focus="visibleFocus"
    :select="select"
    @update:model-value="onUpdate"
  >
    <template #option="optionProps">
      <slot name="option" v-bind="optionProps"></slot>
    </template>
    <template #empty="emptyProps">
      <slot name="empty" v-bind="emptyProps"></slot>
    </template>
    <template #footer="footerProps">
      <slot name="footer" v-bind="footerProps"></slot>
    </template>
  </BaseAutocompleteFetch>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { AxiosResponse } from 'axios';
import { config } from '@/index';
import BaseAutocompleteFetch from './BaseAutocompleteFetch.vue';
import { Option, SelectConfiguration } from '@/types';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, Number, null] as PropType<
      string | number | null | undefined
    >,
  },
  url: {
    required: true,
    type: String,
  },
  showRouteUrl: {
    default: undefined,
    type: Function as PropType<((id: string | number) => string) | undefined>,
  },
  primaryKey: {
    default: 'id',
    type: String,
  },
  field: {
    required: true,
    type: String,
  },
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  name: {
    default: undefined,
    type: String,
  },
  placeholder: {
    default: undefined,
    type: String,
  },
  currentModel: {
    default: null,
    type: [Object, null] as PropType<Option | null>,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  inline: {
    default: false,
    type: Boolean,
  },
  size: {
    default: 'base',
    type: String as PropType<'xs' | 'sm' | 'base'>,
  },
  dropdownShow: {
    default: 'focus',
    type: String as PropType<'focus' | 'always'>,
  },
  showModelValue: {
    default: true,
    type: Boolean,
  },
  visibleFocus: {
    default: true,
    type: Boolean,
  },
  showEmptyOption: {
    default: false,
    type: Boolean,
  },
  emptyOptionLabel: {
    default: undefined,
    type: String,
  },
  select: {
    default: undefined,
    type: Object as PropType<SelectConfiguration | undefined>,
  },
});

const http = config.http;

const emit = defineEmits(['update:modelValue']);

const autocompleteFetch = ref<InstanceType<
  typeof BaseAutocompleteFetch
> | null>(null);

const model = ref(props.currentModel);

watch(
  () => props.currentModel,
  (newValue, oldValue) => {
    model.value = newValue;
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (newValue == oldValue) {
      return;
    }

    if (props.showRouteUrl == null) {
      return;
    }

    if (!props.modelValue) {
      model.value = null;
      return;
    }

    http
      .get(props.showRouteUrl(props.modelValue))
      .then((response: AxiosResponse) => {
        model.value = response.data.data;
      })
      .catch((e: Error) => e);
  },
  { immediate: true }
);

function onUpdate(newModel: Option | null) {
  if (!newModel) {
    model.value = null;
    emit('update:modelValue', null);
  } else {
    model.value = newModel;
    emit('update:modelValue', newModel[props.primaryKey]);
  }
}

defineExpose({
  focus: () => autocompleteFetch.value?.focus(),
  blur: () => autocompleteFetch.value?.blur(),
  open: () => autocompleteFetch.value?.open(),
  close: () => autocompleteFetch.value?.close(),
  setKeywords: (input: string) => autocompleteFetch.value?.setKeywords(input),
});
</script>
