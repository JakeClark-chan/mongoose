import { disableScroll, enableScroll } from '../utils';
import { Ref } from 'vue';

export function useModal(modelValue: Ref<boolean>, emit: any) {
  const mounted = ref(false);

  watch(
    () => modelValue.value,
    () => {
      init();
    },
    { immediate: true }
  );

  onMounted(() => {
    mounted.value = true;
    init();
  });

  onBeforeUnmount(() => {
    deactivate();
  });

  function init() {
    if (!mounted.value) {
      return;
    }

    if (modelValue.value) {
      activate();
    } else {
      deactivate();
    }
  }

  function activate() {
    disableScroll();
    window.addEventListener('keydown', onKeydown);
  }

  function deactivate() {
    enableScroll();
    window.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.code == 'Escape') {
      if (modelValue) {
        close();
      }
    }
  }

  const animationClasses = ref('');

  function refuseAnimation() {
    animationClasses.value = '';
    setTimeout(() => {
      animationClasses.value = 'animate-shake';
    });
  }

  function close() {
    animationClasses.value = '';
    emit('update:modelValue', false);
  }

  return {
    close,
    refuseAnimation,
    animationClasses,
  };
}
