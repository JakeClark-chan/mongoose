import BaseCounter from './BaseCounter.vue';

export default {
  title: 'Components/BaseCounter',
  component: BaseCounter,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'danger', 'dark', 'light', 'white'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base'],
    },
  },
};

const Template = (args) => ({
  components: { BaseCounter },
  setup() {
    return { args };
  },
  template: `
    <BaseCounter v-bind="args"></BaseCounter>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  count: 355,
  maxDigit: 2,
};
