import BaseCharacterCounter from './BaseCharacterCounter.vue';
import BaseInput from '@/components/BaseInput.vue';

export default {
  title: 'Components/BaseCharacterCounter',
  component: BaseCharacterCounter,
  args: {
    text: 'Test',
    max: 100,
    min: 10,
  },
};

const Template = (args) => ({
  components: {
    BaseCharacterCounter,
    BaseInput,
  },
  setup() {
    const text = ref('bla bla');
    return { args, text };
  },
  template: `
    <BaseInput v-model="text" name="test" class="w-full mb-1"></BaseInput>
    <BaseCharacterCounter v-bind="args" :text="text" class="text-xs text-slate-500"></BaseCharacterCounter>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
