import BaseBreadcrumbs from './BaseBreadcrumbs.vue';

const breadcrumbs = [
  {
    label: 'Home',
    icon: 'heroicons:home-solid',
    to: '/',
  },
  {
    label: 'Users',
    to: '/users',
  },
  {
    label: 'John Doe',
    to: '/users/1',
  },
  {
    label: 'Very long title this is a very long title that will be truncated',
    to: '/users/1/settings',
  },
];

export default {
  title: 'Layout/BaseBreadcrumbs',
  component: BaseBreadcrumbs,
  argTypes: {},
  args: {
    breadcrumbs: breadcrumbs,
  },
};

const Template = (args) => ({
  components: { BaseBreadcrumbs },
  setup() {
    return { args, breadcrumbs };
  },
  template: `
    <BaseBreadcrumbs v-bind="args"></BaseBreadcrumbs>

    <pre class="mt-4 bg-slate-800 font-light text-xs p-3 rounded text-white">{{ breadcrumbs }}</pre>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
