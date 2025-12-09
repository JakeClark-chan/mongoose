import BaseSkeleton from './BaseSkeleton.vue';
import BaseContainer from './BaseContainer.vue';

export default {
  title: 'Components/BaseSkeleton',
  component: BaseSkeleton,
  args: {},
};

const Template = (args) => ({
  components: {
    BaseSkeleton,
    BaseContainer,
  },
  setup() {
    return { args };
  },
  template: `
  <BaseContainer size="xl">
    <div class="flex space-x-5">
      <div class="shrink-0">
        <BaseSkeleton class="h-16 rounded-full w-16" v-bind="args"></BaseSkeleton>
      </div>
      <div class="grow">
        <BaseSkeleton class="w-52 h-8 mb-3" v-bind="args"></BaseSkeleton>
        <BaseSkeleton class="w-full h-4 mb-1" v-bind="args"></BaseSkeleton>
        <BaseSkeleton class="w-full h-4 mb-1" v-bind="args"></BaseSkeleton>
        <BaseSkeleton class="w-full h-4 mb-1" v-bind="args"></BaseSkeleton>
      </div>
    </div>
  </BaseContainer>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
