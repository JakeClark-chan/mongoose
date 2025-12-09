<template>
  <div
    class="flex w-full items-start rounded-md p-4"
    :class="[backgroundClass, borderClass]"
  >
    <div v-if="showIcon" class="mr-3">
      <BaseIcon
        v-if="color == 'warning'"
        icon="heroicons-solid:exclamation"
        :class="iconClass"
      />
      <BaseIcon
        v-else-if="color == 'danger'"
        icon="heroicons-solid:exclamation-circle"
        :class="iconClass"
      />
      <BaseIcon
        v-else-if="color == 'success'"
        icon="heroicons-solid:check-circle"
        :class="iconClass"
      />
      <BaseIcon
        v-else-if="color == 'info'"
        icon="heroicons-solid:information-circle"
        :class="iconClass"
      />
    </div>

    <div>
      <h3
        v-if="title"
        class="mb-1 font-medium leading-tight"
        :class="[titleClass]"
      >
        {{ title }}
      </h3>

      <div v-if="$slots.default" :class="[textClass, 'text-sm leading-tight']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    title: {
      required: false,
      default: '',
      type: String,
    },
    color: {
      default: 'success',
      type: String as PropType<'info' | 'success' | 'danger' | 'warning'>,
    },
    showIcon: {
      default: true,
      type: Boolean,
    },
    bordered: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    backgroundClass(): string {
      if (this.color == 'info') {
        return 'bg-blue-50';
      }
      if (this.color == 'success') {
        return 'bg-green-50';
      }
      if (this.color == 'danger') {
        return 'bg-red-50';
      }
      if (this.color == 'warning') {
        return 'bg-yellow-50';
      }
      return 'bg-slate-900';
    },
    borderClass(): string {
      if (!this.bordered) {
        return '';
      }
      if (this.color == 'info') {
        return 'border border-blue-400';
      }
      if (this.color == 'success') {
        return 'border border-green-400';
      }
      if (this.color == 'danger') {
        return 'border border-red-400';
      }
      if (this.color == 'warning') {
        return 'border border-yellow-400';
      }
      return 'borer border-slate-900';
    },
    titleClass(): string {
      if (this.color == 'info') {
        return 'text-blue-800';
      }
      if (this.color == 'success') {
        return 'text-green-800';
      }
      if (this.color == 'warning') {
        return 'text-yellow-800';
      }
      if (this.color == 'danger') {
        return 'text-red-800';
      }
      return 'text-white';
    },
    textClass(): string {
      if (this.color == 'info') {
        return 'text-blue-700';
      }
      if (this.color == 'success') {
        return 'text-green-700';
      }
      if (this.color == 'warning') {
        return 'text-yellow-700';
      }
      if (this.color == 'danger') {
        return 'text-red-700';
      }
      return 'text-white';
    },
    iconClass(): string {
      return this.icon + ' w-5 h-5';
    },
    icon(): string {
      if (this.color == 'info') {
        return 'text-blue-400';
      }
      if (this.color == 'success') {
        return 'text-green-500';
      }
      if (this.color == 'warning') {
        return 'text-yellow-500';
      }
      if (this.color == 'danger') {
        return 'text-red-500';
      }
      return 'text-white';
    },
  },
});
</script>
