<template>
  <Transition
    :enter-active-class="'transition ease-out ' + duration"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    :leave-active-class="'transition ease-in ' + duration"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showSpinner"
      class="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      <div class="absolute h-full w-full" :class="backdropClass" />

      <BaseSpinnerSmall v-if="size == 'sm'" :class="iconClass" />
      <BaseSpinnerLarge v-else-if="size == 'lg'" :class="iconClass" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import BaseSpinnerSmall from '../svg/BaseSpinnerSmall.vue';
import BaseSpinnerLarge from '../svg/BaseSpinnerLarge.vue';

const props = defineProps({
  /**
   * Show/Hide the loading cover
   */
  modelValue: {
    default: true,
    type: Boolean,
  },
  /**
   * Classes added to the backdrop
   */
  backdropClass: {
    default: 'bg-white',
    type: String,
  },
  /**
   * Classes added to the spinner icon
   */
  iconClass: {
    default: 'text-blue-500 w-10 h-10',
    type: String,
  },
  /**
   * Change the type of spinner. 'sm' for a small spinner. 'lg' for a large spinner.
   */
  size: {
    default: 'sm',
    type: String as PropType<'sm' | 'lg'>,
  },
  /**
   * Transition duration class.
   */
  duration: {
    default: 'duration-300',
    type: String,
  },
  /**
   * Delay before showing the loading cover. This delay is used to avoid unnecessary showing the spinner for a fraction of second when the loading time is too short.
   */
  delay: {
    default: 0,
    type: Number,
  },
});

let timeoutId = null as number | null;

const showSpinner = ref(false);

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    if (newValue) {
      timeoutId = setTimeout(() => {
        showSpinner.value = true;
      }, props.delay);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      showSpinner.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>
