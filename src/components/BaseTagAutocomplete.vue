<template>
  <div ref="autocomplete">
    <div
      class="relative z-[1] rounded border bg-white p-1"
      :class="[
        hasErrorInternal ? 'border-red-600' : 'border-slate-300',
        wrapperClass,
      ]"
    >
      <div class="-m-0.5 flex flex-wrap">
        <div
          v-for="selection in normalizedModelValue"
          :key="selection.value ? selection.value : 'null'"
          class="p-0.5"
        >
          <div
            class="flex items-stretch rounded border"
            :class="[
              disabled ? 'cursor-not-allowed opacity-60' : '',
              selectionClass(selection),
            ]"
          >
            <div :class="[selectionLabelClass]">
              {{ selection.label }}
            </div>
            <button
              v-if="!disabled"
              type="button"
              class="flex shrink-0 appearance-none items-center justify-center border-0 bg-transparent pl-1 pr-3 text-xs outline-none"
              @click="removeOption(selection)"
            >
              ✕
            </button>
          </div>
        </div>
        <div class="grow p-0.5">
          <input
            ref="inputElement"
            :value="keywords"
            type="text"
            :placeholder="placeholder ? placeholder : $t('sui.select_an_item')"
            class="w-full min-w-[50px] border-none p-0 pl-1 shadow-none outline-none focus:border-none focus:shadow-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
            :class="[inputClass]"
            autocomplete="off"
            :disabled="disabled"
            @click="open"
            @input="onTextInput"
            @keydown="onTextKeydown"
          />
        </div>
      </div>
    </div>

    <div class="relative">
      <div
        v-if="opened || dropdownShow == 'always'"
        :class="[
          inline
            ? 'relative'
            : 'absolute top-1 z-menu min-h-[110px] w-full overflow-hidden rounded border border-slate-300 bg-white shadow-md',
        ]"
      >
        <BaseAutocompleteDrawer
          ref="drawer"
          :selected="normalizedModelValue"
          :options="filteredNormalizedOptions"
          :size="size"
          :loading="loading"
          :loading-bottom="loadingBottom"
          :drawer-class="inline ? 'pt-1' : 'p-1'"
          :keywords="keywords"
          @select="onSelect"
          @scroll-bottom="emit('scrollBottom')"
        >
          <template #empty="emptyProps">
            <slot name="empty" v-bind="{ ...emptyProps, ...slotProps }" />
          </template>
          <template #option="optionProps">
            <slot name="option" v-bind="{ ...optionProps, ...slotProps }" />
          </template>
          <template #footer="footerProps">
            <slot name="footer" v-bind="{ ...footerProps, ...slotProps }" />
          </template>
        </BaseAutocompleteDrawer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep, get } from 'lodash';
import { PropType, ComputedRef } from 'vue';
import { NormalizedOption, Option } from '@/types';
import { useHasOptions } from '@/composables/hasOptions';
import { useField } from '@/composables/field';
import { useClickOutside } from '@/composables/clickOutside';
import { useNotificationsStore } from '@/stores/notifications';
import BaseAutocompleteDrawer from './BaseAutocompleteDrawer.vue';

const i18n = useI18n();
const notifications = useNotificationsStore();

const props = defineProps({
  modelValue: {
    required: true,
    type: [Array, null] as PropType<Option[] | null>,
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
  name: {
    default: undefined,
    type: String,
  },
  placeholder: {
    default: undefined,
    type: String,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  loadingBottom: {
    default: false,
    type: Boolean,
  },
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  max: {
    default: undefined,
    type: Number,
  },
  filter: {
    default: undefined,
    type: Function as PropType<(option: NormalizedOption) => boolean>,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  inline: {
    default: false,
    type: Boolean,
  },
  size: {
    default: 'base',
    type: String as PropType<'xs' | 'sm' | 'base'>,
  },
  dropdownShow: {
    default: 'focus',
    type: String as PropType<'focus' | 'always'>,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'typing',
  'open',
  'close',
  'scrollBottom',
]);

const { hasErrorInternal, emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const hasOptions = useHasOptions(
  computed(() => props.modelValue),
  computed(() => props.options),
  computed(() => props.labelKey),
  computed(() => props.valueKey),
  computed(() => true)
);

const drawer = ref<InstanceType<typeof BaseAutocompleteDrawer> | null>(null);

const keywords = ref('');
const autocomplete = ref<HTMLElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const shouldFilter = ref(false);
const opened = ref(false);
const selectionToDelete = ref<NormalizedOption | null>(null);

const isSelected = hasOptions.isSelected;
const normalizedOptions = hasOptions.normalizedOptions;
const normalizedModelValue = hasOptions.normalizedModelValue as ComputedRef<
  NormalizedOption[]
>;

const filteredNormalizedOptions = computed((): NormalizedOption[] => {
  return normalizedOptions.value
    .filter((option) => {
      if (shouldFilter.value === false) {
        return true;
      }
      if (props.filter !== undefined) {
        return props.filter(option);
      }
      if (!option.label) {
        return false;
      }
      return option.label.toLowerCase().includes(keywords.value.toLowerCase());
    })
    .filter((option) => {
      return !isSelected(option);
    });
});

useClickOutside(autocomplete, () => {
  close();
});

function open() {
  // Always focus as a safety
  focus();
  // Only emit open if value changes
  if (!opened.value) {
    opened.value = true;
    emit('open');
  }
}

function close() {
  shouldFilter.value = false;
  opened.value = false;
  blur();
  emit('close');
}

const onTextInput = (event: Event) => {
  open();
  shouldFilter.value = true;
  setKeywords(get(event, 'target.value', '') + '');
  emit('typing', keywords.value);

  selectionToDelete.value = null;
};

const onTextKeydown = (event: KeyboardEvent) => {
  const key = event.key;

  drawer.value?.onKeydown(event);

  // Prevent default behavior for up/down arrows

  if (key === 'ArrowUp') {
    event.preventDefault();
    return;
  }

  if (key === 'ArrowDown') {
    event.preventDefault();
    return;
  }

  // Attempt to remove last selection on backspace
  if (key === 'Backspace' && keywords.value == '') {
    attemptRemoveLastSelection();
    return;
  }
};

const onSelect = (option: NormalizedOption) => {
  focus();

  if (props.max && normalizedModelValue.value.length >= props.max) {
    notifications.push({
      title: i18n.t('sui.whoops'),
      text: i18n.t('sui.you_cannot_select_more_than_x_items', {
        count: props.max,
      }),
      color: 'warning',
    });
    return;
  }

  if (isSelected(option)) {
    return;
  }

  selectionToDelete.value = null;
  update([...normalizedModelValue.value, option]);
  setKeywords('');
  emit('typing', keywords.value);
};

function update(value: NormalizedOption[]) {
  // Re-activate filter
  shouldFilter.value = false;
  // Emit update
  emitUpdate(value.map((v) => v.option));
}

function setKeywords(input: string) {
  keywords.value = input;
}

function focus() {
  inputElement.value?.focus();
}

function blur() {
  inputElement.value?.blur();
}

const slotProps = {
  focus,
  blur,
  open,
  close,
  keywords: computed(() => keywords.value),
};

const attemptRemoveLastSelection = () => {
  const optionValueToDelete =
    normalizedModelValue.value[normalizedModelValue.value.length - 1] ?? null;

  if (
    selectionToDelete.value &&
    optionValueToDelete &&
    optionValueToDelete.value == selectionToDelete.value.value
  ) {
    removeOption(selectionToDelete.value);
    selectionToDelete.value = null;
    return;
  }

  selectionToDelete.value =
    normalizedModelValue.value.find((v) => {
      return v.value === optionValueToDelete.value;
    }) ?? null;
};

const removeOption = (option: NormalizedOption) => {
  focus();
  let newModelValue = cloneDeep(normalizedModelValue.value);
  newModelValue = newModelValue.filter((v) => v.value != option.value);
  update(newModelValue);
};

// Element Classes

const wrapperClass = computed(() => {
  if (props.size == 'xs') {
    return 'min-h-[34px]';
  }
  if (props.size == 'sm') {
    return 'min-h-[38px]';
  }
  return 'min-h-[42px]';
});

const inputClass = computed(() => {
  const base = 'h-[32px] text-base';
  if (props.size == 'xs') {
    return base + ' xs:text-xs xs:h-[22px]';
  }
  if (props.size == 'sm') {
    return base + ' xs:text-sm xs:h-[28px]';
  }
  return base;
});

const selectionClass = (selection: NormalizedOption): string => {
  if (
    selectionToDelete.value &&
    selectionToDelete.value.value == selection.value
  ) {
    return 'bg-red-200 border-red-300 text-red-800';
  }
  return 'bg-slate-200 border-slate-300';
};

const selectionLabelClass = computed((): string => {
  let base = 'py-[5px] pl-[0.75em] text-sm';
  props.disabled ? (base += ' pr-[0.75em]') : (base += ' pr-1');
  if (props.size == 'xs') {
    const classes = base + ' xs:py-[3px] xs:pl-2 xs:text-xs';
    return classes;
  }
  if (props.size == 'sm') {
    const classes = base + ' xs:py-[3px] xs:pl-2 xs:text-sm';
    return classes;
  }
  const classes = base;
  return classes;
});

defineExpose({
  focus,
  blur,
  close,
  open,
  setKeywords,
});
</script>
