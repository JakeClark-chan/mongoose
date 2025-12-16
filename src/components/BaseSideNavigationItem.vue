<template>
  <router-link
    v-slot="{ href, navigate, isActive, isExactActive }"
    :to="to"
    custom
  >
    <a
      :href="disabled ? undefined : href"
      :disabled="disabled"
      class="group relative flex items-center px-3 py-1"
      :class="[
        (activeStrategy == 'default' ? isActive : isExactActive)
          ? 'font-semibold text-primary-600'
          : 'text-slate-600 hover:text-slate-900',
        disabled ? 'cursor-not-allowed opacity-60' : '',
      ]"
      @click.prevent="onClick(navigate)"
    >
      <div
        class="absolute left-0 top-0 h-full"
        :class="[
          (activeStrategy == 'default' ? isActive : isExactActive)
            ? 'w-[2px] bg-primary-600'
            : 'group-hover:w-px group-hover:bg-slate-700',
        ]"
      ></div>
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  to: {
    required: true,
    type: [Object, String] as PropType<RouteLocationRaw>,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  activeStrategy: {
    default: 'default',
    type: String as PropType<'default' | 'exact'>,
  },
});

const onClick = (navigate: () => void) => {
  if (props.disabled) {
    return;
  }

  navigate();
};
</script>
