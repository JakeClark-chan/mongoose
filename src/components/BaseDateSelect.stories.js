import BaseDateSelect from './BaseDateSelect.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory } from '../../.storybook/utils';

export default {
  title: 'Form/BaseDateSelect',
  component: BaseDateSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { BaseDateSelect, ShowValue },
  setup() {
    const value = ref(null);
    return { value, args };
  },
  template: `
  <BaseDateSelect v-model="value" v-bind="args">
  </BaseDateSelect>
  <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const MinYear = Template.bind({});
MinYear.args = {
  minYear: 1980,
};

export const MaxYear = Template.bind({});
MaxYear.args = {
  maxYear: 2010,
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: '2022-11-16',
  disabled: true,
};

export const Field = createFieldStory({
  component: BaseDateSelect,
  componentName: 'BaseDateSelect',
  label: 'Date',
});
