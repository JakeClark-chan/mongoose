import BaseContainer from './BaseContainer.vue';

export default {
  title: 'Layout/BaseContainer',
  description: 'Lorem',
  component: BaseContainer,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
    },
  },
};

const Template = (args) => ({
  components: { BaseContainer },
  setup() {
    return { args };
  },
  template: `
  <div class="bg-slate-100 py-16">
    <BaseContainer v-bind="args">
      <div class="bg-white py-5 border-2 border-dashed border-slate-400 rounded">
        <p class="text-center">Default slot</p>
      </div>
    </BaseContainer>
  </div>`,
});

export const Demo = Template.bind({});

Demo.args = {
  size: '7xl',
};
