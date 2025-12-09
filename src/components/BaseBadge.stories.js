import BaseBadge from './BaseBadge.vue';

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
  '#ff0000',
  '#dbeafe',
];

const sizes = ['sm', 'base', 'lg'];

export default {
  title: 'Components/BaseBadge',
  component: BaseBadge,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
    contrast: {
      control: { type: 'select' },
      options: ['low', 'high'],
    },
  },
};

const Template = (args) => ({
  components: { BaseBadge },
  setup() {
    return { args };
  },
  template: `
    <BaseBadge v-bind="args">
      Urgent
    </BaseBadge>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  color: 'red',
  icon: 'heroicons:exclamation-triangle-20-solid',
  contrast: 'high',
};

export const Colors = (args) => ({
  components: { BaseBadge },
  setup() {
    return { args, colors, sizes };
  },
  template: `
  <div v-for="color in colors" :key="color" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ color }}</p>
    <BaseBadge v-bind="args" :color="color" icon="heroicons:beaker-20-solid">
      Administrator
    </BaseBadge>
  </div>
  `,
});

Colors.args = {
  contrast: 'high',
};

export const Contrast = (args) => ({
  components: { BaseBadge },
  setup() {
    return { args, colors, sizes };
  },
  template: `
  <div v-for="color in colors" :key="color" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ color }}</p>
    <BaseBadge v-bind="args" :color="color" icon="heroicons:beaker-20-solid">
      Administrator
    </BaseBadge>
  </div>
  `,
});

Contrast.args = {
  contrast: 'low',
};

export const Sizes = (args) => ({
  components: { BaseBadge },
  setup() {
    return { args, colors, sizes };
  },
  template: `
  <div v-for="size in sizes" :key="size">
    <p class="text-xs text-slate-600 leading-tight mb-1">{{ size }}</p>
    <BaseBadge v-bind="args" :size="size" icon="heroicons:beaker-20-solid">
      Administrator
    </BaseBadge>
  </div>
  `,
});
