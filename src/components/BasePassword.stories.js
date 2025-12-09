import BasePassword from './BasePassword.vue';
import { createFieldStory } from '@/../.storybook/utils';

export default {
  title: 'Form/BasePassword',
  component: BasePassword,
  args: {},
};

const Template = (args) => ({
  components: {
    BasePassword,
  },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: `
  <form @submit.prevent="">
    <BasePassword class="border-slate-300" v-model="value" v-bind="args"></BasePassword>
  </form>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  required: true,
  placeholder: 'Enter your password',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Enter your password',
};

export const Field = createFieldStory({
  component: BasePassword,
  componentName: 'BasePassword',
  label: 'Password',
});
