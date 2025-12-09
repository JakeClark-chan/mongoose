<template>
  <div>
    <BaseButtonGroup
      :model-value="normalizeModelValue"
      :disabled="disabled"
      value-key="value"
      label-key="label"
      :required="required"
      :options="colorOptions"
      :multiple="multiple"
      :button-type="buttonType"
      :button-class="''"
      :button-selected-class="''"
      :button-unselected-class="''"
      @update:model-value="(value) => transformModelValue(value)"
    >
      <template #option="option">
        <div
          :style="{ backgroundColor: option.option.value + '' }"
          class="rounded-md border-none p-3"
          :class="[
            option.selected.value ? 'text-white' : 'text-transparent',
            disabled ? ' cursor-not-allowed opacity-50' : '',
          ]"
        >
          <BaseIcon icon="heroicons-solid:check-circle" class="h-5 w-5" />
        </div>
      </template>
    </BaseButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BaseButtonGroup } from '.';
import { isArray } from 'lodash';
import { useField } from '@/composables/field';
import { Option } from '@/types';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, Array, null, undefined] as PropType<
      string | string[] | null | undefined
    >,
  },
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  buttonType: {
    default: 'button',
    type: String as PropType<'button' | 'submit'>,
  },
  colors: {
    type: [Array] as PropType<string[]>,
    default() {
      return [
        '#0f172a',
        '#dc2626',
        '#ea580c',
        '#eab308',
        '#16a34a',
        '#0d9488',
        '#0891b2',
        '#2563eb',
        '#4f46e5',
        '#9333ea',
        '#db2777',
      ];
    },
  },
  multiple: {
    default: false,
    type: Boolean,
  },
  name: {
    default: undefined,
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const colorOptions = computed(() => {
  return props.colors.map((c) => {
    return {
      label: c,
      value: c,
    };
  });
});

const normalizeModelValue = computed(() => {
  return isArray(props.modelValue)
    ? props.modelValue?.map((m) => {
        return {
          label: m,
          value: m,
        };
      })
    : {
        label: props.modelValue,
        value: props.modelValue,
      };
});

const { emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

function transformModelValue(payload: Option | Option[] | null) {
  if (props.multiple) {
    let newModalValue = [] as string[];

    if (isArray(payload)) {
      newModalValue = payload.map((option) => {
        return option.value;
      });
    }

    emitUpdate(newModalValue);
  } else {
    if (payload == null) {
      emitUpdate(null);
      return;
    }

    if (isArray(payload)) {
      emitUpdate(null);
      return;
    }

    const newOption = payload.value;
    emitUpdate(newOption);
  }
}
</script>
