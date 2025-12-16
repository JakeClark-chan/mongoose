import BaseNumber from './BaseNumber.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';
import { createFieldStory } from '@/../.storybook/utils';

export default {
  title: 'Form/BaseNumber',
  component: BaseNumber,
  args: {
    placeholder: 'Enter number',
    step: 0.1,
    min: 0,
    max: 100,
  },
};

const Template = (args) => ({
  components: {
    ShowValue,
    BaseNumber,
  },
  setup() {
    const value = ref(12.1212);
    return { args, value };
  },
  template: `
  <form @submit.prevent="" class="border-none">
    <BaseNumber v-model="value" v-bind="args" class=""></BaseNumber>
  </form>
  <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

export const Field = createFieldStory({
  component: BaseNumber,
  componentName: 'BaseNumber',
  label: 'Rebate',
});
