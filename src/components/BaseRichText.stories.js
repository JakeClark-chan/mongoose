import BaseRichText from './BaseRichText.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory } from '@/../.storybook/utils';

const toolbarOptions = [
  'full',
  'essential',
  'minimal',
  ['bold', 'italic', 'underline', 'link'],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['clean'], // remove formatting button
];

export default {
  title: 'Form/BaseRichText',
  component: BaseRichText,
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <form @submit.prevent="" class="border-none">
        <story/>
      </form>`,
    }),
  ],
  args: {
    placeholder: 'Describe your complete life in 4 sentences...',
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['snow', 'bubble', ''],
    },
    toolbar: {
      control: { type: 'select' },
      options: toolbarOptions,
    },
  },
};

const Template = (args) => ({
  components: { BaseRichText, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseRichText v-model="value" v-bind="args" class="w-full"></BaseRichText>
    <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const FullToolbar = Template.bind({});
FullToolbar.args = {
  toolbar: 'full',
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const EssentialToolbar = Template.bind({});
EssentialToolbar.args = {
  toolbar: 'essential',
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const MinimalToolbar = Template.bind({});
MinimalToolbar.args = {
  toolbar: 'minimal',
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const SnowTheme = Template.bind({});
SnowTheme.args = {
  theme: 'snow',
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const BubbleTheme = Template.bind({});
BubbleTheme.args = {
  theme: 'bubble',
  placeholder: 'Describe your complete life in 4 sentences...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 'Lorem ipsum...',
  disabled: true,
  placeholder: '',
};

export const Field = createFieldStory({
  component: BaseRichText,
  componentName: 'BaseRichText',
  label: 'Name',
});
