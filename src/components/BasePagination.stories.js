import BasePagination from './BasePagination.vue';

export default {
  title: 'Components/BasePagination',
  component: BasePagination,
  args: {
    totalVisible: 12,
    lastPage: 20,
  },
};

const Template = (args) => ({
  components: {
    BasePagination,
  },
  setup() {
    const modelValue = ref(10);

    return { args, modelValue };
  },
  template: `
  <div>
    <BasePagination v-model="modelValue" v-bind="args"></BasePagination>
  </div>
  <div style="max-width: 500px;">
    <BasePagination v-model="modelValue" v-bind="args"></BasePagination>
  </div>
  <div style="max-width: 250px;">
    <BasePagination v-model="modelValue" v-bind="args"></BasePagination>
  </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
