import { DateTime } from 'luxon';
import BaseContainer from './BaseContainer.vue';
import BaseLayoutSidebarConfigurable from './BaseLayoutSidebarConfigurable.vue';

export default {
  title: 'Layout/BaseLayoutSidebarConfigurable',
  component: BaseLayoutSidebarConfigurable,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    user: {
      email: 'jane@witify.io',
      first_name: 'Jane',
      last_name: 'Doe',
      full_name: 'Jane Doe',
      avatar_url:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330??auto=format&fit=crop&w=200&h=200&q=80&g=face',
    },
    menu: [
      {
        title: 'General',
        actions: [
          {
            label: 'Dashboard',
            to: '/',
            icon: 'heroicons-home',
          },
          {
            label: 'Articles',
            to: '/articles',
            icon: 'heroicons:document-text',
            actions: [
              {
                label: 'Articles',
                to: '/articles/1',
              },
              {
                label: 'Videos',
                to: '/articles/2',
              },
              {
                label: 'Training',
                to: '/articles/3',
              },
              {
                label: 'Archived',
                to: '/articles/4',
              },
            ],
          },

          {
            label: 'Users',
            to: '/users',
            icon: 'heroicons:users',
          },
        ],
      },
      {
        title: 'Settings',
        actions: [
          {
            label: 'Account',
            to: '/account',
            icon: 'heroicons:cog',
          },
          {
            label: 'Logout',
            action: logout,
            icon: 'heroicons:arrow-left-on-rectangle',
          },
        ],
      },
    ],
    userMenu: [
      {
        label: 'Dashboard',
        to: '/',
        icon: 'heroicons-home',
      },
      {
        label: 'Settings',
        to: '/account',
        icon: 'heroicons:cog',
      },
      {
        label: 'Logout',
        action: logout,
        icon: 'heroicons:arrow-left-on-rectangle',
      },
    ],
    notifications: {
      footerTo: '/',
      footerLabel: 'See all notifications',
      items: [
        {
          id: '1',
          text: 'You have a new message',
          created_at: DateTime.now().minus({ second: 1 }).toISO(),
        },
        {
          id: '2',
          text: 'Your inbox is now full. Please empty your inbox before it goes bang.',
          to: '/',
          created_at: '2022-01-01T00:00:00',
        },
      ],
    },
  },
};

async function logout() {
  alert('logout');
}

const Template = (args) => ({
  components: {
    BaseContainer,
    BaseLayoutSidebarConfigurable,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseLayoutSidebarConfigurable v-bind="args">
      <div class="py-16">
        <BaseContainer size="3xl">
          <p v-for="i in 20" class="mb-1">
            Amet occaecat enim pariatur incididunt enim laborum enim. Duis cillum in in excepteur sit excepteur laboris consectetur magna. Commodo proident labore commodo duis veniam do nisi irure ipsum officia excepteur non. Nisi cillum mollit tempor ut.
          </p>
        </BaseContainer>
      </div>
    </BaseLayoutSidebarConfigurable>
  `,
});

export const Light = Template.bind({});
Light.args = {
  dark: false,
  logoUrl: 'https://sprintify.witify.io/img/logo/logo-side.svg',
};

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
  logoUrl: 'https://sprintify.witify.io/img/logo/logo-side-dark.svg',
};
