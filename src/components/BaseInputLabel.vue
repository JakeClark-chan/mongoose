<template>
  <label :class="classes">
    <div
      class="relative"
      :class="[help ? 'cursor-help' : 'cursor-default']"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <span> {{ label }}</span>

      <BaseIcon
        v-if="help"
        class="relative bottom-px ml-1 inline h-4 w-4 text-slate-400"
        icon="heroicons:question-mark-circle-20-solid"
      />

      <span v-if="required" class="ml-0.5 text-red-600"> *</span>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="showTooltip && help"
          class="pointer-events-none absolute bottom-[100%] left-0 z-[1] w-auto max-w-[300px]"
        >
          <div
            class="relative bottom-1 rounded-md bg-slate-700 py-1 px-2 text-xs leading-tight text-white"
          >
            {{ help }}
          </div>
        </div>
      </Transition>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BaseIcon } from '.';

export default defineComponent({
  components: { BaseIcon },
  props: {
    required: {
      default: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    classes: {
      default: 'mb-1 block text-sm',
      type: String,
    },
    help: {
      default: null,
      type: [String, null] as PropType<string | null>,
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
});
</script>
