<template>
  <div class="inline-flex rounded border" :class="[borderColor]">
    <div
      v-if="iconLeft"
      class="flex shrink-0 items-center justify-center rounded-l border-r px-3 transition-colors"
      :class="[borderColor, backgroundColor, textColor]"
    >
      <BaseIcon :icon="iconLeft" />
    </div>
    <div
      v-if="prefix"
      class="flex shrink-0 items-center justify-center border-r px-4 transition-colors"
      :class="[
        iconLeft ? '' : 'rounded-l',
        borderColor,
        backgroundColor,
        textColor,
      ]"
    >
      {{ prefix }}
    </div>
    <BaseNumber
      v-if="type == 'number'"
      ref="input"
      :model-value="modelValue"
      borderless
      :has-error="hasError"
      :rounded="
        emptyLeft && emptyRight
          ? 'full'
          : emptyLeft
          ? 'left'
          : emptyRight
          ? 'right'
          : 'none'
      "
      class="grow"
      v-bind="bindings"
      @update:model-value="emitUpdate"
    />
    <input
      v-else
      ref="input"
      v-maska:[maskOptions]
      v-bind="bindings"
      :value="modelValue"
      :type="type"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :class="{
        'rounded-l': emptyLeft,
        'rounded-r': emptyRight,
        'w-full border-none bg-white outline-none focus:z-[1] focus:ring-2 focus:ring-primary-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:text-slate-300': true,
      }"
      @input="update"
    />
    <div
      v-if="suffix"
      class="flex shrink-0 items-center justify-center border-l px-4 transition-colors"
      :class="[
        iconRight ? '' : 'rounded-r',
        borderColor,
        backgroundColor,
        textColor,
      ]"
    >
      {{ suffix }}
    </div>
    <div
      v-if="iconRight"
      class="flex shrink-0 items-center justify-center rounded-r border-l px-3 transition-colors"
      :class="[borderColor, backgroundColor, textColor]"
    >
      <BaseIcon :icon="iconRight" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get } from 'lodash';
import { PropType } from 'vue';
import { BaseIcon } from '@/index';
import { useField } from '@/composables/field';
import { vMaska } from 'maska';
import BaseNumber from './BaseNumber.vue';

const props = defineProps({
  modelValue: {
    default: '',
    type: [String, Number, null] as PropType<string | number | null>,
  },
  type: {
    type: String,
    default: 'text',
  },
  step: {
    default: undefined,
    type: Number,
  },
  autocomplete: {
    default: true,
    type: Boolean,
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
  iconLeft: {
    default: undefined,
    type: String,
  },
  iconRight: {
    default: undefined,
    type: String,
  },
  prefix: {
    default: undefined,
    type: String,
  },
  suffix: {
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
  mask: {
    type: [String, Array, Function],
    default() {
      return null;
    },
  },
});

const maskOptions = computed(() => {
  if (props.mask) {
    return {
      mask: maskInternal.value,
    };
  }
  return undefined;
});

const emptyLeft = computed(() => {
  return !props.iconLeft && !props.prefix;
});

const emptyRight = computed(() => {
  return !props.iconRight && !props.suffix;
});

const bindings = computed<any>(() => {
  return {
    name: nameInternal.value,
    step: props.step,
    min: props.min,
    max: props.max,
    disabled: props.disabled,
    placeholder: props.placeholder,
    required: requiredInternal.value,

    onKeydown: {
      enter: onEnter,
    },
    onFocus: (e: Event) => {
      emit('focus', e);
    },
    onBlur: (e: Event) => {
      emit('blur', e);
    },
  };
});

const maskInternal = computed(() => {
  if (props.mask === 'phone') {
    return '(###) ###-####';
  }
  if (props.mask === 'date') {
    return '####-##-##';
  }
  if (props.mask === 'time') {
    return '##:##:##';
  }
  if (props.mask === 'credit-card') {
    return '#### #### #### ####';
  }
  if (props.mask === 'zip-code-canada') {
    return '@#@ #@#';
  }

  return props.mask;
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const { nameInternal, requiredInternal, hasErrorInternal, emitUpdate } =
  useField({
    name: computed(() => props.name),
    required: computed(() => props.required),
    hasError: computed(() => props.hasError),
    emit: emit,
  });

function update(event: any | null) {
  if (event === null) {
    emitUpdate(null);
  }

  return emitUpdate(get(event, 'target.value', ''));
}

function onEnter(e: Event) {
  if (props.preventSubmit) {
    e.preventDefault();
    return;
  }
}

const borderColor = computed(() => {
  return hasErrorInternal.value ? 'border-red-500' : 'border-slate-300';
});

const backgroundColor = computed(() => {
  return hasErrorInternal.value ? 'bg-red-100' : 'bg-slate-100';
});

const textColor = computed(() => {
  return hasErrorInternal.value ? 'text-red-800' : 'text-slate-600';
});
</script>
