<template>
  <div ref="autocomplete">
    <div class="relative z-[1]">
      <div class="flex">
        <select
          v-if="select"
          v-model="selection"
          :disabled="disabled"
          class="rounded-l border-r-transparent focus:z-[1] focus:border-r-blue-500 disabled:cursor-not-allowed disabled:text-slate-300 disabled:opacity-100"
          :class="[
            hasErrorInternal ? 'border-red-600' : 'border-slate-300',
            inputSelectClass,
          ]"
          @change="onSelectChange"
        >
          <option
            v-for="option in select.options"
            :key="option.value + ''"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <div class="relative grow">
          <input
            ref="inputElement"
            :value="keywords"
            type="text"
            :placeholder="
              placeholder ? placeholder : $t('sui.autocomplete_placeholder')
            "
            class="relative w-full pr-9 disabled:cursor-not-allowed disabled:text-slate-300"
            :class="[
              select ? '-left-px rounded-r' : 'rounded',
              hasErrorInternal ? 'border-red-600' : 'border-slate-300',
              inputSizeClass,
              !visibleFocus
                ? [
                    'focus:ring-0',
                    hasErrorInternal
                      ? 'focus:border-red-600'
                      : 'focus:border-slate-300',
                  ]
                : '',
            ]"
            autocomplete="off"
            :disabled="disabled"
            @click="open"
            @input="onTextInput"
            @keydown="onTextKeydown"
          />
          <div
            class="pointer-events-none absolute top-0 left-0 flex h-full items-center justify-center"
            :class="[iconWrapClass]"
          >
            <BaseIcon
              class="text-slate-400"
              :class="[iconClass]"
              icon="heroicons:magnifying-glass-solid"
            />
          </div>
        </div>
      </div>

      <div
        v-if="normalizedModelValue && !disabled && showModelValue"
        class="absolute top-0 right-0 flex h-full items-center p-1"
      >
        <button
          type="button"
          class="group flex h-full items-center rounded p-1.5 enabled:hover:bg-slate-100"
          @click="clear()"
        >
          <BaseIcon
            icon="heroicons:x-mark"
            class="text-slate-500 group-hover:text-slate-700"
            :class="[iconClass]"
          />
        </button>
      </div>
    </div>

    <div class="relative">
      <div
        v-show="opened || dropdownShow == 'always'"
        class="w-full overflow-hidden"
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
import { get } from 'lodash';
import { PropType, ComputedRef } from 'vue';
import { NormalizedOption, Option, OptionValue } from '@/types';
import { useHasOptions } from '@/composables/hasOptions';
import { useField } from '@/composables/field';
import { BaseIcon } from './index';
import { useClickOutside } from '@/composables/clickOutside';
import BaseAutocompleteDrawer from './BaseAutocompleteDrawer.vue';
import { SelectConfiguration } from '@/types';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [Object, null] as PropType<Option | null | undefined>,
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
  showModelValue: {
    default: true,
    type: Boolean,
  },
  visibleFocus: {
    default: true,
    type: Boolean,
  },
  /** Show an 'empty option', should use with showModelValue = true for better UX  */
  showEmptyOption: {
    default: false,
    type: Boolean,
  },
  emptyOptionLabel: {
    default() {
      const i18n = useI18n();
      return i18n.t('sui.none');
    },
    type: String,
  },
  select: {
    default: undefined,
    type: Object as PropType<SelectConfiguration | undefined>,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'typing',
  'clear',
  'open',
  'close',
  'scrollBottom',
  'select',
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
  computed(() => false)
);

const drawer = ref<InstanceType<typeof BaseAutocompleteDrawer> | null>(null);

let timerId = 0;
const keywords = ref('');
const autocomplete = ref<HTMLElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const shouldFilter = ref(false);
const opened = ref(false);

const normalizedOptions = hasOptions.normalizedOptions;
const normalizedModelValue =
  hasOptions.normalizedModelValue as ComputedRef<NormalizedOption | null>;

const filteredNormalizedOptions = computed((): NormalizedOption[] => {
  let options = normalizedOptions.value;

  if (props.showEmptyOption) {
    const emptyOption = {
      [props.valueKey]: null,
      [props.labelKey]: props.emptyOptionLabel,
      option: null,
    };

    options = [
      { value: null, label: props.emptyOptionLabel, option: emptyOption },
      ...options,
    ];
  }

  if (shouldFilter.value === false) {
    return options;
  }

  return options.filter((option) => {
    if (props.filter !== undefined) {
      return props.filter(option);
    }
    if (!option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(keywords.value.toLowerCase());
  });
});

// Update the keywords when the model value changes
watch(
  () => normalizedModelValue.value,
  () => {
    if (normalizedModelValue.value) {
      if (props.showModelValue) {
        setKeywords(normalizedModelValue.value?.label);
      }
    } else {
      if (props.showModelValue) {
        if (props.showEmptyOption) {
          setKeywords(props.emptyOptionLabel);
        } else {
          setKeywords('');
        }
      }
    }
  },
  { immediate: true }
);

useClickOutside(autocomplete, () => {
  close();
});

function open() {
  clearInterval(timerId);
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
  timerId = setTimeout(() => {
    // If no valid modelValue is set on close, set the keywords to the original value
    if (props.showModelValue) {
      if (normalizedModelValue.value) {
        setKeywords(normalizedModelValue.value.label);
      } else {
        if (props.showEmptyOption) {
          setKeywords(props.emptyOptionLabel);
        } else {
          setKeywords('');
        }
      }
    }
  }, 10);
  emit('close');
}

const onTextInput = (event: Event) => {
  open();
  shouldFilter.value = true;
  setKeywords(get(event, 'target.value') + '');
  emit('typing', keywords.value);

  // If keywords is empty, emit null
  if (keywords.value == '' && !props.showEmptyOption) {
    update(null);
  }
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
};

const clear = () => {
  update(null);
  emit('clear');
};

function onSelect(normalizedModelValue: Option | null | undefined) {
  focus();
  update(normalizedModelValue);
  if (props.dropdownShow == 'focus') {
    close();
  }
}

function update(normalizedSelection: Option | null | undefined) {
  // Re-activate filter
  shouldFilter.value = false;

  // Emit update
  let selection = normalizedSelection ? normalizedSelection.option : null;

  if (
    props.showEmptyOption &&
    normalizedSelection &&
    normalizedSelection.value == null
  ) {
    selection = null;
  }

  emitUpdate(selection);
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

function highlight() {
  inputElement.value?.select();
}

const selection = ref<OptionValue>(null);

watch(
  () => props.select,
  (select) => {
    if (select) {
      if (select.option) {
        selection.value = select.option.value;
      } else if (select.options.length) {
        selection.value = select.options[0].value;
      }
    } else {
      selection.value = null;
    }
  },
  { immediate: true }
);

function onSelectChange(event: Event) {
  const value = get(event, 'target.value', null);
  const option = props.select?.options.find((option) => option.value == value);

  if (props.select && props.select.onChange) {
    props.select.onChange(option ?? null);
  }

  emit('select', value);

  // Let the emitted select event propagate before opening the dropdown
  nextTick(() => {
    focus();
    open();
    highlight();
  });
}

const slotProps = {
  focus,
  blur,
  open,
  close,
  keywords: computed(() => keywords.value),
};

// Element Classes

const inputSizeClass = computed(() => {
  if (props.size == 'xs') {
    return 'xs:text-xs xs:pl-7 text-base pl-9';
  }
  if (props.size == 'sm') {
    return 'xs:text-sm xs:pl-8 text-base pl-9';
  }
  return 'text-base pl-9';
});

const inputSelectClass = computed(() => {
  if (props.size == 'xs') {
    return 'xs:text-xs text-base';
  }
  if (props.size == 'sm') {
    return 'xs:text-sm text-base';
  }
  return 'text-base';
});

const iconClass = computed(() => {
  if (props.size == 'xs') {
    return 'xs:h-4 xs:w-4 h-5 w-5';
  }
  if (props.size == 'sm') {
    return 'xs:h-5 xs:w-5 h-5 w-5';
  }
  return 'h-5 w-5';
});

const iconWrapClass = computed(() => {
  if (props.size == 'xs') {
    return 'xs:pl-2 pl-2.5';
  }
  if (props.size == 'sm') {
    return 'xs:pl-2 pl-2.5';
  }
  return 'pl-2.5';
});

defineExpose({
  focus,
  blur,
  close,
  open,
  setKeywords,
});
</script>
