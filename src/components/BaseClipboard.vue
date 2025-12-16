<template>
  <button
    type="button"
    class="relative inline-flex items-center"
    @click="copyText()"
    @mouseenter="showTooltip()"
    @mouseleave="hideTooltip()"
  >
    <slot></slot>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-90 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-90 opacity-0"
    >
      <div
        v-show="tooltipShown"
        class="pointer-events-none absolute left-full z-[1] items-center"
      >
        <div
          class="ml-2 whitespace-nowrap rounded bg-slate-900 bg-opacity-80 px-3 py-2 text-xs leading-tight text-white backdrop-blur"
        >
          <div v-if="showCopied" class="flex items-center">
            <BaseIcon
              class="mr-1 text-green-500"
              icon="heroicons:check-circle-solid"
            />
            {{ $t('sui.copied') }}
          </div>
          <div v-else>
            {{ $t('sui.click_to_copy') }}
          </div>
        </div>
      </div>
    </transition>
  </button>
</template>

<script lang="ts" setup>
const tooltipShown = ref(false);
const showCopied = ref(false);

const props = defineProps({
  value: {
    default: null,
    type: String,
  },
});

async function writeText(text: string) {
  if (
    typeof navigator === 'undefined' ||
    !navigator.clipboard ||
    !navigator.clipboard.writeText
  ) {
    throw new Error('Clipboard API not available in this browser');
  }

  await navigator.clipboard.writeText(text);
}

let timeoutId = null as null | number;

function showTooltip() {
  tooltipShown.value = true;
}

function hideTooltip() {
  tooltipShown.value = false;
  setTimeout(() => {
    showCopied.value = false;
  }, 200);
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

function copyText() {
  writeText(props.value);
  showSuccessMessage();
}

function showSuccessMessage() {
  showCopied.value = true;
  timeoutId = setTimeout(() => {
    tooltipShown.value = false;
    setTimeout(() => {
      showCopied.value = false;
    }, 200);
  }, 1600);
}
</script>
