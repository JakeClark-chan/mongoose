import BaseIconPicker from './BaseIconPicker.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';

export default {
  title: 'Components/BaseIconPicker',
  component: BaseIconPicker,
};

const Template = (args) => ({
  components: { BaseIconPicker, ShowValue },
  setup() {
    const value = ref('heroicons:user-group-solid');
    return { args, value };
  },
  template: `
    <BaseIconPicker v-bind="args" v-model="value"></BaseIconPicker>
    <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
