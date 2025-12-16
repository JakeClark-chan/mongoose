<template>
  <div class="px-3 py-2" :class="[active ? 'bg-slate-100' : '']">
    <div
      class="text-sm leading-tight text-slate-800"
      v-html="notification.text"
    ></div>
    <BaseDisplayRelativeTime
      v-if="notification.created_at"
      v-slot="{ readableDate }"
      :value="notification.created_at"
    >
      <p class="mt-1 text-xs text-slate-400">
        {{ readableDate }}
      </p>
    </BaseDisplayRelativeTime>
  </div>
</template>

<script lang="ts" setup>
import { Notification } from '@/types/Notification';
import BaseDisplayRelativeTime from './BaseDisplayRelativeTime.vue';

defineProps<{
  active: boolean;
  notification: Notification;
}>();
</script>
