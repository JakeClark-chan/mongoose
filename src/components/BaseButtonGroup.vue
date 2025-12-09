<template>
  <div class="flex flex-wrap" :style="{ margin: '-' + spacing }">
    <div
      v-for="option in normalizedOptions"
      :key="option.value ? option.value : 'null'"
      :style="{ padding: spacing }"
    >
      <button
        :type="buttonType"
        :disabled="disabled"
        :class="[
          buttonClass,
          isSelected(option) ? buttonSelectedClass : buttonUnselectedClass,
        ]"
        @click="onSelect(option)"
      >
        <slot
          name="option"
          :selected="computed(() => isSelected(option))"
          :option="option"
          :disabled="disabled"
        >
          {{ option.label }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { NormalizedOption, Option } from '@/types';
import { cloneDeep, isArray } from 'lodash';
import { useHasOptions } from '@/composables/hasOptions';
import { useField } from '@/composables/field';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [Object, Array, null, undefined] as PropType<
      Option[] | Option | null | undefined
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
  buttonClass: {
    default: 'btn btn-sm',
    type: String,
  },
  buttonSelectedClass: {
    default: 'btn-primary',
    type: String,
  },
  buttonUnselectedClass: {
    default: '',
    type: String,
  },
  spacing: {
    default: '0.15rem',
    type: String,
  },
  options: {
    required: true,
    type: Array as PropType<Option[]>,
  },
  labelKey: {
    required: true,
    type: String,
  },
  valueKey: {
    required: true,
    type: String,
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

const { requiredInternal, emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const { normalizedOptions, normalizedModelValue, isSelected } = useHasOptions(
  computed(() => props.modelValue),
  computed(() => props.options),
  computed(() => props.labelKey),
  computed(() => props.valueKey),
  computed(() => props.multiple)
);

function onSelect(option: NormalizedOption) {
  if (props.multiple) {
    let newModalValue = [] as NormalizedOption[];

    if (isArray(normalizedModelValue.value)) {
      newModalValue = cloneDeep(normalizedModelValue.value);
    }

    const exists = newModalValue.find((o) => o.value == option.value);

    if (exists) {
      newModalValue = newModalValue.filter((o) => o.value != option.value);
    } else {
      newModalValue.push(option);
    }

    emitUpdate(newModalValue.map((o) => o.option));
  } else {
    if (!requiredInternal.value) {
      if (
        !isArray(normalizedModelValue.value) &&
        option.value == normalizedModelValue.value?.value
      ) {
        emitUpdate(null);
        return;
      }
    }

    const newOption = option.option;
    emitUpdate(newOption);
  }
}
</script>
