<template>
  <BaseLayoutStacked :dark="dark">
    <template #navbar>
      <div class="flex h-16 justify-between">
        <!-- Left -->

        <div class="flex justify-center">
          <!-- Logo -->
          <router-link to="/" class="flex flex-shrink-0 items-center p-2 pl-0">
            <img class="block h-8 w-auto" :src="logoUrl" :alt="appName" />
          </router-link>

          <!-- Links (desktop) -->
          <div class="ml-10 hidden space-x-4 md:flex">
            <BaseNavbarItem
              v-for="item in menu"
              :key="item.label"
              :item="item"
              :dark="dark"
            />
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center md:ml-6">
          <!-- Notification dropdown -->
          <BaseLayoutNotificationDropdown
            v-if="notifications"
            class="mr-4 md:mr-5"
            :dark="dark"
            :notifications-config="notifications"
            @click="onNotificationClick"
            @open="onNotificationOpen"
          ></BaseLayoutNotificationDropdown>

          <!-- Profile dropdown -->
          <BaseMenu menu-class="w-52" class="hidden md:block" :items="userMenu">
            <template #button="{ open }">
              <div class="flex rounded-full" :class="[open ? '' : '']">
                <BaseAvatar :class="dark ? 'text-white' : ''" :user="user" />
              </div>
            </template>
          </BaseMenu>
        </div>
      </div>
    </template>

    <template #mobile>
      <!-- Links mobile -->
      <div class="space-y-1 p-2 pt-0">
        <BaseNavbarSideItem
          v-for="item in menu"
          :key="item.label"
          :item="item"
          :dark="dark"
        />
      </div>

      <hr
        class="mb-4 mt-2"
        :class="[dark ? 'border-slate-700' : 'border-slate-200']"
      />

      <!-- Profile links -->
      <div class="p-2 pb-6">
        <BaseAvatar
          :user="user"
          show-details
          size="base"
          class="px-3"
          :class="dark ? 'text-white' : ''"
        />
        <div class="mt-4 space-y-1">
          <BaseNavbarSideItem
            v-for="item in userMenu"
            :key="item.label"
            :item="item"
            :dark="dark"
          />
        </div>
      </div>
    </template>

    <template #default>
      <slot name="default" />
    </template>
  </BaseLayoutStacked>
</template>

<script lang="ts" setup>
import { User } from '@/types/User';
import { PropType } from 'vue';
import { ActionItem, NotificationsConfig } from '../types';
import BaseAvatar from './BaseAvatar.vue';
import BaseLayoutStacked from './BaseLayoutStacked.vue';
import BaseMenu from './BaseMenu.vue';
import BaseNavbarItem from './BaseNavbarItem.vue';
import BaseNavbarSideItem from './BaseNavbarSideItem.vue';
import BaseLayoutNotificationDropdown from './BaseLayoutNotificationDropdown.vue';

const emit = defineEmits(['notification:click', 'notification:open']);

defineProps({
  appName: {
    default: '',
    type: String,
  },
  logoUrl: {
    default: 'https://sprintify.witify.io/img/logo/logo-side.svg',
    type: String,
  },
  menu: {
    required: true,
    type: Array as PropType<ActionItem[]>,
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

function onNotificationClick(notification: Notification) {
  emit('notification:click', notification);
}

function onNotificationOpen() {
  emit('notification:open');
}
</script>
