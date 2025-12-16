import BaseSwitch from './BaseSwitch.vue';
import BaseContainer from './BaseContainer.vue';
import { createFieldStory } from '../../.storybook/utils';

export default {
  title: 'Form/BaseSwitch',
  component: BaseSwitch,
  args: {},
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
  },
};

const Template = (args) => ({
  components: {
    BaseSwitch,
    BaseContainer,
  },
  setup() {
    const value = ref(true);
    return { args, value };
  },
  template: `
    <BaseSwitch v-model="value" v-bind="args">
      <span class="text-slate-600">Label</span>
    </BaseSwitch>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

const colors = [
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'light',
  'dark',
];

const Colors = (args) => ({
  components: {
    BaseSwitch,
    BaseContainer,
  },
  setup() {
    const value = ref(true);
    return { args, value, colors };
  },
  template: `
  <div v-for="color in colors" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight mb-1">{{ color }}</p>
    <BaseSwitch v-model="value" :color="color">
      <span class="text-slate-600">Label</span>
    </BaseSwitch>
  </div>
  `,
});

export const AllColors = Colors.bind({});
AllColors.args = {};

const sizes = ['xs', 'sm', 'base', 'lg', 'xl'];

const Sizes = (args) => ({
  components: {
    BaseSwitch,
    BaseContainer,
  },
  setup() {
    const value = ref(true);
    return { args, value, sizes };
  },
  template: `
  <div v-for="size in sizes" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight mb-1">{{ size }}</p>
    <BaseSwitch v-model="value" :size="size">
      <span class="text-slate-600">Label</span>
    </BaseSwitch>
  </div>
  `,
});

export const AllSizes = Sizes.bind({});
AllSizes.args = {};

export const Field = createFieldStory({
  component: BaseSwitch,
  componentName: 'BaseSwitch',
  label: 'Activate',
});
