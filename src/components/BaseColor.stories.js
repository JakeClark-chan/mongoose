import { createFieldStory, colors } from '../../.storybook/utils';
import BaseColor from './BaseColor.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';

export default {
  title: 'Form/BaseColor',
  component: BaseColor,
  argTypes: {},
  args: {
    colors: colors,
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseColor, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseColor v-model="value" v-bind="args"></BaseColor>
    <ShowValue :value="value"></ShowValue>
  `,
});

export const Single = Template.bind({});
Single.args = {};

export const SingleRequired = Template.bind({});
SingleRequired.args = {
  required: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  modelValue: '#16a34a',
};

export const Field = createFieldStory({
  component: BaseColor,
  componentName: 'BaseColor',
  label: 'Choose your favorite color',
});
