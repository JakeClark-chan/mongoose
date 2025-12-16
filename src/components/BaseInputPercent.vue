<template>
  <BaseInput
    :model-value="value"
    suffix="%"
    type="number"
    :required="required"
    :prevent-submit="preventSubmit"
    :name="name"
    :step="step"
    :placeholder="placeholder"
    :disabled="disabled"
    :icon-left="icon"
    :has-error="hasError"
    :min="min"
    :max="max"
    @update:model-value="onUpdate"
  ></BaseInput>
</template>

<script lang="ts" setup>
import { round } from 'lodash';
import { PropType } from 'vue';
import BaseInput from './BaseInput.vue';

const props = defineProps({
  /**
   * The value of the input. Can be a number or null.
   * 0.1 = 10%
   * 0.5 = 50%
   * 1 = 100%
   */
  modelValue: {
    default: undefined,
    type: [Number, String, null] as PropType<number | string | null>,
  },
  /**
   * The step of the input. Can be a number or null.
   */
  step: {
    default: 1,
    type: Number,
  },
  /**
   * Prevents submit when pressing 'Enter' while the input is focused.
   */
  preventSubmit: {
    default: false,
    type: Boolean,
  },
  name: {
    default: undefined,
    type: String,
  },
  placeholder: {
    default: '',
    type: String,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  required: {
    default: false,
    type: Boolean,
  },
  icon: {
    default: undefined,
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  min: {
    default: undefined,
    type: Number,
  },
  max: {
    default: undefined,
    type: Number,
  },
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const precision = computed(() => {
  if (props.step === undefined) return 0;
  if (props.step === 0) return 0;
  const parts = props.step.toString().split('.');
  if (parts.length === 1) return 0;
  return parts[1].length;
});

const value = computed(() => {
  if (props.modelValue === undefined) return null;
  if (props.modelValue === null) return null;
  if (props.modelValue === '') return null;

  const valueToNumber = parseFloat(props.modelValue as string);
  if (Number.isNaN(valueToNumber)) {
    return null;
  }

  return round(valueToNumber * 100, precision.value);
});

function onUpdate(value: string | number | null) {
  const valueToNumber = parseFloat(value as string);

  if (Number.isNaN(valueToNumber)) {
    emit('update:modelValue', null);
    return;
  }

  emit('update:modelValue', round(valueToNumber / 100, precision.value + 2));
}
</script>
