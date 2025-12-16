import BaseInputLabel from './BaseInputLabel.vue';
import BaseInput from './BaseInput.vue';

export default {
  title: 'Form/BaseInputLabel',
  component: BaseInputLabel,
  args: {
    required: true,
    label: 'First Name',
    class: 'text-slate-600 block text-sm',
  },
};

const Template = (args) => ({
  components: {
    BaseInputLabel,
    BaseInput,
  },
  setup() {
    return { args };
  },
  template: `
  <form @submit.prevent="" class="mt-10">
    <BaseInputLabel v-bind="args"></BaseInputLabel>
    <BaseInput required name="name" placeholder="Enter your first name"></BaseInput>
  </form>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Help = Template.bind({});
Help.args = {
  help: 'Enter your first name here',
};
