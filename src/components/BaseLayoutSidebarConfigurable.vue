<template>
  <BaseLayoutSidebar :app-name="appName" :logo-url="logoUrl" :dark="dark">
    <template #menu>
      <div class="px-3 py-6">
        <div class="space-y-8">
          <div v-for="section in actionSections" :key="section.title">
            <h2
              v-if="section.title"
              class="mb-3 pl-3 text-xs font-semibold uppercase tracking-widest"
              :class="dark ? 'text-slate-400' : 'text-slate-500'"
            >
              {{ section.title }}
            </h2>
            <div>
              <div class="space-y-1">
                <BaseNavbarSideItem
                  v-for="item in section.actions"
                  :key="item.label"
                  :item="item"
                  :dark="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #navbar>
      <div class="flex flex-1 justify-between px-4">
        <div class="flex flex-1">
          <!-- Good spot for search bar... -->
        </div>

        <div class="ml-4 flex items-center md:ml-6">
          <!-- Notification dropdown -->
          <BaseLayoutNotificationDropdown
            v-if="notifications"
            :notifications-config="notifications"
            class="mr-1 sm:mr-2"
            @click="onNotificationClick"
            @open="onNotificationOpen"
          ></BaseLayoutNotificationDropdown>

          <!-- Profile dropdown -->
          <div class="relative ml-3 mr-3">
            <BaseMenu :items="userMenu">
              <template #button="{ open }">
                <div class="flex" :class="[open ? '' : '']">
                  <BaseAvatar :user="user" show-details />
                </div>
              </template>
            </BaseMenu>
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <slot />
    </template>
  </BaseLayoutSidebar>
</template>

<script setup lang="ts">
import { User } from '@/types/User';
import { PropType } from 'vue';
import { ActionItem, ActionSection, NotificationsConfig } from '../types';
import BaseAvatar from './BaseAvatar.vue';
import BaseLayoutNotificationDropdown from './BaseLayoutNotificationDropdown.vue';
import BaseLayoutSidebar from './BaseLayoutSidebar.vue';
import BaseMenu from './BaseMenu.vue';
import BaseNavbarSideItem from './BaseNavbarSideItem.vue';

const emit = defineEmits(['notification:click', 'notification:open']);

const props = defineProps({
  appName: {
    default: '',
    type: String,
  },
  logoUrl: {
    default: 'https://sprintify.witify.io/img/logo/logo-side-dark.svg',
    type: String,
  },
  menu: {
    required: true,
    type: Array as PropType<ActionItem[] | ActionSection[]>,
  },
  userMenu: {
    required: true,
    type: Array as PropType<ActionItem[]>,
  },
  user: {
    required: true,
    type: Object as PropType<User>,
  },
  notifications: {
    default: undefined,
    type: Object as PropType<NotificationsConfig>,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

const actionSections = computed((): ActionSection[] => {
  const isActionSections = props.menu.length > 0 && 'actions' in props.menu[0];

  if (isActionSections) {
    return props.menu as ActionSection[];
  }

  return [
    {
      title: '',
      actions: props.menu as ActionItem[],
    },
  ];
});

function onNotificationClick(notification: Notification) {
  emit('notification:click', notification);
}

function onNotificationOpen() {
  emit('notification:open');
}
</script>
