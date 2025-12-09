import BaseInput from './BaseInput.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory } from '@/../.storybook/utils';

export default {
  title: 'Form/BaseInput',
  component: BaseInput,
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
    type: 'text',
    placeholder: 'Enter your name',
  },
  argTypes: {
    mask: {
      control: { type: 'select' },
      options: [
        'phone',
        'date',
        'time',
        'credit-card',
        'zip-code-canada',
        'dynamicMask',
        'customMask',
      ],
    },
  },
};

const Template = (args) => ({
  components: { BaseInput, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseInput v-model="value" v-bind="args" class="w-full"></BaseInput>
    <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});

export const IconLeft = Template.bind({});
IconLeft.args = {
  iconLeft: 'heroicons:phone-20-solid',
  placeholder: 'Enter your phone',
};

export const IconRight = Template.bind({});
IconRight.args = {
  iconRight: 'mdi:email-outline',
  placeholder: 'Enter your email',
};

export const Prefix = Template.bind({});
Prefix.args = {
  prefix: 'https://',
  placeholder: 'website URL',
};

export const Suffix = Template.bind({});
Suffix.args = {
  suffix: '%',
  placeholder: 'Percentage',
};

export const All = Template.bind({});
All.args = {
  iconLeft: 'heroicons:currency-dollar-20-solid',
  prefix: 'Price',
  iconRight: 'heroicons:document-magnifying-glass',
  suffix: '$',
  placeholder: 'Item price',
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  step: 0.1,
  placeholder: 'Enter a number',
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 'Disabled input!',
  disabled: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
  prefix: 'Price',
  iconRight: 'heroicons:currency-dollar',
};

export const PhoneMask = Template.bind({});
PhoneMask.args = {
  mask: 'phone',
  placeholder: '(250) 555-0199',
};

export const DateMask = Template.bind({});
DateMask.args = {
  mask: 'date',
  placeholder: 'yyyy-mm-dd',
};

export const TimeMask = Template.bind({});
TimeMask.args = {
  mask: 'time',
  placeholder: 'hh:mm:ss',
};

export const CreditCard = Template.bind({});
CreditCard.args = {
  mask: 'credit-card', //4555 5666 6666 6634
};

export const CanadianZipCodeMask = Template.bind({});
CanadianZipCodeMask.args = {
  mask: 'zip-code-canada', // M5M 4M4
};

export const DynamicMask = Template.bind({});
DynamicMask.args = {
  mask: ['###.###.###-##', '##.###.###/####-##'],
};

export const CustomMask = Template.bind({});
CustomMask.args = {
  mask: (value) => (value.startsWith('1') ? '#-#' : '##-##'),
};

export const Field = createFieldStory({
  component: BaseInput,
  componentName: 'BaseInput',
  label: 'Name',
});
