import BaseNavbar from './BaseNavbar.vue';
import BaseNavbarItem from './BaseNavbarItem.vue';
import BaseNavbarSideItem from './BaseNavbarSideItem.vue';
import BaseAvatar from './BaseAvatar.vue';
import BaseMenu from './BaseMenu.vue';
import { Icon as BaseIcon } from '@iconify/vue';

export default {
  title: 'Layout/BaseNavbar',
  component: BaseNavbar,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => ({
  components: {
    BaseNavbar,
    BaseNavbarItem,
    BaseNavbarSideItem,
    BaseIcon,
    BaseAvatar,
    BaseMenu,
  },
  setup() {
    const user = {
      email: 'jane@witify.io',
      first_name: 'Jane',
      last_name: 'Doe',
      full_name: 'Jane Doe',
      avatar_url:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330??auto=format&fit=crop&w=200&h=200&q=80&g=face',
    };

    const menu = [
      {
        label: 'Home',
        to: '/',
      },
      {
        label: 'Products',
        to: '/setup',
        count: 234,
      },
      {
        label: 'Settings',
        to: '/settings',
      },
    ];

    const userMenu = [
      {
        label: 'Home',
        icon: 'heroicons:home',
        href: 'https://google.com',
      },
      {
        line: true,
      },
      {
        label: 'Logout',
        icon: 'heroicons:arrow-right-on-rectangle',
        href: 'https://google.com',
      },
    ];

    return { args, menu, userMenu, user };
  },
  template: `
    <div class="sticky top-0 left-0 w-full shadow">
      <BaseNavbar v-bind="args">
        <template #navbar>
          <div class="flex h-16 justify-between">
            <!-- Left -->

            <div class="flex justify-center">
              <!-- Logo -->
              <router-link to="/" class="flex flex-shrink-0 grow items-center p-2 pl-0">
                <img
                  class="block h-8 w-auto"
                  src="https://sprintify.witify.io/img/logo/logo-side.svg"
                  alt="Sprintify"
                />
              </router-link>

              <!-- Links (desktop) -->
              <div class="ml-10 hidden space-x-4 md:flex">
                <BaseNavbarItem
                  v-for="item in menu"
                  :key="item.label"
                  :item="item"
                  item-class="flex"
                />
              </div>
            </div>

            <!-- Right -->

            <div class="hidden md:ml-6 md:flex md:items-center">
              <!-- Profile dropdown -->
              <BaseMenu menu-class="w-52" :items="userMenu">
                <template #button="{ open }">
                  <div
                    class="flex rounded-full"
                    :class="[open ? 'bg-slate-700 ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-700' : '']"
                  >
                    <BaseAvatar :user="user" />
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
            />
          </div>
    
          <hr class="mb-4 mt-2 border-slate-200" />
    
          <!-- Profile links -->
          <div class="p-2 pb-6">
            <BaseAvatar
              :user="user"
              show-details
              size="base"
              class="px-3"
            />
            <div class="mt-4 space-y-1">
              <BaseNavbarSideItem
                v-for="item in userMenu"
                :key="item.label"
                :item="item"
              />
            </div>
          </div>
        </template>
      </BaseNavbar>
    </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
