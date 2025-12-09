<template>
  <div
    ref="wrapper"
    class="wrapper grid"
    :style="{ maxHeight: maxHeight + 'px' }"
  >
    <textarea
      :value="modelValue"
      :name="nameInternal"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="requiredInternal"
      class="resize-none"
      :class="[
        BASE_TEXTAREA_CLASSES,
        hasErrorInternal ? 'border-red-500' : 'border-slate-300',
      ]"
      :style="{ maxHeight: maxHeight + 'px', gridArea: BASE_GRID_AREA }"
      :rows="rows"
      @input="onInput"
      @keyup="onKeyUp"
      @keydown="onKeyDown"
      @focus="onFocus"
    />
    <div
      class="invisible whitespace-pre-wrap"
      :class="[
        BASE_TEXTAREA_CLASSES,
        hasErrorInternal ? 'border-red-500' : 'border-slate-300',
      ]"
      :style="{
        content: DIV_CONTENT,
        maxHeight: maxHeight + 'px',
        gridArea: BASE_GRID_AREA,
      }"
    >
      {{ modelValue }} {{ ' ' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from '@/composables/field';

const BASE_TEXTAREA_CLASSES =
  'py-2 px-3 font-normal text-base disabled:cursor-not-allowed disabled:text-slate-300 font-sans rounded leading-normal tracking-normal border';

const BASE_GRID_AREA = '1 / 1 / 2 / 2';

/* Note the weird space! Needed to prevent jumpy behavior */
const DIV_CONTENT = "attr(data-replicated-value) ' '";

const props = defineProps({
  modelValue: {
    default: '',
    type: String,
  },
  placeholder: {
    default: '',
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  required: {
    default: false,
    type: Boolean,
  },
  maxHeight: {
    default: 100,
    type: Number,
  },
  rows: {
    default: 1,
    type: Number,
  },
  /**
   * Setting this to true will trigger the 'submit' event while pressing Enter.
   * Users will be able to add a line break while pressing Shift + Enter.
   */
  submitOnEnter: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue', 'submit', 'focus', 'input']);

const { nameInternal, requiredInternal, hasErrorInternal, emitUpdate } =
  useField({
    name: computed(() => props.name),
    required: computed(() => props.required),
    hasError: computed(() => props.hasError),
    emit: emit,
  });

const wrapper = ref<null | HTMLDivElement>(null);

const keys = {} as { [key: string]: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onInput(e: any) {
  const value = e.target.value ?? '';
  emit('update:modelValue', value);
  emit('input', e);
}

function onKeyDown(event: KeyboardEvent) {
  keys[event.key] = true;

  if (keys['Enter'] && !keys['Shift'] && props.submitOnEnter) {
    // If submit triggers alert, Enter wont be delete from keys,
    // manually remove it here
    delete keys['Enter'];

    // Submit event to listen to
    emit('submit');

    // Prevent adding an EOL the the textarea
    event.preventDefault();
  }
}

function onKeyUp(event: KeyboardEvent) {
  delete keys[event.key];
}

function onFocus(event: FocusEvent) {
  emit('focus', event);
}
</script>
