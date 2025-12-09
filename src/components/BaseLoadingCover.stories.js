import BaseLoadingCover from './BaseLoadingCover.vue';

export default {
  title: 'Layout/BaseLoadingCover',
  component: BaseLoadingCover,
  args: {
    delay: 0,
    modelValue: true,
    size: 'sm',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
    },
  },
};

const Template = (args) => ({
  components: {
    BaseLoadingCover,
  },
  setup() {
    return { args };
  },
  template: `
    <div class="relative bg-slate-100 p-6 py-10">
      <p class="text-center text-slate-700">Non dolor consectetur et occaecat.</p>
      <BaseLoadingCover v-bind="args" />
    </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const SmallSpinner = Template.bind({});
SmallSpinner.args = {
  size: 'sm',
};

export const LargeSpinner = Template.bind({});
LargeSpinner.args = {
  size: 'lg',
};

export const SpinnerCustomClass = Template.bind({});
SpinnerCustomClass.args = {
  iconClass: 'text-red-500 w-10 h-10',
};

export const BackdropCustomClass = Template.bind({});
BackdropCustomClass.args = {
  backdropClass: 'bg-slate-100 opacity-50',
};
