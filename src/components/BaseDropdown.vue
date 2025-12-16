<template>
  <div>
    <button ref="button" type="button" @click="toggle()">
      <slot name="button"></slot>
    </button>
    <Teleport to="body">
      <div ref="dropdown" class="z-menu" :style="dropdownStyles">
        <Transition
          :enter-active-class="
            animated ? 'transition duration-200 ease-out' : ''
          "
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          :leave-active-class="animated ? 'transition duration-75 ease-in' : ''"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <template v-if="showDropdown || keepAlive">
            <div v-show="showDropdown" class="inline-block">
              <slot
                name="dropdown"
                :show-dropdown="showDropdown"
                :close="close"
                :open="open"
                :toggle="toggle"
              ></slot>
            </div>
          </template>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { useClickOutside } from '@/composables/clickOutside';
import { MaybeElement, MaybeRef, useResizeObserver } from '@vueuse/core';
import { throttle } from 'lodash';
import { PropType, StyleValue } from 'vue';
import { disableScroll, enableScroll } from '../utils';

const button = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

const showDropdown = ref(false);
const props = defineProps({
  placement: {
    type: String as PropType<
      'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    >,
    default() {
      return 'bottom-start';
    },
  },
  padding: {
    default: 8,
    type: Number,
  },
  animated: {
    default: false,
    type: Boolean,
  },
  keepAlive: {
    default: true,
    type: Boolean,
  },
});

const emit = defineEmits(['close', 'open']);

const buttonX = ref(0);
const buttonY = ref(0);
const buttonWidth = ref(0);
const buttonHeight = ref(0);

const dropdownX = ref(0);
const dropdownY = ref(0);
const dropdownWidth = ref(0);
const dropdownHeight = ref(0);

function setBoundingBoxes() {
  if (button.value) {
    const { y, x, height, width } = button.value.getBoundingClientRect();
    buttonX.value = x;
    buttonY.value = y;
    buttonWidth.value = width;
    buttonHeight.value = height;
  }

  if (dropdown.value) {
    const { y, x, height, width } = dropdown.value.getBoundingClientRect();
    dropdownX.value = x;
    dropdownY.value = y;
    dropdownWidth.value = width;
    dropdownHeight.value = height;
  }
}

function toggle() {
  if (showDropdown.value) {
    close();
  } else {
    open();
  }
}

function open() {
  activate();
  showDropdown.value = true;
  nextTick(() => {
    setBoundingBoxes();
    disableScroll();
    emit('open');
  });
}

function close() {
  deactivate();
  showDropdown.value = false;
  enableScroll();
  emit('close');
}

function onKeydown(event: KeyboardEvent) {
  if (event.code == 'Escape') {
    if (showDropdown.value) {
      close();
    }
  }
}

const setBoundingBoxesDebounced = throttle(() => {
  setBoundingBoxes();
}, 10);

let buttonResizeObserver = null as any;
let dropdownResizeObserver = null as any;

function activate() {
  buttonResizeObserver = useResizeObserver(button, setBoundingBoxesDebounced);
  dropdownResizeObserver = useResizeObserver(
    dropdown,
    setBoundingBoxesDebounced
  );
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('resize', setBoundingBoxesDebounced);
  window.addEventListener('scroll', setBoundingBoxesDebounced, true);
}

function deactivate() {
  buttonResizeObserver?.stop();
  dropdownResizeObserver?.stop();
  window.removeEventListener('resize', setBoundingBoxesDebounced);
  window.removeEventListener('scroll', setBoundingBoxesDebounced, true);
  window.removeEventListener('keydown', onKeydown);
}

useClickOutside(
  dropdown,
  () => {
    if (showDropdown.value) {
      close();
    }
  },
  { includes: () => [button] }
);

const placementInternal = computed(() => {
  // vertical
  const spaceTop = buttonY.value - props.padding;
  const spaceBottom =
    window.innerHeight - buttonY.value - buttonHeight.value - props.padding;

  const tooTallForTop = spaceTop < dropdownHeight.value;
  const tooTallForBottom = spaceBottom < dropdownHeight.value;

  let verticalPreference = props.placement.split('-')[0];

  if (tooTallForTop && !tooTallForBottom) {
    verticalPreference = 'bottom';
  } else if (!tooTallForTop && tooTallForBottom) {
    verticalPreference = 'top';
  } else if (tooTallForTop && tooTallForBottom) {
    if (spaceTop > spaceBottom) {
      verticalPreference = 'top';
    } else {
      verticalPreference = 'bottom';
    }
  }

  // horizontal
  const spaceStart = buttonX.value + buttonWidth.value;
  const spaceEnd = window.innerWidth - buttonX.value;

  const tooLargeForStart = spaceStart < dropdownWidth.value;
  const tooLargeForEnd = spaceEnd < dropdownWidth.value;

  let horizontalPreference = props.placement.split('-')[1];

  if (tooLargeForStart && !tooLargeForEnd) {
    horizontalPreference = 'start';
  } else if (!tooLargeForStart && tooLargeForEnd) {
    horizontalPreference = 'end';
  } else if (tooLargeForStart && tooLargeForEnd) {
    if (spaceStart > spaceEnd) {
      horizontalPreference = 'end';
    } else {
      horizontalPreference = 'start';
    }
  }

  return `${verticalPreference}-${horizontalPreference}`;
});

const dropdownStyles = computed((): StyleValue => {
  let top = buttonY.value;

  if (
    placementInternal.value == 'bottom-start' ||
    placementInternal.value == 'bottom-end'
  ) {
    top += buttonHeight.value;
    top += props.padding;
  }

  if (
    placementInternal.value == 'top-start' ||
    placementInternal.value == 'top-end'
  ) {
    top -= dropdownHeight.value;
    top -= props.padding;
  }

  const styles = {
    position: 'fixed',
    top: `${top}px`,
  } as any;

  if (
    placementInternal.value == 'bottom-end' ||
    placementInternal.value == 'top-end'
  ) {
    styles.left = `${
      buttonX.value + buttonWidth.value - dropdownWidth.value
    }px`;
  } else {
    styles.left = `${buttonX.value}px`;
  }

  return styles as StyleValue;
});

const addClickOutsideInclude = inject('clickOutside:addInclude', () => {
  return;
}) as (include: MaybeRef<MaybeElement> | string) => void;

addClickOutsideInclude(dropdown);

onBeforeUnmount(() => {
  close();
  deactivate();
});

defineExpose({
  open,
  close,
  toggle,
});
</script>
