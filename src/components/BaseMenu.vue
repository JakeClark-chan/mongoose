<template>
  <Menu
    v-slot="{ open }"
    as="div"
    class="text-left"
    :class="[position == 'custom' ? 'static' : 'relative']"
  >
    <div>
      <MenuButton class="flex">
        <slot name="button" :open="open" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        :class="[menuClass, menuPositionClass]"
        class="absolute z-menu mt-2 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none"
      >
        <slot name="items" :items="items">
          <template v-for="item in items" :key="item.label + 'link'">
            <div v-if="item.line" class="my-1 -mx-1 flex h-px bg-slate-200" />

            <router-link
              v-else-if="item.to"
              v-slot="{ href, navigate }"
              custom
              :to="item.to"
            >
              <MenuItem
                v-slot="{ active }"
                as="a"
                :href="href"
                @click="navigate"
              >
                <slot name="item" :item="item">
                  <BaseMenuItem
                    :label="item.label"
                    :count="item.count"
                    :icon="item.icon"
                    :color="item.color"
                    :active="active"
                  />
                </slot>
              </MenuItem>
            </router-link>

            <MenuItem
              v-else-if="item.href"
              v-slot="{ active }"
              as="a"
              :href="item.href"
            >
              <slot name="item" :item="item">
                <BaseMenuItem
                  :label="item.label"
                  :count="item.count"
                  :icon="item.icon"
                  :color="item.color"
                  :active="active"
                />
              </slot>
            </MenuItem>

            <MenuItem
              v-else-if="item.action"
              v-slot="{ active }"
              as="button"
              type="button"
              class="w-full"
              @click="item.action"
            >
              <slot name="item" :item="item" :active="active">
                <BaseMenuItem
                  :label="item.label"
                  :count="item.count"
                  :icon="item.icon"
                  :color="item.color"
                  :active="active"
                />
              </slot>
            </MenuItem>
          </template>
        </slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MenuItemInterface } from '@/types';
import BaseMenuItem from './BaseMenuItem.vue';

const props = defineProps({
  items: {
    default: undefined,
    type: Array as PropType<MenuItemInterface[]>,
  },
  menuClass: {
    default: 'w-48',
    type: [String, Array, Object],
  },
  position: {
    default: 'bottom-left',
    type: String as PropType<'bottom-left' | 'bottom-right' | 'custom'>,
  },
});

const menuPositionClass = computed(() => {
  if (props.position == 'custom') {
    return '';
  }
  if (props.position == 'bottom-left') {
    return 'origin-top-right right-0';
  }
  if (props.position == 'bottom-right') {
    return 'origin-top-left left-0';
  }
});
</script>
