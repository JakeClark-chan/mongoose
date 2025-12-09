import BaseSystemAlert from './BaseSystemAlert.vue';

export default {
  title: 'Layout/BaseSystemAlert',
  component: BaseSystemAlert,
  args: {
    to: 'https://google.com',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger'],
    },
  },
};

const Template = (args) => ({
  components: {
    BaseSystemAlert,
  },
  setup() {
    function onClose() {
      alert('close');
    }

    return { args, onClose };
  },
  template: `
    <BaseSystemAlert v-bind="args" @close="onClose">
     Tempor nisi ut ea sit pariatur aute irure magna id id ullamco cupidatat enim.
    </BaseSystemAlert>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Closable = Template.bind({});
Closable.args = {
  closable: true,
};

const colors = ['info', 'success', 'warning', 'danger'];

const Colors = (args) => ({
  components: {
    BaseSystemAlert,
  },
  setup() {
    return { args, colors };
  },
  template: `
  <div v-for="color in colors" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight mb-1">{{ color }}</p>
    <BaseSystemAlert v-bind="args" :color="color">
     Tempor nisi ut ea sit pariatur aute irure magna id id ullamco cupidatat enim.
    </BaseSystemAlert>
  </div>
  `,
});

export const AllColors = Colors.bind({});
AllColors.args = {};
