<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="showMobileMenu">
      <Dialog
        as="div"
        class="relative z-40 xl:hidden"
        @close="showMobileMenu = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col pt-5 pb-4"
              :class="[dark ? 'bg-slate-800' : 'bg-white']"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full"
                    @click="showMobileMenu = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <BaseIcon
                      icon="heroicons:x-mark"
                      class="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <img class="block h-8 w-auto" :src="logoUrl" :alt="appName" />
              </div>
              <div
                data-scroll-lock-scrollable
                class="mt-5 h-0 flex-1 overflow-y-auto"
              >
                <nav>
                  <slot name="menu" />
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="flex min-h-full flex-col xl:pl-64">
      <div class="sticky top-0 left-0 z-10 shrink-0 shadow">
        <BaseSystemAlert
          v-for="systemAlert in systemAlerts"
          :key="systemAlert.id"
          :color="systemAlert.color"
          :to="systemAlert.to"
          :action="systemAlert.action"
          :closable="systemAlert.closable"
          @close="systemAlertStore.remove(systemAlert)"
        >
          {{ systemAlert.message }}
        </BaseSystemAlert>

        <div class="flex h-16 bg-white">
          <button
            type="button"
            class="border-r border-slate-200 px-4 text-slate-500 xl:hidden"
            @click="showMobileMenu = true"
          >
            <span class="sr-only">Open sidebar</span>
            <BaseIcon
              icon="heroicons:bars-3-bottom-left"
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>

          <!-- Navbar -->
          <div class="flex flex-1">
            <slot name="navbar" />
          </div>
        </div>
      </div>

      <!-- Position: relative to contain Loading Covers -->
      <main class="relative min-h-full flex-1">
        <slot />
      </main>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="z-10 hidden xl:fixed xl:inset-y-0 xl:flex xl:w-64 xl:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        data-scroll-lock-scrollable
        class="flex min-h-0 flex-1 flex-col overflow-y-auto"
        :class="[dark ? 'bg-slate-800' : 'bg-white shadow']"
      >
        <div
          class="flex h-16 flex-shrink-0 items-center px-4"
          :class="[dark ? 'bg-slate-900' : 'bg-white']"
        >
          <img class="block h-8 w-auto" :src="logoUrl" :alt="appName" />
        </div>
        <div class="flex flex-1">
          <nav class="flex-1">
            <slot name="menu" />
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import { useSystemAlertStore } from '../stores/systemAlerts';
import { BaseIcon } from '.';
import BaseSystemAlert from './BaseSystemAlert.vue';

const props = defineProps({
  appName: {
    default: '',
    type: String,
  },
  logoUrl: {
    default: 'https://sprintify.witify.io/img/logo/logo-side-dark.svg',
    type: String,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

/**
 * System Alert And Navigation size
 */

const systemAlertStore = useSystemAlertStore();

const systemAlerts = computed(() => {
  return systemAlertStore.systemAlerts;
});

/**
 * Show/Hide sidebar
 */

const showMobileMenu = ref(false);

function toggleMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function openMenu() {
  showMobileMenu.value = true;
}

function closeMenu() {
  showMobileMenu.value = false;
}

provide('toggleMenu', toggleMenu);
provide('openMenu', openMenu);
provide('closeMenu', closeMenu);
</script>
