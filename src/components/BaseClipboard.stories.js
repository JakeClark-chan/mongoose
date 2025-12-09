import BaseClipboard from './BaseClipboard.vue';

export default {
  title: 'Components/BaseClipboard',
  component: BaseClipboard,
  argTypes: {},
};

const Template = (args) => ({
  components: { BaseClipboard },
  setup() {
    return { args };
  },
  template: `
    <BaseClipboard class="mb-3">
      <span class="underline text-blue-600">{{ args.value }}</span>
    </BaseClipboard>

    <br>

    <BaseClipboard class="mb-3 border border-slate-200 rounded px-2 py-px">
      <BaseIcon icon="heroicons:server" class="mr-2 text-slate-500" />
      <span class="font-mono text-sm text-slate-600">{{ args.value }}</span>
    </BaseClipboard>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  value: '168.192.0.1',
};
