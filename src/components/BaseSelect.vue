<template>
  <select
    ref="select"
    :value="modelValueInternal"
    :name="nameInternal"
    :disabled="disabled"
    :required="requiredInternal"
    class="rounded border disabled:cursor-not-allowed disabled:text-slate-300 disabled:opacity-100"
    :class="[
      !modelValue && requiredInternal ? 'text-slate-400' : '',
      hasErrorInternal ? 'border-red-600' : 'border-slate-300',
    ]"
    @change="onChange($event)"
  >
    <template v-if="requiredInternal">
      <option disabled hidden :value="EMPTY_VALUE_INTERNAL">
        {{ placeholder ? placeholder : $t('sui.select_an_option') }}
      </option>
    </template>
    <template v-else>
      <option :value="EMPTY_VALUE_INTERNAL">
        {{ placeholder ? placeholder : $t('sui.select_an_option') }}
      </option>
    </template>

    <slot>
      <template v-if="normalizedOptions && normalizedOptions.length">
        <option
          v-for="option in normalizedOptions"
          :key="option.value ?? 'null'"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </template>
    </slot>
  </select>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { get, isArray, isEqual } from 'lodash';
import { useMutationObserver } from '@vueuse/core';
import { useField } from '@/composables/field';
import { NormalizedOption, OptionValue, Option } from '@/types';

type SelectOption = string | number | null;

const EMPTY_VALUE_INTERNAL = '';
const EMPTY_VALUE_EXTERNAL = null;

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, Number, null] as PropType<SelectOption | undefined>,
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
  hasError: {
    default: false,
    type: Boolean,
  },
  options: {
    default: undefined,
    type: Array as PropType<Option[]>,
  },
  labelKey: {
    default: undefined,
    type: String,
  },
  valueKey: {
    default: undefined,
    type: String,
  },
});

const select = ref<HTMLSelectElement | null>(null);

const emit = defineEmits(['update:modelValue']);

const { nameInternal, requiredInternal, hasErrorInternal, emitUpdate } =
  useField({
    name: computed(() => props.name),
    required: computed(() => props.required),
    hasError: computed(() => props.hasError),
    emit: emit,
  });

const options = ref([] as HTMLOptionElement[]);

function isEmptyExternal(value: string | number | null | undefined) {
  if (value === undefined || value === EMPTY_VALUE_EXTERNAL) {
    return true;
  }

  return false;
}

function isEmptyInternal(value: string | number | null | undefined) {
  if (value === undefined || value === EMPTY_VALUE_INTERNAL) {
    return true;
  }

  return false;
}

/**
 * Transform to external empty NULL
 * to internal empty ''.
 */
const modelValueInternal = computed(() => {
  if (isEmptyExternal(props.modelValue)) {
    return EMPTY_VALUE_INTERNAL;
  }

  if (!checkIfModelValueIsValid()) {
    return EMPTY_VALUE_INTERNAL;
  }

  return props.modelValue;
});

/**
 * Checks if the current modelValue is valid
 */
useMutationObserver(
  select,
  () => {
    options.value = getOptions();
  },
  { attributes: false, childList: true }
);

onMounted(() => {
  options.value = getOptions();
});

function getOptions(): HTMLOptionElement[] {
  return [...(select.value?.options ?? [])];
}

function checkIfModelValueIsValid(): boolean {
  if (props.modelValue === EMPTY_VALUE_EXTERNAL) {
    return true;
  }

  if (props.options && props.options.length) {
    return props.options.some((o) => isEqual(o.value, props.modelValue));
  }

  return options.value.some((o) => isEqual(o.value, props.modelValue));
}

/**
 *
 * Emit change while mutating internal empty value ''
 * to external empty value NULL.
 */
function onChange(event: Event) {
  if (event === null) {
    emitUpdate(EMPTY_VALUE_EXTERNAL);
  }

  const value = get(event, 'target.value', null);

  if (isEmptyExternal(value)) {
    emitUpdate(EMPTY_VALUE_EXTERNAL);
    return;
  }

  emitUpdate(value);
}

watchEffect(() => {
  if (isArray(props.options) && (!props.labelKey || !props.valueKey)) {
    console.error(
      'BaseSelect: labelKey and valueKey are required when options is an array'
    );
  }
});

const normalizedOptions = computed<NormalizedOption[] | undefined>(() => {
  if (!props.options) {
    return undefined;
  }

  if (!props.labelKey) {
    return undefined;
  }

  if (!props.valueKey) {
    return undefined;
  }

  return props.options.map((option) => {
    return {
      label: option[props.labelKey as string] as string,
      value: option[props.valueKey as string] as OptionValue,
      option: option,
    } as NormalizedOption;
  });
});
</script>
