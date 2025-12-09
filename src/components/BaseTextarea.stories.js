import { createFieldStory } from '../../.storybook/utils';
import BaseTextarea from './BaseTextarea.vue';

export default {
  title: 'Form/BaseTextarea',
  component: BaseTextarea,
  args: {
    placeholder: 'Describe your complete life in 4 sentences...',
  },
};

const Template = (args) => ({
  components: {
    BaseTextarea,
  },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: `
  <form @submit.prevent="" class="border-none">
    <BaseTextarea v-model="value" v-bind="args" class="w-full"></BaseTextarea>
    <button type="submit" class="btn btn-primary mt-4">Submit</button>
  </form>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 'Lorem ipsum...',
  disabled: true,
};

export const Field = createFieldStory({
  component: BaseTextarea,
  componentName: 'BaseTextarea',
  label: 'Biography',
});
