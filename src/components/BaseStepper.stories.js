import BaseStepper from './BaseStepper.vue';

export default {
  title: 'Components/BaseStepper',
  component: BaseStepper,
};

const Template = (args) => ({
  components: { BaseStepper },
  setup() {
    return { args };
  },
  template: `<BaseStepper v-bind="args"/>`,
});

const threeItems = [
  {
    title: 'Job details',
    description: 'Vitae sed mi luctus laoreet.',
    stepNumber: 1,
    status: 'completed',
    index: 0,
  },
  {
    title: 'Application form',
    description: 'Cursus semper viverra.',
    stepNumber: 2,
    status: 'current',
    index: 1,
  },
  {
    title: 'Preview',
    description: 'Penatibus eu quis ante.',
    stepNumber: 3,
    status: 'pending',
    index: 2,
  },
];

export const Demo = Template.bind({});

Demo.args = {
  items: threeItems,
};

const sixItems = [
  {
    title: 'Job details',
    description: 'Vitae sed mi luctus laoreet.',
    stepNumber: 1,
    status: 'completed',
    index: 0,
  },
  {
    title: 'Application form',
    description: 'Cursus semper viverra.',
    stepNumber: 2,
    status: 'completed',
    index: 1,
  },
  {
    title: 'Preview',
    description: 'Penatibus eu quis ante.',
    stepNumber: 3,
    status: 'completed',
    index: 2,
  },
  {
    title: 'HR interview',
    description: 'Penatibus eu quis ante.',
    stepNumber: 4,
    status: 'completed',
    index: 3,
  },
  {
    title: 'Technical interview',
    description: 'Penatibus eu quis ante.',
    stepNumber: 5,
    status: 'current',
    index: 4,
  },
  {
    title: 'Hiring',
    description: 'Penatibus eu quis ante.',
    stepNumber: 6,
    status: 'pending',
    index: 5,
  },
];

export const ManyItems = Template.bind({});
ManyItems.args = {
  items: sixItems,
};
