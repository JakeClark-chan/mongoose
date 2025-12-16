import BaseStepperItem from './BaseStepperItem.vue';

export default {
  title: 'Components/BaseStepperItem',
  component: BaseStepperItem,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['pending', 'current', 'completed'],
    },
    description: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { BaseStepperItem },
  setup() {
    return { args };
  },
  template: `
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Progress">
      <ol
        role="list"
        class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
      >
        <li
          class="relative overflow-hidden lg:flex-1"
        >
          <div
            :class="[
              'rounded-t-md border-b-0',
              'overflow-hidden border border-gray-200 lg:border-0',
            ]"
          >
  <BaseStepperItem v-bind="args"/>
  </div>
  </li>
  </ol>
  </nav>
  </div>
  `,
});

export const Simple = Template.bind({});

Simple.args = {
  title: 'Job application',
  description: '',
  stepNumber: 1,
  status: 'pending',
  index: 0,
};

export const WithDescription = Template.bind({});

WithDescription.args = {
  title: 'Job application',
  description: 'Vitae sed mi luctus laoreet.',
  stepNumber: 1,
  status: 'current',
  index: 0,
};
