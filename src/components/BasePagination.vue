<template>
  <nav
    v-show="lastPage > 1 || lastPage < modelValue"
    ref="paginationNode"
    class="flex items-start border-t border-slate-200"
  >
    <div class="flex grow items-center justify-between">
      <div class="-mt-px flex flex-1">
        <button
          type="button"
          :disabled="modelValue == 1"
          class="inline-flex items-center border-t-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:enabled:border-slate-300 hover:enabled:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          @click="previous()"
        >
          <BaseIcon
            class="mx-2 h-5 w-5 text-slate-400"
            icon="heroicons-solid:chevron-left"
          />
        </button>
      </div>
      <div :class="[mobileLayout ? 'hidden' : '-mt-px flex']">
        <button
          v-for="(i, index) in items"
          :key="i + (index + '')"
          type="button"
          class="inline-flex items-center border-t-2 px-4 py-4 text-sm font-medium"
          :class="[
            i == modelValue ? 'border-primary-500 text-primary-500' : '',
            i != modelValue ? 'border-transparent text-slate-500' : '',
            i != modelValue && isClickable(i)
              ? 'hover:border-slate-300 hover:text-slate-700'
              : '',
          ]"
          @click="onButtonClick(i)"
        >
          {{ i }}
        </button>
      </div>
      <div
        v-if="mobileLayout"
        class="mx-3 flex shrink-0 items-center justify-end"
      >
        <span class="mr-2 text-sm font-normal text-slate-500">
          {{ $t('sui.page') }}
        </span>
        <input
          v-model="manualPageMobile"
          type="number"
          :min="1"
          :max="lastPage"
          :step="1"
          class="rounded border border-slate-300 py-0 px-0.5 pl-1.5"
          @keydown.enter="onManualPageMobileEnter"
          @input="onManualPageMobileInput"
          @blur="setPageFromManualPageMobile"
        />
        <span class="ml-2 text-sm font-normal text-slate-500">
          {{ $t('sui.of') }} {{ lastPage }}
        </span>
      </div>
      <div class="-mt-px flex flex-1 justify-end">
        <button
          :disabled="modelValue >= lastPage"
          class="inline-flex items-center border-t-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:enabled:border-slate-300 hover:enabled:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          @click="next()"
        >
          <BaseIcon
            class="mx-2 h-5 w-5 text-slate-400"
            icon="heroicons-solid:chevron-right"
          />
        </button>
      </div>
    </div>
    <div
      v-if="!mobileLayout"
      class="mt-3 ml-4 flex shrink-0 items-center justify-end"
    >
      <span class="mr-3 text-sm font-medium text-slate-500">
        {{ $t('sui.go_to_page') }}
      </span>
      <input
        v-model="manualPage"
        type="number"
        :min="1"
        :max="lastPage"
        :step="1"
        class="rounded border border-slate-300 py-0.5 px-0.5 pl-2"
        @keydown.enter="onManualPageEnter"
        @input="onManualPageInput"
        @blur="setPageFromManualPage"
      />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { debounce, isNumber, range } from 'lodash';

const props = defineProps({
  modelValue: {
    default: 1,
    required: true,
    type: Number,
  },
  lastPage: {
    required: true,
    type: Number,
  },
  totalVisible: {
    default: 10,
    type: Number,
  },
});

const emit = defineEmits(['update:model-value']);

const manualPage = ref<null | string | number>(null);
const manualPageMobile = ref<null | string | number>(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    manualPageMobile.value = value;
  }
);

function next() {
  if (props.modelValue >= props.lastPage) {
    return;
  }
  updateModalValue(props.modelValue + 1);
}

function previous() {
  if (props.modelValue == 1) {
    return;
  }
  updateModalValue(props.modelValue - 1);
}

const paginationNode = ref<null | HTMLElement>(null);
const width = ref(800);

useResizeObserver(paginationNode, () => {
  width.value = paginationNode.value?.clientWidth ?? 800;
  maxButtons.value = Math.floor((width.value - 96) / 56);
});

const mobileLayout = computed(() => {
  return width.value < 600;
});

const length = computed(() => {
  return props.lastPage + 1;
});

const maxButtons = ref(0);

const items = computed(() => {
  const totalVisible = props.totalVisible + 2;

  if (
    totalVisible === 0 ||
    isNaN(length.value) ||
    length.value > Number.MAX_SAFE_INTEGER
  ) {
    return [];
  }

  const maxLength = Math.min(
    Math.max(0, totalVisible) || length.value,
    Math.max(0, maxButtons.value) || length.value,
    length.value
  );

  if (length.value <= maxLength) {
    return range(1, length.value);
  }

  const even = maxLength % 2 === 0 ? 1 : 0;
  const left = Math.floor(maxLength / 2);
  const right = length.value - left + 1 + even;

  if (props.modelValue > left && props.modelValue < right) {
    const firstItem = 1;
    const lastItem = length.value;
    const start = props.modelValue - left + 2;
    const end = props.modelValue + left - 2 - even;
    const secondItem = start - 1 === firstItem + 1 ? 2 : '...';
    const beforeLastItem = end + 1 === lastItem - 1 ? end + 1 : '...';

    return [1, secondItem, ...range(start, end), beforeLastItem, length.value];
  } else if (props.modelValue === left) {
    const end = props.modelValue + left - 1 - even;
    return [...range(1, end), '...', length.value];
  } else if (props.modelValue === right) {
    const start = props.modelValue - left + 1;
    return [1, '...', ...range(start, length.value)];
  } else {
    return [...range(1, left), '...', ...range(right, length.value)];
  }
});

function isClickable(i: number | string) {
  if (i == '...') {
    return false;
  }
  return true;
}

function onButtonClick(i: number | string) {
  if (!isClickable(i)) {
    return;
  }
  updateModalValue(i);
}

const onManualPageInput = debounce(() => {
  setPageFromManualPage();
}, 1000);

function onManualPageEnter(e: any) {
  e.preventDefault();
  setPageFromManualPage();
}

function setPageFromManualPage() {
  updateModalValue(manualPage.value);
  nextTick(() => {
    manualPage.value = null;
  });
}

const onManualPageMobileInput = debounce(() => {
  setPageFromManualPageMobile();
}, 1000);

function onManualPageMobileEnter(e: any) {
  e.preventDefault();
  setPageFromManualPageMobile();
}

function setPageFromManualPageMobile() {
  updateModalValue(manualPageMobile.value);
  if (!isValidPage(manualPageMobile.value)) {
    nextTick(() => {
      manualPageMobile.value = props.modelValue;
    });
  }
}

function updateModalValue(newPage: number | string | null | undefined) {
  if (isValidPage(newPage)) {
    emit('update:model-value', newPage);
  }
}

function isValidPage(newPage: number | string | null | undefined) {
  if (isNumber(newPage) && newPage >= 1 && newPage <= props.lastPage) {
    return true;
  }
  return false;
}
</script>
