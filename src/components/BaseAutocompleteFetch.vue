<template>
  <BaseAutocomplete
    ref="autocomplete"
    :loading="showLoading && page == 1"
    :loading-bottom="showLoading && page > 1"
    :model-value="modelValue"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
    :options="options"
    :value-key="valueKey"
    :label-key="labelKey"
    :has-error="hasError"
    :required="required"
    :size="size"
    :inline="inline"
    :dropdown-show="dropdownShow"
    :show-model-value="showModelValue"
    :visible-focus="visibleFocus"
    :show-empty-option="showEmptyOption"
    :empty-option-label="emptyOptionLabel"
    :select="select"
    :filter="filterOptions"
    @clear="onClear"
    @open="onOpen"
    @typing="onTyping"
    @scroll-bottom="scrollBottom"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #option="optionProps">
      <slot name="option" v-bind="optionProps" />
    </template>

    <template #footer="footerProps">
      <slot name="footer" v-bind="footerProps" :keywords="keywords" />
    </template>

    <template #empty="emptyProps">
      <slot name="empty" v-bind="emptyProps" :first-search="firstSearch">
        <div
          v-if="firstSearch"
          class="flex h-[80px] items-center justify-center px-3 text-center text-base leading-tight text-slate-600"
        >
          {{ $t('sui.nothing_found') }}
        </div>
      </slot>
    </template>
  </BaseAutocomplete>
</template>

<script lang="ts" setup>
import { config } from '@/index';
import { debounce, throttle } from 'lodash';
import { PropType } from 'vue';
import { Option, SelectConfiguration } from '@/types';
import BaseAutocomplete from './BaseAutocomplete.vue';

/**
 * Behavior notes
 *
 * - When the user types, the component will fetch the data from the API.
 * - When the user scrolls to the bottom, the component will fetch the next page.
 * - When the user clears the input, the component will NOT re-fetch the data if the current query is already empty.
 * - When a value is selected, the component will NOT re-fetch the data.
 */

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [Object, null] as PropType<Option | null | undefined>,
  },
  url: {
    required: true,
    type: String,
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
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  queryKey: {
    default: 'search',
    type: String,
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
  showEmptyOption: {
    default: false,
    type: Boolean,
  },
  emptyOptionLabel: {
    default: undefined,
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
  'focus',
  'scrollBottom',
  'clear',
]);

const showLoading = ref(false);
const fetching = ref(false);
const firstSearch = ref(false);
const reachedEnd = ref(false);
const keywords = ref('');
const page = ref(1);
const options = ref<Option[]>([]);

const autocomplete = ref<InstanceType<typeof BaseAutocomplete> | null>(null);

const onTyping = (query: string) => {
  page.value = 1;
  reachedEnd.value = false;
  keywords.value = query;
  showLoading.value = true;
  debouncedSearch();
};

const onOpen = () => {
  if (!firstSearch.value) {
    search();
  }
};

const onClear = () => {
  if (keywords.value != '') {
    keywords.value = '';
    search();
  }
  emit('clear');
};

const scrollBottom = throttle(() => {
  if (fetching.value) {
    return;
  }

  if (!reachedEnd.value) {
    page.value++;
    search();
  }
}, 500);

watch(
  () => props.url,
  () => {
    page.value = 1;
    reachedEnd.value = false;
    search();
  }
);

function search() {
  if (fetching.value) {
    return;
  }

  fetching.value = true;
  showLoading.value = true;

  config.http
    .get(props.url, {
      params: {
        [props.queryKey]: keywords.value,
        page: page.value,
      },
    })
    .then((response: any) => {
      const data = response.data.data as Option[];

      if (data.length == 0) {
        reachedEnd.value = true;
      }

      if (page.value == 1) {
        options.value = data;
      } else {
        options.value.push(...data);
      }

      firstSearch.value = true;
    })
    .finally(() => {
      fetching.value = false;
      showLoading.value = false;
    });
}

const debouncedSearch = debounce(() => {
  search();
}, 300);

function filterOptions(option: Option): boolean {
  // Do nothing if showEmptyOption is false
  if (!props.showEmptyOption) {
    return true;
  }

  // Hide the empty value on search
  if (
    option.value == null &&
    !option.label.toLowerCase().includes(keywords.value.toLowerCase())
  ) {
    return false;
  }
  return true;
}

defineExpose({
  focus: () => autocomplete.value?.focus(),
  blur: () => autocomplete.value?.blur(),
  open: () => autocomplete.value?.open(),
  close: () => autocomplete.value?.close(),
  setKeywords: (input: string) => autocomplete.value?.setKeywords(input),
});
</script>
