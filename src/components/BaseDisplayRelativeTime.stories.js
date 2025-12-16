import BaseDisplayRelativeTime from './BaseDisplayRelativeTime.vue';
import { DateTime } from 'luxon';

export default {
  title: 'Components/BaseDisplayRelativeTime',
  component: BaseDisplayRelativeTime,
  argTypes: {
    showTooltip: {
      control: { type: 'boolean' },
    },
    tooltipPosition: {
      options: ['top', 'bottom', 'right', 'left'],
      control: { type: 'radio' },
      if: { arg: 'showTooltip' },
    },
    tooltipSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      if: { arg: 'showTooltip' },
    },
  },
  args: {
    value: DateTime.now().minus({ minutes: 2 }).toISO(),
  },
};

const Template = (args) => ({
  components: { BaseDisplayRelativeTime },
  setup() {
    return { args };
  },
  template: `
    <BaseDisplayRelativeTime v-bind="args"></BaseDisplayRelativeTime>
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  showTooltip: true,
  tooltipPosition: 'top',
  tooltipSize: 'large',
};

const TemplateCustom = (args) => ({
  components: { BaseDisplayRelativeTime },
  setup() {
    return { args };
  },
  template: `
    <BaseDisplayRelativeTime v-bind="args" v-slot="{readableDate}">
      <span class="text-red-500">
         {{readableDate}}
      </span>
    </BaseDisplayRelativeTime>
  `,
});

export const CustomSlot = TemplateCustom.bind({});
CustomSlot.args = {};
