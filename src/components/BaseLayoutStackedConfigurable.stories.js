import BaseContainer from './BaseContainer.vue';
import BaseLayoutStackedConfigurable from './BaseLayoutStackedConfigurable.vue';

export default {
  title: 'Layout/BaseLayoutStackedConfigurable',
  component: BaseLayoutStackedConfigurable,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    appName: 'Sprintify',
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
        label: 'Products',
        to: '/',
        count: 234,
      },
      {
        label: 'Users',
        to: '/setup',
      },
      {
        label: 'Account',
        to: '/settings',
        icon: 'heroicons:cog',
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
          to: '/',
          created_at: '2022-12-08T19:16:10Z',
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
    BaseLayoutStackedConfigurable,
    BaseContainer,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseLayoutStackedConfigurable v-bind="args">
      <div class="py-16">
        <BaseContainer size="3xl">
          <p v-for="i in 20" class="mb-1">
            Amet occaecat enim pariatur incididunt enim laborum enim. Duis cillum in in excepteur sit excepteur laboris consectetur magna. Commodo proident labore commodo duis veniam do nisi irure ipsum officia excepteur non. Nisi cillum mollit tempor ut.
          </p>
        </BaseContainer>
      </div>
    </BaseLayoutStackedConfigurable>
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
