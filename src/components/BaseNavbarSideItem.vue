<template>
  <div>
    <BaseActionItem
      :item="item"
      :dark="dark"
      item-class="flex w-full"
      @click="onClick"
    >
      <template #default="{ active }">
        <BaseNavbarSideItemContent
          :label="item.label"
          :icon="item.icon"
          :active="active"
          :count="item.count"
          :dark="dark"
        />
      </template>
    </BaseActionItem>

    <div
      v-if="showSubActions && item.actions && item.actions.length"
      class="ml-10 mt-1.5 mb-3"
    >
      <div v-for="subItem in item.actions" :key="subItem.label" class="mb-1">
        <BaseActionItem
          :item="subItem"
          :dark="dark"
          :item-class="[
            'flex w-full',
            dark
              ? 'text-slate-300 hover:text-white'
              : 'text-slate-900 hover:text-slate-600',
          ]"
        >
          {{ subItem.label }}
        </BaseActionItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ActionItem } from '@/types';
import BaseActionItem from './BaseActionItem.vue';
import BaseNavbarSideItemContent from './BaseNavbarSideItemContent.vue';

const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<ActionItem>,
  },
  dark: {
    default: false,
    type: Boolean,
  },
  actionsVisible: {
    default: 'toggle',
    type: String as PropType<'toggle' | 'always'>,
  },
});

const emit = defineEmits(['click']);

async function onClick() {
  emit('click');
}

const routeActive = computed((): boolean => {
  if (!props.item.to) {
    return false;
  }

  const link = useLink({ to: props.item.to });

  return link.isActive.value;
});

const showSubActions = computed((): boolean => {
  if (props.actionsVisible == 'always') {
    return true;
  }
  if (!props.item.to) {
    return true;
  }
  return routeActive.value;
});
</script>
