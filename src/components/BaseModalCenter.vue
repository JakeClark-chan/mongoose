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
          <div
            class="flex min-h-full w-full items-end justify-center overflow-hidden sm:px-6 sm:pb-6"
            :class="[
              showCloseButton ? 'pt-20' : 'pt-6',
              {
                'sm:items-center': verticalAlign == 'center',
                'sm:items-start': verticalAlign == 'top',
              },
            ]"
          >
            <div class="pt-safe grow">
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
                  v-if="modelValue"
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
                enter-from-class="translate-y-20 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-20 opacity-0"
              >
                <div
                  v-if="modelValue"
                  class="pb-safe relative z-[1] mx-auto block w-full rounded-t-xl bg-white sm:rounded-xl sm:shadow-xl"
                  :style="{
                    maxWidth: maxWidth,
                  }"
                  :class="[modal.animationClasses.value]"
                >
                  <slot :close="modal.close" />
                </div>
              </transition>
            </div>
          </div>

          <button
            v-if="showCloseButton"
            class="right fixed top-2 right-2 flex h-16 w-16 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-20"
            type="button"
            @click="modal.close()"
          >
            <BaseIcon class="h-8 w-8 text-white" icon="heroicons:x-mark" />
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useModal } from '@/composables/modal';

const props = defineProps({
  modelValue: {
    default: false,
    type: Boolean,
  },
  verticalAlign: {
    default: 'center',
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
  maxWidth: {
    default: '512px',
    type: String,
  },
  showCloseButton: {
    default: true,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const modal = useModal(
  computed(() => props.modelValue),
  emit as any
);
</script>
