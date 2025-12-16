import BaseTextareaAutoresize from './BaseTextareaAutoresize.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory } from '../../.storybook/utils';

export default {
  title: 'Form/BaseTextareaAutoresize',
  component: BaseTextareaAutoresize,
  args: {
    name: 'bio',
    placeholder: 'Describe your complete life in 4 sentences...',
  },
};

const Template = (args) => ({
  components: {
    BaseTextareaAutoresize,
    ShowValue,
  },
  setup() {
    function onSubmit() {
      alert('submit');
    }
    const value = ref(null);
    return { args, value, onSubmit };
  },
  template: `
  <form @submit.prevent="onSubmit" class="border-none">
    <BaseTextareaAutoresize 
      v-model="value" 
      v-bind="args" 
      class="w-full" 
      @submit="onSubmit"
    ></BaseTextareaAutoresize>
  </form>

  <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const SubmitOnEnter = Template.bind({});
SubmitOnEnter.args = {
  submitOnEnter: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 'Lorem ipsum...',
  disabled: true,
};

export const Field = createFieldStory({
  component: BaseTextareaAutoresize,
  componentName: 'BaseTextareaAutoresize',
  label: 'Biography',
});
