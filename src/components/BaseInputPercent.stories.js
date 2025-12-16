import BaseInputPercent from './BaseInputPercent.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';
import { createFieldStory } from '@/../.storybook/utils';

export default {
  title: 'Form/BaseInputPercent',
  component: BaseInputPercent,
  args: {
    placeholder: 'Enter rebate, eg: 50%',
    step: 0.1,
    min: 0,
    max: 100,
  },
};

const Template = (args) => ({
  components: {
    ShowValue,
    BaseInputPercent,
  },
  setup() {
    const value = ref(0.5);
    return { args, value };
  },
  template: `
  <form @submit.prevent="" class="border-none">
    <BaseInputPercent v-model="value" v-bind="args" class="w-full"></BaseInputPercent>
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
  component: BaseInputPercent,
  componentName: 'BaseInputPercent',
  label: 'Rebate',
});
