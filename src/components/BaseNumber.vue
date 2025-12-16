<template>
  <div class="base-number relative">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-90 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-90 opacity-0"
    >
      <div v-if="invalidInput" class="absolute left-0 top-full">
        <div
          class="mt-1 ml-1 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white"
        >
          <span v-if="tooBig"> Maximum {{ max }} </span>
          <span v-else-if="tooSmall"> Minimum {{ min }} </span>
          <span v-else>
            {{ $t('sui.maximum_x_decimal_places', { count: precision }) }}
          </span>
        </div>
      </div>
    </Transition>

    <div
      class="relative flex"
      :class="[borderColor, borderless ? '' : 'rounded border']"
    >
      <input
        v-model="valueInternal"
        :required="required"
        :name="name"
        :step="step"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :class="[
          ['full', 'left'].includes(rounded) ? 'rounded-l' : '',
          invalidInput ? 'focus:ring-red-400' : 'focus:ring-primary-500',
        ]"
        class="w-full border-none focus:z-[1] focus:border-none focus:border-transparent focus:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:text-slate-300"
        type="text"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @keydown="onKeydown"
      />
      <div class="border-l border-slate-300">
        <button
          type="button"
          :class="[['full', 'right'].includes(rounded) ? 'rounded-tr' : '']"
          class="block h-1/2 border-b border-slate-300 bg-white enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
          :disabled="disabled"
          @click="increment"
        >
          <BaseIcon icon="mdi:chevron-up"></BaseIcon>
        </button>
        <button
          type="button"
          :class="[['full', 'right'].includes(rounded) ? 'rounded-br' : '']"
          class="block h-1/2 bg-white enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
          :disabled="disabled"
          @click="decrement"
        >
          <BaseIcon icon="mdi:chevron-down"></BaseIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from '@/composables/field';
import { round } from 'lodash';
import { PropType } from 'vue';

const AUTO_CORRECT_TIMEOUT = 2000;

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [Number, null] as PropType<number | null>,
  },
  /**
   * The step of the input. Can be a number or null.
   */
  step: {
    default: 1,
    type: Number,
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
  min: {
    default: undefined,
    type: Number,
  },
  max: {
    default: undefined,
    type: Number,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  borderless: {
    default: false,
    type: Boolean,
  },
  rounded: {
    default: 'full',
    type: String as PropType<'full' | 'left' | 'right' | 'none'>,
  },
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown']);

const { hasErrorInternal, emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const precision = computed(() => {
  if (props.step === undefined) return 0;
  if (props.step === 0) return 0;
  const parts = props.step.toString().split('.');
  if (parts.length === 1) return 0;
  return parts[1].length;
});

const hasMax = computed(() => props.max !== undefined && props.max !== null);
const hasMin = computed(() => props.min !== undefined && props.min !== null);

function convertToNumber(
  value: string | number | null | undefined
): number | null {
  if (value === null) return null;
  let number = parseFloat(value + '');
  if (Number.isNaN(number)) {
    return null;
  }
  if (hasMax.value) {
    number = Math.min(number, props.max as number);
  }
  if (hasMin.value) {
    number = Math.max(number, props.min as number);
  }
  return round(number, precision.value);
}

const valueInternal = ref<null | string | number>(null);
const realValueInternal = computed<number | null>(() => {
  return convertToNumber(valueInternal.value);
});
const invalidInput = computed(() => {
  if (realValueInternal.value == null && valueInternal.value == '') {
    return false;
  }

  return realValueInternal.value != valueInternal.value;
});
const tooBig = computed(() => {
  if (valueInternal.value === null) return false;
  return hasMax.value && valueInternal.value > (props.max as number);
});
const tooSmall = computed(() => {
  if (valueInternal.value === null) return false;
  return hasMin.value && valueInternal.value < (props.min as number);
});

valueInternal.value = convertToNumber(props.modelValue);

if (valueInternal.value != props.modelValue) {
  emitUpdate(realValueInternal.value);
}

let timeoutId = undefined as undefined | number;

function onInput(event: any) {
  clearTimeout(timeoutId);

  let value = (event.target.value + '' ?? '').replace(/[^\d.-]/g, '');

  // remove all n + 1 dots
  const parts = value.split('.');
  value = parts.shift() + '';

  if (parts.length > 0) {
    value += '.' + parts.join('');
  }

  valueInternal.value = value;

  emitUpdate(realValueInternal.value);

  timeoutId = setTimeout(() => {
    updateInternalValueToRealValue();
  }, AUTO_CORRECT_TIMEOUT);
}

function onBlur(e: Event) {
  emit('blur', e);
  updateInternalValueToRealValue();
}

function onFocus(e: Event) {
  emit('focus', e);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    increment();
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    decrement();
    e.preventDefault();
  }
  emit('keydown', e);
}

function updateInternalValueToRealValue() {
  if (realValueInternal.value === null) {
    valueInternal.value = '';
    return;
  }
  valueInternal.value = round(realValueInternal.value ?? 0, precision.value);
}

function increment() {
  if (props.disabled) return;
  if (realValueInternal.value === null) {
    valueInternal.value = 0;
  } else {
    const newValue = round(
      realValueInternal.value + props.step,
      precision.value
    );
    if (!hasMax.value || newValue <= (props.max as number)) {
      valueInternal.value = newValue;
    }
  }
  emitUpdate(realValueInternal.value);
}

function decrement() {
  if (props.disabled) return;
  if (realValueInternal.value === null) {
    valueInternal.value = 0;
  } else {
    const newValue = round(
      realValueInternal.value - props.step,
      precision.value
    );
    if (!hasMin.value || newValue >= (props.min as number)) {
      valueInternal.value = newValue;
    }
  }
  emitUpdate(realValueInternal.value);
}

const borderColor = computed(() => {
  if (hasErrorInternal.value) return 'border-red-500';
  return 'border-slate-300';
});
</script>
