import BaseDatePicker from './BaseDatePicker.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { DateTime } from 'luxon';
import { createFieldStory } from '../../.storybook/utils';

export default {
  title: 'Form/BaseDatePicker',
  component: BaseDatePicker,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range', 'time'],
    },
    locale: {
      control: { type: 'select' },
      options: ['en', 'fr'],
    },
  },
};

const Template = (args) => ({
  components: { BaseDatePicker, ShowValue },
  setup() {
    const value = ref('2022-01-01');
    return { value, args };
  },
  template: `
    <BaseDatePicker v-model="value" v-bind="args">
    </BaseDatePicker>
    <ShowValue :value="value" />
  `,
});

export const Demo = Template.bind({});

export const MinDate = Template.bind({});
MinDate.args = {
  minDate: DateTime.fromISO('2023-01-05').toJSDate(),
};

export const MaxDate = Template.bind({});
MaxDate.args = {
  maxDate: '2023-01-18',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Range = Template.bind({});
Range.args = {
  mode: 'range',
};

export const Multiple = Template.bind({});
Multiple.args = {
  mode: 'multiple',
};

export const DateAndTime = Template.bind({});
DateAndTime.args = {
  enableTime: true,
  format: 'Y-m-d H:i',
};

export const DisableDates = Template.bind({});
DisableDates.args = {
  disableDates: [
    '2023-01-12',
    '2023-01-18',
    '2023-01-24',
    new Date(2023, 0, 16), // '2023-01-16'
  ],
};

export const RangeDisableDates = Template.bind({});
RangeDisableDates.args = {
  disableDates: [
    {
      from: '2023-01-09',
      to: '2023-01-15',
    },
    {
      from: '2023-01-20',
      to: '2023-01-25',
    },
  ],
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const DateTimeConversion = (args) => {
  return {
    components: { BaseDatePicker, ShowValue },
    setup() {
      const updatedValue = ref(null);
      return { args, updatedValue };
    },
    template: `
    <BaseDatePicker v-bind="args" @update:modelValue="(v) => updatedValue = v">
    </BaseDatePicker>

    <p class="mt-2"></p>
    <small>Original props</small>
    <ShowValue class='mt-1' :value="args.modelValue" />
    
    <p class="mt-2"></p>
    <small>Updated value</small>
    <ShowValue class='mt-1' :value="updatedValue" />
  `,
  };
};
DateTimeConversion.args = {
  modelValue: '2023-01-05T10:00:00Z',
};

export const Field = createFieldStory({
  component: BaseDatePicker,
  componentName: 'BaseDatePicker',
  label: 'Date',
});
