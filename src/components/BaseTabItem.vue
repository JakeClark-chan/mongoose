<template>
  <li role="presentation">
    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      :to="to"
      custom
    >
      <a
        :href="href"
        class="group relative inline-block rounded-t-lg px-2 py-3 font-medium"
        :class="[
          (activeStrategy == 'default' ? isActive : isExactActive)
            ? 'text-primary-600'
            : 'text-slate-600 hover:text-slate-900',
          disabled ? 'cursor-not-allowed opacity-60' : '',
        ]"
        @click="navigate"
      >
        <div
          class="absolute left-0 bottom-0 w-full"
          :class="[
            (activeStrategy == 'default' ? isActive : isExactActive)
              ? 'h-[2px] bg-primary-600'
              : 'group-hover:h-px group-hover:bg-slate-700',
          ]"
        ></div>
        <div class="whitespace-nowrap">
          <slot />
        </div>
      </a>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

defineProps({
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
</script>
