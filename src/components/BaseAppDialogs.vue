<template>
  <Teleport to="body">
    <Transition
      appear
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="dialogs.length"
        class="fixed inset-0 z-dialogs h-full w-full bg-black bg-opacity-60"
      />
    </Transition>

    <TransitionGroup
      appear
      enter-active-class="duration-300 ease-out"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-10 opacity-0"
      tag="div"
    >
      <div
        v-for="dialog in dialogs"
        :key="dialog.id"
        data-scroll-lock-scrollable
        class="fixed inset-0 z-dialogs transform overflow-y-auto"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="fixed inset-0 h-full w-full"
            @click="
              dialog.closeOnOutsideClick
                ? cancel(dialog)
                : refuseAnimation(dialog)
            "
          />
          <BaseDialog
            :class="animationClasses[dialog.id] ?? ''"
            :color="dialog.color"
            :title="dialog.title"
            :message="dialog.message"
            :confirm-text="dialog.confirmText"
            :cancel-text="dialog.cancelText"
            @cancel="cancel(dialog)"
            @confirm="confirm(dialog)"
          />
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script lang="ts" setup>
import { Dialog } from '@/types';
import BaseDialog from './BaseDialog.vue';
import { useDialogsStore } from '@/stores/dialogs';
import { disableScroll, enableScroll } from '@/utils/scrollPreventer';

const dialogStore = useDialogsStore();

const dialogs = computed(() => {
  return dialogStore.dialogs;
});

function confirm(dialog: Dialog) {
  dialog.onConfirm();
  remove(dialog);
}

function cancel(dialog: Dialog) {
  dialog.onCancel();
  remove(dialog);
}

function remove(dialog: Dialog) {
  dialogStore.remove(dialog);
}

const animationClasses = ref<Record<string, string>>({});

function refuseAnimation(dialog: Dialog) {
  animationClasses.value[dialog.id] = '';
  setTimeout(() => {
    animationClasses.value[dialog.id] = 'animate-shake';
  });
}

watch(
  () => dialogs.value.length,
  () => {
    if (dialogs.value.length == 0) {
      enableScroll();
    } else {
      disableScroll();
    }
  }
);

window.addEventListener('keydown', onKeydown);

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});

function onKeydown(event: KeyboardEvent) {
  if (dialogs.value.length == 0) return;

  if (event.key === 'Escape') {
    cancel(dialogs.value[dialogs.value.length - 1]);
  }
}

defineExpose({
  dialogs,
});
</script>
