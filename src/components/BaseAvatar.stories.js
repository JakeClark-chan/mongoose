import BaseAvatar from './BaseAvatar.vue';

export default {
  title: 'Components/BaseAvatar',
  component: BaseAvatar,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
    detailsPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};

const Template = (args) => ({
  components: { BaseAvatar },
  setup() {
    return { args };
  },
  template: `
    <BaseAvatar v-bind="args"></BaseAvatar>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  showDetails: true,
  user: {
    email: 'jane@witify.io',
    first_name: 'Jane',
    last_name: 'Doe',
    full_name: 'Jane Doe',
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330??auto=format&fit=crop&w=200&h=200&q=80&g=face',
  },
};
