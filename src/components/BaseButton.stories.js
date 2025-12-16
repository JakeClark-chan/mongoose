import BaseButton from './BaseButton.vue';

const colors = [
  'btn-primary',
  'btn-secondary',
  'btn-secondary-outline',
  'btn-success',
  'btn-success-outline',
  'btn-warning',
  'btn-warning-outline',
  'btn-danger',
  'btn-danger-outline',
  'btn-white',
  'btn-slate-100',
  'btn-slate-100-outline',
  'btn-slate-200',
  'btn-slate-200-outline',
  'btn-black',
];

const sizes = ['btn-xs', 'btn-sm', 'btn-base', 'btn-lg', 'btn-xl'];

export default {
  title: 'Components/BaseButton',
  component: BaseButton,
  argTypes: {
    class: {
      type: 'string',
    },
  },
};

const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: `
    <BaseButton v-bind="args">
      Click me
    </BaseButton>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  class: '',
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Colors = (args) => ({
  components: { BaseButton },
  setup() {
    return { args, colors };
  },
  template: `
    <p class="text-xs text-slate-600 leading-tight mb-1">btn</p>
    <BaseButton class="btn">
      Click here
    </BaseButton>
    <div class="mb-4"></div>
    <div v-for="color in colors" :key="color" class="mb-4">
      <p class="text-xs text-slate-600 leading-tight mb-1">btn {{ color }}</p>
      <BaseButton :class="color">
        Click here
      </BaseButton>
    </div>
  `,
});

export const Sizes = (args) => ({
  components: { BaseButton },
  setup() {
    return { args, sizes };
  },
  template: `
    <div v-for="size in sizes" :key="size" class="mb-4">
      <p class="text-xs text-slate-600 leading-tight mb-1">btn {{ size }}</p>
      <BaseButton class="btn-primary" :class="size">
      Click here
      </BaseButton>
    </div>
  `,
});
