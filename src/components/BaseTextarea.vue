<template>
  <textarea
    :value="modelValue ?? undefined"
    :type="type"
    :name="nameInternal"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="requiredInternal"
    :rows="rows"
    :class="[hasErrorInternal ? 'border-red-500' : 'border-slate-300']"
    class="block mb-0 rounded disabled:cursor-not-allowed disabled:text-slate-300"
    @input="emitUpdate(transformInputValue($event))"
  />
</template>

<script lang="ts" setup>
import { useField } from '@/composables/field';
import { get, isString, trim } from 'lodash';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, null, undefined] as PropType<string | null | undefined>,
  },
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    default: true,
    type: Boolean,
  },
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
  rows: {
    default: undefined,
    type: Number,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const { nameInternal, requiredInternal, hasErrorInternal, emitUpdate } =
  useField({
    name: computed(() => props.name),
    required: computed(() => props.required),
    hasError: computed(() => props.hasError),
    emit: emit,
  });

function transformInputValue(event: Event | null): string | null {
  if (event === null) {
    return null;
  }

  const value = get(event, 'target.value', null);

  if (isString(value)) {
    return value;
  }

  return '';
}
</script>
