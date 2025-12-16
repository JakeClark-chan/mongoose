import BaseDialog from './BaseDialog.vue';

export default {
  title: 'Components/BaseDialog',
  component: BaseDialog,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger'],
    },
  },
  args: {
    message:
      'Nisi Lorem sunt amet aliqua dolor ullamco deserunt enim irure non ad. Excepteur culpa consectetur dolore culpa sunt aliquip proident quis.',
  },
};

const Template = (args) => ({
  components: { BaseDialog },
  setup() {
    return { args };
  },
  template: `
    <BaseDialog v-bind="args">
    </BaseDialog>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  title: 'Be careful',
  color: 'warning',
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success',
  color: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  title: 'Error',
  color: 'danger',
};

export const Info = Template.bind({});
Info.args = {
  title: 'Information',
  color: 'info',
};
