import { createFieldStory, options } from '../../.storybook/utils';
import BaseButtonGroup from './BaseButtonGroup.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';

export default {
  title: 'Form/BaseButtonGroup',
  component: BaseButtonGroup,
  argTypes: {},
  args: {
    labelKey: 'label',
    valueKey: 'value',
    options: options,
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseButtonGroup, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseButtonGroup v-model="value" v-bind="args"></BaseButtonGroup>
    <ShowValue :value="value"></ShowValue>
  `,
});

export const Single = Template.bind({});
Single.args = {};

export const SingleRequired = Template.bind({});
SingleRequired.args = {
  required: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  modelValue: { label: 'Dark Maul', value: 'darth_maul' },
};

export const SlotOption = (args) => ({
  components: { BaseButtonGroup },
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
  <BaseButtonGroup
    v-bind="args"
    v-model="value"
    :options="options"
    button-class="btn btn-xs"
    button-selected-class="btn-black"
  >
    <template #option="{ option }">
      <div class="flex items-center space-x-1 font-semibold">
        <div class="w-3 h-3 rounded" :style="{ backgroundColor: option.value }"></div>
        <div>{{ option.label }}</div>
      </div>
    </template>
  </BaseButtonGroup>
  `,
});

export const Field = createFieldStory({
  component: BaseButtonGroup,
  componentName: 'BaseButtonGroup',
  label: 'Choose your Jedi ou Sith',
});
