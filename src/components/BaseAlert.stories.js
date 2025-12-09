import BaseAlert from './BaseAlert.vue';

export default {
  title: 'Components/BaseAlert',
  component: BaseAlert,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger'],
    },
  },
};

const Template = (args) => ({
  components: { BaseAlert },
  setup() {
    return { args };
  },
  template: `
    <BaseAlert v-bind="args">
      <p>Nisi Lorem sunt amet aliqua dolor ullamco deserunt enim irure non ad. Excepteur culpa consectetur dolore culpa sunt aliquip proident quis. Excepteur officia mollit aute sint quis nisi sint.</p>
    </BaseAlert>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  title: 'Be careful',
  color: 'warning',
  bordered: true,
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success',
  color: 'success',
  bordered: true,
};

export const Danger = Template.bind({});
Danger.args = {
  title: 'Error',
  color: 'danger',
  bordered: true,
};

export const Info = Template.bind({});
Info.args = {
  title: 'Information',
  color: 'info',
  bordered: true,
};
