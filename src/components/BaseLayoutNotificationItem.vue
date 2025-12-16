<template>
  <router-link
    v-if="notification.to"
    v-slot="{ href, navigate }"
    custom
    :to="notification.to"
  >
    <MenuItem
      v-slot="{ active }"
      as="a"
      :href="href"
      @click.prevent="onClick(navigate)"
    >
      <BaseLayoutNotificationItemContent
        :active="active"
        :notification="notification"
      ></BaseLayoutNotificationItemContent>
    </MenuItem>
  </router-link>
  <div v-else>
    <MenuItem
      v-slot="{ active }"
      as="button"
      class="w-full text-left"
      @click.prevent="onClick()"
    >
      <BaseLayoutNotificationItemContent
        :active="active"
        :notification="notification"
      ></BaseLayoutNotificationItemContent>
    </MenuItem>
  </div>
</template>

<script lang="ts" setup>
import { Notification } from '@/types/Notification';
import { MenuItem } from '@headlessui/vue';
import { PropType } from 'vue';
import BaseLayoutNotificationItemContent from './BaseLayoutNotificationItemContent.vue';

const emit = defineEmits(['click']);

const props = defineProps({
  notification: {
    required: true,
    type: Object as PropType<Notification>,
  },
});

function onClick(navigate: (() => void) | null) {
  emit('click', props.notification);
  if (navigate) {
    navigate();
  }
}
</script>
