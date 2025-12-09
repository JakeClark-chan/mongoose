import BaseProgressCircle from './BaseProgressCircle.vue';

export default {
  title: 'Components/BaseProgressCircle',
  component: BaseProgressCircle,
  args: {
    class: 'text-primary-500',
    radius: 100,
    stroke: 5,
    progress: 0.6,
  },
};

const Template = (args) => ({
  components: {
    BaseProgressCircle,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseProgressCircle v-bind="args"></BaseProgressCircle>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
