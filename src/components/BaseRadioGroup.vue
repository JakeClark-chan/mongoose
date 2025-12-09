<template>
  <div>
    <ul class="space-y-3">
      <li
        v-for="option in normalizedOptions"
        :key="option.value ? option.value : 'null'"
      >
        <label
          :for="name + '-' + option.value"
          class="cursor-pointer"
          :class="[labelClass, disabled ? 'cursor-not-allowed opacity-50' : '']"
        >
          <input
            :id="name + '-' + option.value"
            type="radio"
            :name="nameInternal"
            :checked="isChecked(option)"
            :required="requiredInternal"
            :disabled="disabled"
            :value="option.value"
            :class="inputClass"
            @input="emitUpdate(option.value)"
          />

          <slot name="option" :option="option">
            <span class="text-sm">{{ option.label }}</span>
          </slot>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { NormalizedOption, Option, OptionValue } from '@/types';
import { useField } from '@/composables/field';
import { uniqueId } from 'lodash';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, Number, null, undefined] as PropType<
      OptionValue | undefined
    >,
  },
  name: {
    default: undefined,
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
  labelClass: {
    default: 'flex space-x-2',
    type: String,
  },
  inputClass: {
    default: 'mt-0.5 border-slate-300',
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const dummyName = uniqueId('base-radio-');

const normalizedName = computed<string>(() => {
  if (props.name) {
    return props.name;
  }

  return dummyName;
});

const { nameInternal, requiredInternal, emitUpdate } = useField({
  name: normalizedName,
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
  errorType: 'alert',
  labelClass: 'mb-3 font-medium',
});

function isChecked(option: NormalizedOption): boolean {
  if (props.modelValue) {
    return props.modelValue == option.value;
  }
  return false;
}

const normalizedOptions = computed((): NormalizedOption[] => {
  return props.options.map((option) => {
    return {
      label: option[props.labelKey] as string,
      value: option[props.valueKey] as string | number,
      option: option,
    } as NormalizedOption;
  });
});
</script>
