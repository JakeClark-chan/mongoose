<template>
  <RouterLink
    v-if="item.to"
    v-slot="{ isActive, href: slotHref, navigate }"
    custom
    :to="item.to"
  >
    <a
      :active="isActive"
      :href="slotHref"
      :class="itemClass"
      :aria-current="isActive ? 'page' : undefined"
      @click.prevent="onClick(navigate)"
    >
      <slot :active="isActive"> </slot>
    </a>
  </RouterLink>
  <button
    v-else-if="item.action"
    type="button"
    :class="itemClass"
    @click="onClick(item.action)"
  >
    <slot :active="false"> </slot>
  </button>
  <a
    v-else-if="item.href"
    :href="item.href"
    :class="itemClass"
    @click="onClick()"
  >
    <slot :active="false"> </slot>
  </a>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ActionItem } from '@/types';

defineProps({
  item: {
    required: true,
    type: Object as PropType<ActionItem>,
  },
  dark: {
    default: false,
    type: Boolean,
  },
  itemClass: {
    default: '',
    type: [String, Array, Object],
  },
});

const closeMenu = inject('closeMenu') as () => void;

const emit = defineEmits(['click']);

type asyncFunc = () => Promise<void>;

async function onClick(func: asyncFunc | null = null) {
  if (func) {
    await func();
  }
  emit('click');
  closeMenu();
}
</script>
