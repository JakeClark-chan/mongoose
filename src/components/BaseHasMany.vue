<template>
  <BaseTagAutocompleteFetch
    ref="tagAutocompleteFetch"
    :model-value="models"
    :url="url"
    :disabled="disabled"
    :placeholder="placeholder"
    :required="required"
    :value-key="primaryKey"
    :label-key="field"
    :has-error="hasError"
    :query-key="queryKey"
    :max="max"
    @update:model-value="onUpdate"
  >
    <template #option="optionProps">
      <slot name="option" v-bind="optionProps" />
    </template>
    <template #empty="emptyProps">
      <slot name="empty" v-bind="emptyProps" />
    </template>
    <template #footer="footerProps">
      <slot name="footer" v-bind="footerProps" />
    </template>
  </BaseTagAutocompleteFetch>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash';
import { Option } from '@/types';
import BaseTagAutocompleteFetch from './BaseTagAutocompleteFetch.vue';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [Array, null, undefined] as PropType<string[] | null | undefined>,
  },
  url: {
    required: true,
    type: String,
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
  placeholder: {
    default: undefined,
    type: String,
  },
  max: {
    default: undefined,
    type: Number,
  },
  queryKey: {
    default: 'search',
    type: String,
  },
  currentModels: {
    default() {
      return [];
    },
    type: Array as PropType<Option[]>,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const tagAutocompleteFetch = ref<InstanceType<
  typeof BaseTagAutocompleteFetch
> | null>(null);

const models = ref(props.currentModels);

watch(
  () => props.currentModels,
  (newValue, oldValue) => {
    if (isEqual(newValue, oldValue)) {
      return;
    }

    models.value = newValue;
  },
  { deep: true }
);

function onUpdate(newModels: Option[]) {
  models.value = newModels;
  emit(
    'update:modelValue',
    newModels.map((m) => m[props.primaryKey])
  );
}

defineExpose({
  focus: () => tagAutocompleteFetch.value?.focus(),
  blur: () => tagAutocompleteFetch.value?.blur(),
  open: () => tagAutocompleteFetch.value?.open(),
  close: () => tagAutocompleteFetch.value?.close(),
  setKeywords: (input: string) =>
    tagAutocompleteFetch.value?.setKeywords(input),
});
</script>
