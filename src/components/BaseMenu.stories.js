import BaseMenu from './BaseMenu.vue';
import { Icon as BaseIcon } from '@iconify/vue';
import BaseAvatar from './BaseAvatar.vue';

export default {
  title: 'Components/BaseMenu',
  component: BaseMenu,
  args: {
    position: 'bottom-right',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom-left', 'bottom-right'],
    },
  },
};

const Template = (args) => ({
  components: {
    BaseMenu,
    BaseIcon,
    BaseAvatar,
  },
  setup() {
    const items = [
      {
        label: 'Export file',
        icon: 'mdi-export',
        action() {
          alert('Export!');
        },
      },
      {
        label: 'Google',
        icon: 'mdi-google',
        href: 'https://google.com',
        count: 1000,
      },
      {
        icon: 'mdi-access-point',
        label: 'Reconnect',
        to: 'home',
        color: 'success',
      },
      {
        icon: 'mdi-archive',
        label: 'Archive',
        href: 'https://google.com',
        color: 'warning',
      },
      {
        icon: 'mdi-trash-can',
        label: 'Delete',
        href: 'https://google.com',
        color: 'danger',
        count: 1,
      },
    ];

    const user = {
      email: 'jane@witify.io',
      first_name: 'Jane',
      last_name: 'Doe',
      full_name: 'Jane Doe',
      avatar_url:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330??auto=format&fit=crop&w=200&h=200&q=80&g=face',
    };

    args.items = items;

    return { args, user };
  },
  template: `
    <div class="pb-52">

      <h2 class="mb-5 font-semibold">Various examples</h2>
      
      <p class="text-sm mb-1 text-slate-600">Simple button</p>

      <BaseMenu v-bind="args" class="inline-block">
        <template #button="{ open }">
          <div 
            class="btn" 
            :class="[open ? 'ring-2 ring-primary-500 ring-offset-2': '']"
          >
            Click me
          </div>
        </template>
      </BaseMenu>

      <br>
      <br>

      <p class="text-sm mb-1 text-slate-600">Contextual action button</p>

      <BaseMenu v-bind="args" class="inline-block">
        <template #button="{ open }">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white duration-150 hover:bg-slate-50"
            :class="[open ? 'ring-2 ring-primary-500 ring-offset-2': '']"
          >
            <BaseIcon icon="heroicons-solid:dots-vertical" />
          </div>
        </template>
      </BaseMenu>

      <br>
      <br>

      <p class="text-sm mb-1 text-slate-600">With BaseAvatar</p>

      <BaseMenu v-bind="args" class="inline-block">
        <template #button="{ open }">
          <div class="bg-white">
            <BaseAvatar show-details :user="user" />
          </div>
        </template>
      </BaseMenu>
    </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
