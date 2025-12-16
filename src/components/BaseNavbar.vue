<template>
  <nav
    class="border-t-[3px] border-primary-500"
    :class="[dark ? 'bg-slate-900' : 'bg-white']"
  >
    <BaseContainer :size="size">
      <div class="flex h-16 justify-between">
        <!-- Navbar (desktop and mobile) -->
        <div class="grow">
          <slot name="navbar" />
        </div>

        <!-- Mobile Burger menu button -->
        <div class="-mr-2 flex items-center md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="[
              dark
                ? 'text-slate-200 hover:bg-slate-800 hover:text-white focus:ring-slate-700  focus:ring-offset-slate-900'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300  focus:ring-offset-white',
            ]"
            @click="toggleMenu()"
          >
            <span class="sr-only">Open main menu</span>
            <BaseIcon
              v-if="!showMobileMenu"
              icon="heroicons:bars-3"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <BaseIcon
              v-else
              icon="heroicons:x-mark"
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </BaseContainer>

    <!-- Mobile -->
    <div
      v-if="showMobileMenu"
      class="absolute w-full md:hidden"
      :class="[dark ? 'bg-slate-900' : 'bg-white']"
    >
      <slot
        name="mobile"
        :toggle-menu="toggleMenu"
        :close-menu="closeMenu"
        :open-menu="openMenu"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon as BaseIcon } from '@iconify/vue';
import BaseContainer from './BaseContainer.vue';

defineProps({
  size: {
    default: '7xl',
    type: String,
  },
  dark: {
    default: false,
    type: Boolean,
  },
});

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
