<template>
  <Teleport to="body">
    <transition
      name="modal"
      enter-active-class="duration-300"
      leave-active-class="duration-200"
    >
      <div v-show="modelValue">
        <div
          data-scroll-lock-scrollable
          class="fixed inset-0 z-modal w-full overflow-y-auto overflow-x-hidden"
        >
          <div class="flex min-h-full w-full pt-20 sm:pt-0">
            <div class="min-h-full grow">
              <transition
                appear
                enter-active-class="duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-show="modelValue"
                  :class="backdropClass"
                  class="fixed inset-0 transition-opacity"
                  @click="
                    closeOnOutsideClick
                      ? modal.close()
                      : modal.refuseAnimation()
                  "
                />
              </transition>

              <transition
                appear
                enter-active-class="duration-300 ease-out"
                enter-from-class="translate-x-20 opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-from-class="translate-x-0 opacity-100"
                leave-to-class="translate-x-20 opacity-0"
              >
                <div
                  v-show="modelValue"
                  :style="{
                    maxWidth: realMaxWidth,
                  }"
                  class="pb-safe py-safe relative z-[1] ml-auto mr-0 flex h-full w-full flex-col rounded-t-lg bg-white text-left shadow-xl sm:rounded-t-none"
                  :class="[modal.animationClasses.value]"
                >
                  <button
                    class="absolute -top-[4.5rem] right-2 flex h-16 w-16 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-20 sm:-left-[4.5rem] sm:top-2"
                    type="button"
                    @click="modal.close()"
                  >
                    <BaseIcon
                      class="h-8 w-8 text-white"
                      icon="heroicons:x-mark"
                    />
                  </button>
                  <slot :close="modal.close" />
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useModal } from '@/composables/modal';
import { useBreakpoints } from '@/composables/breakpoints';

const props = defineProps({
  modelValue: {
    default: false,
    type: Boolean,
  },
  maxWidth: {
    default: '32rem',
    type: String,
  },
  backdropClass: {
    default: 'bg-opacity-70 bg-slate-900',
    type: String,
  },
  closeOnOutsideClick: {
    default: true,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const breakpoints = useBreakpoints();

const realMaxWidth = computed((): string => {
  return breakpoints.greater('sm').value ? props.maxWidth : '100%';
});

const modal = useModal(
  computed(() => props.modelValue),
  emit
);
</script>
