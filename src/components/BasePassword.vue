<template>
  <div
    class="flex rounded border bg-white"
    :class="[
      disabled ? 'cursor-not-allowed text-slate-300' : '',
      hasErrorInternal ? 'border-red-500' : 'border-slate-300',
    ]"
  >
    <input
      ref="input"
      :value="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :name="nameInternal"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="requiredInternal"
      class="grow rounded-l rounded-r-none border-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed"
      @input="onInput"
    />
    <div class="flex shrink-0 pl-3">
      <button
        tabindex="-1"
        type="button"
        class="pr-3 text-slate-500 disabled:cursor-not-allowed disabled:text-slate-300"
        :disabled="disabled"
        @click="showPassword = !showPassword"
      >
        <BaseIcon
          v-if="!showPassword"
          icon="heroicons:eye-slash-20-solid"
          class="h-5 w-5"
        />
        <BaseIcon v-else icon="heroicons:eye-20-solid" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { trim } from 'lodash';
import { Icon as BaseIcon } from '@iconify/vue';
import { PropType } from 'vue';
import { useField } from '@/composables/field';

const props = defineProps({
  modelValue: {
    default: '',
    type: [String, null] as PropType<string | null>,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  name: {
    default: undefined,
    type: String,
  },
  placeholder: {
    default: undefined,
    type: String,
  },
  required: {
    default: false,
    type: Boolean,
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

const showPassword = ref(false);

function onInput(event: any) {
  const value = event.target.value + '';
  emitUpdate(trim(value));
}
</script>
