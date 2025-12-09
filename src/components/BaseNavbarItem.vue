<template>
  <div class="flex">
    <BaseActionItem
      :item="item"
      :dark="dark"
      item-class="flex w-full"
      @click="onClick"
    >
      <template #default="{ active }">
        <BaseNavbarItemContent
          :label="item.label"
          :icon="item.icon"
          :active="active"
          :count="item.count"
          :dark="dark"
        />
      </template>
    </BaseActionItem>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ActionItem } from '@/types';
import BaseActionItem from './BaseActionItem.vue';
import BaseNavbarItemContent from './BaseNavbarItemContent.vue';

defineProps({
  item: {
    required: true,
    type: Object as PropType<ActionItem>,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

const closeMenu = inject('closeMenu') as () => void;

const emit = defineEmits(['click']);

async function onClick() {
  emit('click');
  closeMenu();
}
</script>
