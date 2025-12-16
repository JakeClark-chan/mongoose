import BaseBoolean from './BaseBoolean.vue';

export default {
  title: 'Components/BaseBoolean',
  component: BaseBoolean,
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { BaseBoolean },
  setup() {
    return { args };
  },
  template: `
    <BaseBoolean v-bind="args"></BaseBoolean>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const AllValues = (args) => ({
  components: { BaseBoolean },
  setup() {
    return { args };
  },
  template: `
    <BaseBoolean :model-value="true"></BaseBoolean>
    <BaseBoolean :model-value="false"></BaseBoolean>
  `,
});
