import BaseAvatarGroup from './BaseAvatarGroup.vue';

export default {
  title: 'Components/BaseAvatarGroup',
  component: BaseAvatarGroup,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
  },
};

const user = {
  email: 'jane@witify.io',
  full_name: 'Jane Doe',
  avatar_url:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330??auto=format&fit=crop&w=200&h=200&q=80&g=face',
};

const n = 40;

const users = [];

for (let i = 0; i < n; i++) {
  users.push(user);
}

const Template = (args) => ({
  components: { BaseAvatarGroup },
  setup() {
    return { args };
  },
  template: `
    <p class="text-sm mt-2">Demo</p>
    <BaseAvatarGroup v-bind="args"></BaseAvatarGroup>

    <p class="text-sm mt-2">With small container</p>
    <div style="max-width: 200px; overflow: hidden;"><BaseAvatarGroup v-bind="args"></BaseAvatarGroup></div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  users: users,
  to(user) {
    return '/' + user.email;
  },
};

const TemplateWithMaxItems = (args) => ({
  components: { BaseAvatarGroup },
  setup() {
    return { args };
  },
  template: `
    <p class="text-sm mt-2">Demo</p>
    <BaseAvatarGroup v-bind="args"></BaseAvatarGroup>

    <p class="text-sm mt-2">With small container</p>
    <div style="max-width: 200px; overflow: hidden;"><BaseAvatarGroup v-bind="args"></BaseAvatarGroup></div>
  `,
});

export const MaxItems = TemplateWithMaxItems.bind({});
MaxItems.args = {
  users: users,
  to(user) {
    return '/' + user.email;
  },
};
