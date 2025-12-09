import { options } from '../../.storybook/utils';
import BaseRadioGroup from './BaseRadioGroup.vue';
import { createFieldStory } from '@/../.storybook/utils';
import ShowValue from '../../.storybook/components/ShowValue.vue';

export default {
  title: 'Form/BaseRadioGroup',
  component: BaseRadioGroup,
  argTypes: {},
  args: {
    labelKey: 'label',
    valueKey: 'value',
    options: options,
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseRadioGroup, ShowValue },
  setup() {
    const value = ref(options[0].value);
    function onSubmit() {
      alert('submit');
    }
    return { args, value, onSubmit };
  },
  template: `
  <form @submit.prevent="onSubmit">
    <BaseRadioGroup v-model="value" v-bind="args"></BaseRadioGroup>
    <button type="submit" class="btn btn-primary mt-4">Submit</button>
    <ShowValue :value="value">{{ value }}</ShowValue>
  </form>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const SlotOption = (args) => ({
  components: { BaseRadioGroup },
  setup() {
    const value = ref(null);

    const options = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
      { label: 'Gray', value: 'gray' },
    ];

    return { value, options, args };
  },
  template: `
  <BaseRadioGroup
    v-bind="args"
    v-model="value"
    :options="options"
    label-class="flex space-x-2 items-start"
  >
    <template #option="{ option }">
      <div>
        <div class="flex items-center space-x-1">
          <div style="height: 10px; width: 10px; border-radius: 4px;" :style="{ backgroundColor: option.value }"></div>
          <div class="leading-none font-medium text-sm">{{ option.label }}</div>
        </div>
        <p class="text-slate-500 text-xs leading-tight">{{ option.value }}</p>
      </div>
    </template>
  </BaseRadioGroup>
  `,
});

export const Field = createFieldStory({
  component: BaseRadioGroup,
  componentName: 'BaseRadioGroup',
  label: 'Choose your character',
});
