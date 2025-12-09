<template>
  <BaseMenu
    class="inline-block"
    :position="mobile ? 'custom' : 'bottom-left'"
    :menu-class="['sm:w-[320px] w-[280px]', mobile ? 'right-4' : '']"
  >
    <template #button="{ open }">
      <div
        class="relative flex items-center rounded-full p-1.5"
        :class="[open ? '' : '']"
        @click="onOpen"
      >
        <BaseIcon
          icon="heroicons:bell"
          class="h-6 w-6"
          :class="[dark ? 'text-slate-300' : 'text-slate-600']"
        ></BaseIcon>
        <BaseCounter
          v-if="notificationsConfig.items.length"
          class="absolute top-0 right-0"
          :count="notificationsConfig.items.length"
        ></BaseCounter>
      </div>
    </template>

    <template #items>
      <template
        v-for="notification in notificationsConfig.items"
        :key="notification.id + 'link'"
      >
        <BaseLayoutNotificationItem
          :notification="notification"
          @click="onClick"
        ></BaseLayoutNotificationItem>
      </template>
      <div
        v-if="notificationsConfig.items.length == 0"
        class="flex items-center justify-center p-6"
      >
        <div class="">
          <BaseIcon
            icon="heroicons:inbox-stack"
            class="mx-auto mb-2 h-8 w-8 text-slate-400"
          ></BaseIcon>
          <p class="text-center text-sm text-slate-700">
            {{ $t('sui.notifications_empty') }}
          </p>
        </div>
      </div>

      <div
        v-if="notificationsConfig.footerTo"
        class="mt-1 border-t border-slate-200 pt-1"
      >
        <RouterLink
          v-slot="{ href, navigate }"
          custom
          :to="notificationsConfig.footerTo"
        >
          <MenuItem as="a" :href="href" @click="navigate">
            <div
              class="hover block px-3 py-2 text-center text-sm font-medium text-primary-600 hover:bg-slate-100"
            >
              {{
                notificationsConfig.footerLabel
                  ? notificationsConfig.footerLabel
                  : $t('sui.see_all_notifications')
              }}
            </div>
          </MenuItem>
        </RouterLink>
      </div>
    </template>
  </BaseMenu>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BaseIcon } from '.';
import BaseCounter from './BaseCounter.vue';
import BaseLayoutNotificationItem from './BaseLayoutNotificationItem.vue';
import BaseMenu from './BaseMenu.vue';
import { useBreakpoints } from '@/composables/breakpoints';
import { NotificationsConfig } from '../types';
import { MenuItem } from '@headlessui/vue';
import { Notification } from '@/types/Notification';

const emit = defineEmits(['click', 'open']);

defineProps({
  notificationsConfig: {
    required: true,
    type: Object as PropType<NotificationsConfig>,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

const breakpoints = useBreakpoints();

const mobile = computed((): boolean => {
  return breakpoints.smaller('sm').value;
});

function onClick(notification: Notification) {
  emit('click', notification);
}

function onOpen() {
  emit('open');
}
</script>
