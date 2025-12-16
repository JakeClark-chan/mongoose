import BaseFieldI18n from './BaseFieldI18n.vue';
import BaseForm from './BaseForm.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';

export default {
  title: 'Form/BaseFieldI18n',
  component: BaseFieldI18n,
  decorators: [
    (story) => ({
      components: { story, BaseForm },
      template: `
      <BaseForm method="post" url="https://api.com/todos/422" :data="{}">
        <story/>
        <button type="submit" class="btn btn-primary mt-5">Submit</button>
      </BaseForm>`,
    }),
  ],
  args: {
    component: 'BaseInput',
    required: true,
    name: 'name',
    label: 'Name',
  },
};

const Template = (args) => ({
  components: { BaseFieldI18n, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseFieldI18n v-model="value" v-bind="args" class="w-full"></BaseFieldI18n>
    <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});
