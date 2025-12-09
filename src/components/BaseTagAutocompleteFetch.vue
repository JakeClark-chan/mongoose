<template>
  <BaseTagAutocomplete
    ref="tagAutocomplete"
    :loading="showLoading && page == 1"
    :loading-bottom="showLoading && page > 1"
    :model-value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :options="options"
    :value-key="valueKey"
    :label-key="labelKey"
    :has-error="hasError"
    :max="max"
    :filter="() => true"
    @open="onOpen"
    @typing="onTyping"
    @scroll-bottom="scrollBottom"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #option="optionProps">
      <slot name="option" v-bind="optionProps" />
    </template>

    <template #footer="footerProps">
      <slot name="footer" v-bind="footerProps" :keywords="keywords"> </slot>
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
  </BaseTagAutocomplete>
</template>

<script lang="ts" setup>
import { debounce, throttle } from 'lodash';
import { config } from '@/index';
import { PropType } from 'vue';
import { Option } from '@/types';
import BaseTagAutocomplete from './BaseTagAutocomplete.vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: Array as PropType<Option[]>,
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
  max: {
    default: undefined,
    type: Number,
  },
  queryKey: {
    default: 'search',
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

defineEmits(['update:modelValue', 'typing', 'focus', 'scrollBottom']);

const tagAutocomplete = ref<InstanceType<typeof BaseTagAutocomplete> | null>(
  null
);

const http = config.http;

const showLoading = ref(false);
const fetching = ref(false);
const firstSearch = ref(false);
const reachedEnd = ref(false);
const keywords = ref('');
const page = ref(1);
const options = ref<Option[]>([]);

const onTyping = (query: string) => {
  page.value = 1;
  reachedEnd.value = false;

  if (keywords.value != query) {
    keywords.value = query;
    showLoading.value = true;
    debouncedSearch();
  }
};

const onOpen = () => {
  if (!firstSearch.value) {
    search();
  }
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

const search = () => {
  if (fetching.value) {
    return;
  }

  fetching.value = true;
  showLoading.value = true;
  firstSearch.value = true;

  http
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
};

const debouncedSearch = debounce(() => {
  search();
}, 300);

defineExpose({
  focus: () => tagAutocomplete.value?.focus(),
  blur: () => tagAutocomplete.value?.blur(),
  open: () => tagAutocomplete.value?.open(),
  close: () => tagAutocomplete.value?.close(),
  setKeywords: (input: string) => tagAutocomplete.value?.setKeywords(input),
});
</script>
