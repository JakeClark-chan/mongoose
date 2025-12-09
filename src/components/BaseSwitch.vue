<template>
  <SwitchGroup>
    <div class="inline-flex items-center space-x-3">
      <Switch
        :model-value="normalizedModelValue"
        :class="[
          modelValue ? bg : 'bg-slate-200',
          'relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ',
          focus,
        ]"
        :style="{
          width: width + 'px',
          height: height + 'px',
        }"
        @update:model-value="update"
      >
        <span
          aria-hidden="true"
          :style="{
            height: sizePx + 'px',
            width: sizePx + 'px',
            transform: `translateX(${translateX}px)`,
          }"
          class="pointer-events-none inline-block rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
      <SwitchLabel v-if="$slots.default" class="cursor-pointer">
        <slot />
      </SwitchLabel>
    </div>
  </SwitchGroup>
</template>

<script lang="ts" setup>
import { useField } from '@/composables/field';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { isNumber, isString } from 'lodash';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    default: false,
    type: [Boolean, String, Number, null, undefined] as PropType<
      boolean | string | number | null | undefined
    >,
  },
  name: {
    default: undefined,
    type: String,
  },
  color: {
    default: 'primary',
    type: String as PropType<
      'primary' | 'info' | 'danger' | 'warning' | 'success' | 'dark' | 'light'
    >,
  },
  size: {
    default: 'base',
    type: String as PropType<'xs' | 'sm' | 'base' | 'lg' | 'xl'>,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  required: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const { emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const normalizedModelValue = computed((): boolean => {
  if (isString(props.modelValue)) {
    return props.modelValue === 'true' || props.modelValue === '1';
  }
  if (isNumber(props.modelValue)) {
    return props.modelValue === 1;
  }
  return props.modelValue ?? false;
});

const bg = computed(() => {
  if (props.color == 'primary') {
    return 'bg-primary-500';
  }
  if (props.color == 'info') {
    return 'bg-blue-500';
  }
  if (props.color == 'danger') {
    return 'bg-red-500';
  }
  if (props.color == 'warning') {
    return 'bg-yellow-500';
  }
  if (props.color == 'success') {
    return 'bg-green-500';
  }
  if (props.color == 'light') {
    return 'bg-slate-500';
  }
  return 'bg-slate-900';
});
const focus = computed(() => {
  if (props.color == 'primary') {
    return 'focus:ring-primary-500';
  }
  if (props.color == 'info') {
    return 'focus:ring-blue-500';
  }
  if (props.color == 'danger') {
    return 'focus:ring-red-500';
  }
  if (props.color == 'warning') {
    return 'focus:ring-yellow-500';
  }
  if (props.color == 'success') {
    return 'focus:ring-green-500';
  }
  if (props.color == 'light') {
    return 'focus:ring-slate-500';
  }
  return 'focus:ring-slate-900';
});
const sizePx = computed(() => {
  if (props.size == 'xs') {
    return 12;
  }
  if (props.size == 'sm') {
    return 16;
  }
  if (props.size == 'base') {
    return 20;
  }
  if (props.size == 'lg') {
    return 24;
  }
  if (props.size == 'xl') {
    return 32;
  }
  return 16;
});
const padding = computed(() => {
  if (props.size == 'xs') {
    return 2;
  }
  if (props.size == 'sm') {
    return 2.5;
  }
  if (props.size == 'base') {
    return 3;
  }
  if (props.size == 'lg') {
    return 3;
  }
  if (props.size == 'xl') {
    return 4;
  }
  return 2;
});
const height = computed(() => {
  return sizePx.value + 2 * padding.value;
});
const distance = computed(() => {
  return 2 * sizePx.value;
});
const width = computed(() => {
  return distance.value + 2 * padding.value;
});
const translateX = computed(() => {
  if (props.modelValue) {
    return padding.value + distance.value - sizePx.value;
  }

  return padding.value;
});

function update(payload: any) {
  emitUpdate(payload);
}
</script>
