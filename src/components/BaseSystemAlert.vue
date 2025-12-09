<template>
  <div class="relative">
    <component
      :is="is"
      :type="is == 'button' ? 'button' : undefined"
      :to="is == 'RouterLink' ? to : undefined"
      class="relative flex w-full items-center justify-center bg-white text-center font-medium"
      :class="[colorClasses]"
      @click="is == 'button' && action ? action() : undefined"
    >
      <div
        class="py-4 text-sm leading-tight"
        :class="[closable ? 'pr-10 pl-3' : 'px-3']"
      >
        <div class="max-w-4xl">
          <slot />
        </div>
      </div>
    </component>
    <div v-if="closable" class="absolute top-0 right-0 p-3">
      <button
        type="button"
        class="rounded-full bg-black bg-opacity-50 p-1 text-white"
        @click="close"
      >
        <BaseIcon icon="heroicons:x-mark" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  to: {
    default: undefined,
    type: [Object, String] as PropType<RouteLocationRaw | undefined>,
  },
  action: {
    default: undefined,
    type: Function as PropType<() => Promise<void> | void>,
  },
  color: {
    default: 'info',
    type: String as PropType<'info' | 'warning' | 'danger' | 'success'>,
  },
  closable: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['close']);

function close() {
  emit('close');
}

const is = computed((): string => {
  if (props.to) {
    return 'RouterLink';
  }
  if (props.action) {
    return 'button';
  }
  return 'div';
});

const colorClasses = computed((): string => {
  if (props.color == 'info') {
    return 'bg-blue-500 text-white';
  }
  if (props.color == 'success') {
    return 'bg-green-600 text-white';
  }
  if (props.color == 'danger') {
    return 'bg-red-600 text-white';
  }
  if (props.color == 'warning') {
    return 'bg-yellow-400 text-yellow-900';
  }
  return 'bg-slate-900 text-white';
});
</script>
