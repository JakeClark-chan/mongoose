import BaseShortcut from './BaseShortcut.vue';

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
];

const sizes = ['base', 'lg'];

export default {
  title: 'Components/BaseShortcut',
  component: BaseShortcut,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    contrast: {
      control: { type: 'select' },
      options: ['low', 'high'],
    },
  },
};

const Template = (args) => ({
  components: { BaseShortcut },
  setup() {
    return { args };
  },
  template: `
    <BaseShortcut v-bind="args">
    </BaseShortcut>
  `,
});

export const Basic = Template.bind({});
Basic.args = {
  to: '/restaurants',
  title: 'Basic shortcut',
  icon: 'heroicons:user',
};

export const Colors = (args) => ({
  components: { BaseShortcut },
  setup() {
    return { args, colors, sizes };
  },
  template: `
  <div v-for="color in colors" :key="color">
    <p class="text-xs text-slate-600 leading-tight my-2">{{ color }}</p>
    <BaseShortcut v-bind="args" :color="color" icon="heroicons:beaker-20-solid"></BaseShortcut>
  </div>
  `,
});

Colors.args = {
  contrast: 'high',
  to: '/restaurants',
  title: 'Contrast example',
  description:
    'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
  linkText: 'Open app',
};

export const Contrast = (args) => ({
  components: { BaseShortcut },
  setup() {
    return { args, colors, sizes };
  },
  template: `
  <div v-for="color in colors" :key="color">
    <p class="text-xs text-slate-600 leading-tight my-2">{{ color }}</p>
    <BaseShortcut v-bind="args" :color="color" icon="heroicons:beaker-20-solid"></BaseShortcut>
  </div>
  `,
});

Contrast.args = {
  contrast: 'low',
  to: '/restaurants',
  title: 'Contrast example',
  description:
    'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
  linkText: 'Open app',
};
