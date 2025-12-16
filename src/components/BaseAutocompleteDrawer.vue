<template>
  <div class="relative w-full overflow-hidden">
    <div
      ref="drawer"
      data-scroll-lock-scrollable
      class="max-h-[214px] w-full overflow-y-auto"
    >
      <!-- Slot empty -->
      <slot v-if="options.length == 0" name="empty">
        <div
          class="flex items-center justify-center px-5 py-10 text-center text-slate-600"
        >
          {{ $t('sui.nothing_found') }}
        </div>
      </slot>

      <!-- Option list -->
      <ul v-else :class="drawerClass">
        <li
          v-for="(option, index) in options"
          :key="option.value ? option.value : 'null'"
          :data-index="index"
          class="block"
        >
          <button
            class="block w-full cursor-pointer select-none appearance-none border-none text-left focus:outline-none"
            type="button"
            tabindex="-1"
            @click="onSelect(option)"
            @mouseenter="onOptionMouseEnter(index)"
            @mousemove="onOptionMouseMove(index)"
          >
            <slot
              name="option"
              :option="option.option"
              :selected="isSelected(option)"
              :active="focusOption && focusOption.value == option.value"
            >
              <div
                class="flex items-center rounded px-[0.75em] py-[0.5em]"
                :class="[optionClass(option), optionSizeClass]"
              >
                <div class="grow">
                  {{ option.label }}
                </div>
                <div class="shrink-0">
                  <BaseIcon
                    v-if="isSelected(option)"
                    icon="heroicons:check-20-solid"
                    :class="optionIconClass"
                  ></BaseIcon>
                </div>
              </div>
            </slot>
          </button>
        </li>
      </ul>

      <!-- Loading bottom -->
      <!-- This component should always take the same amount of space whether it's visible or not -->
      <!-- This is to prevent infinite scroll jumps -->
      <div
        :class="[loadingBottom ? 'opacity-100' : 'opacity-0']"
        class="relative py-3 text-center"
      >
        <div
          class="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-white"
        ></div>
        <BaseSpinnerSmall
          class="mx-auto h-7 w-7 text-slate-300"
        ></BaseSpinnerSmall>
      </div>
    </div>

    <div ref="footer">
      <div v-if="$slots.footer" class="bg-white">
        <slot :options="options" name="footer" />
      </div>
    </div>

    <div
      v-if="loading"
      class="absolute inset-0 h-full w-full space-y-1 bg-white p-2"
    >
      <div class="space-y-1">
        <BaseSkeleton class="h-7 w-full" delay="0ms"></BaseSkeleton>
        <BaseSkeleton class="h-7 w-full opacity-70" delay="50ms"></BaseSkeleton>
        <BaseSkeleton
          class="h-7 w-full opacity-30"
          delay="100ms"
        ></BaseSkeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { NormalizedOption } from '@/types';
import { isArray, isObject, throttle } from 'lodash';
import BaseSkeleton from './BaseSkeleton.vue';
import { BaseIcon } from '.';
import BaseSpinnerSmall from '../svg/BaseSpinnerSmall.vue';

const props = defineProps({
  selected: {
    type: [Array, Object, null, undefined] as PropType<
      NormalizedOption[] | NormalizedOption | null | undefined
    >,
    default: undefined,
  },
  options: {
    type: Array as PropType<NormalizedOption[]>,
    default() {
      return [];
    },
  },
  keywords: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingBottom: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'base'>,
    default: 'base',
  },
  drawerClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['scrollBottom', 'select']);

const drawer = ref<HTMLDivElement | null>(null);

let mouseIsMoving = false;

// Focus

const focusIndex = ref(0);

const focusOption = computed(() => {
  return (
    props.options[Math.min(focusIndex.value, props.options.length - 1)] ?? null
  );
});

// Selecting

function onSelect(option: NormalizedOption) {
  emit('select', option);
}

function isSelected(option: NormalizedOption): boolean {
  if (isArray(props.selected)) {
    return props.selected.some((modelValue) => {
      return modelValue.value === option.value;
    });
  }

  if (isObject(props.selected)) {
    return props.selected.value == option.value;
  }

  return false;
}

// Arrow actions

function onKeydown(event: KeyboardEvent) {
  const key = event.key;

  mouseIsMoving = false;

  if (props.loading) {
    return;
  }

  if (key === 'ArrowDown') {
    if (focusIndex.value < props.options.length - 1) {
      focusIndex.value++;
    } else {
      focusIndex.value = 0;
    }
    scrollToFocus();
    return;
  }

  if (key === 'ArrowUp') {
    if (focusIndex.value > 0) {
      focusIndex.value--;
    } else {
      focusIndex.value = Math.max(0, props.options.length - 1);
    }
    scrollToFocus();
    return;
  }

  if (key === 'Enter') {
    event.preventDefault();
    if (focusOption.value) {
      onSelect(focusOption.value);
    }
    return;
  }
}

// Infinite scroll

onMounted(() => {
  useInfiniteScroll(
    drawer.value,
    () => {
      emit('scrollBottom');
    },
    { distance: 100 }
  );
});

function scrollToFocus() {
  if (!drawer.value) {
    return;
  }

  const option = drawer.value.querySelector(
    `[data-index="${focusIndex.value}"]`
  ) as HTMLElement | null;

  if (!option) {
    return;
  }

  const dropdownHeight = drawer.value.clientHeight;
  const offsetTop = option.offsetTop;
  const optionHeight = option.clientHeight;

  drawer.value.scrollTop = offsetTop - dropdownHeight / 2 + optionHeight / 2;
}

// Validate focus index

watch(
  () => props.options,
  () => {
    updateFocusIndex(
      Math.max(0, Math.min(focusIndex.value, props.options.length - 1))
    );
  },
  { immediate: true }
);

// Update the focusIndex when the selected value changes

watch(
  () => props.selected,
  () => {
    // Single selection
    if (isObject(props.selected) && !isArray(props.selected)) {
      const selected = props.selected as NormalizedOption;
      const index = props.options.findIndex(
        (option) => option.value === selected.value
      );
      if (index >= 0) {
        updateFocusIndex(index);
      }
    }
    // Multiple selection
    else if (isArray(props.selected)) {
      if (!(focusIndex.value in props.options)) {
        updateFocusIndex(props.options.length - 1);
      }
    } else {
      updateFocusIndex(0);
    }
  },
  { immediate: true }
);

// Scroll top when the keywords change

watch(
  () => props.keywords,
  () => {
    if (drawer.value) {
      drawer.value.scrollTop = 0;
    }
    // Reset the focusIndex
    updateFocusIndex(0);
  }
);

function updateFocusIndex(index: number) {
  if (index != focusIndex.value) {
    focusIndex.value = index;
    scrollToFocus();
  }
}

const onOptionMouseEnter = (index: number) => {
  if (mouseIsMoving) {
    focusIndex.value = index;
  }
};

const onOptionMouseMove = throttle((index: number) => {
  mouseIsMoving = true;
}, 10);

// Classes

const optionClass = (option: NormalizedOption) => {
  const focus = focusOption.value && focusOption.value.value == option.value;

  if (focus) {
    return 'bg-slate-200';
  }

  return 'bg-white';
};

const optionSizeClass = computed(() => {
  if (props.size == 'xs') {
    return 'text-xs';
  }
  if (props.size == 'sm') {
    return 'text-sm';
  }
  return 'text-sm';
});

const optionIconClass = computed(() => {
  if (props.size == 'xs') {
    return 'w-4 h-4';
  }
  if (props.size == 'sm') {
    return 'w-5 h-5';
  }
  return 'w-5 h-5';
});

defineExpose({
  onKeydown,
});
</script>
