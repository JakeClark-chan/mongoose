import BaseStatistic from './BaseStatistic.vue';

export default {
  title: 'Components/BaseStatistic',
  component: BaseStatistic,
  argTypes: {
    trend: {
      control: { type: 'select' },
      options: ['up', 'down', null],
    },
  },
};

const Template = (args) => ({
  components: { BaseStatistic },
  setup() {
    return { args };
  },
  template: `
    <BaseStatistic v-bind="args">
    </BaseStatistic>
  `,
});

export const Simple = Template.bind({});
Simple.args = {
  primaryValue: '$7,552.90',
};

export const TrendUp = Template.bind({});
TrendUp.args = {
  primaryValue: '$15,289.63',
  secondaryValue: '15%',
  trend: 'up',
};

export const TrendDown = Template.bind({});
TrendDown.args = {
  primaryValue: '$10,123.25',
  secondaryValue: '-22%',
  trend: 'down',
};

export const Complex = Template.bind({});
Complex.args = {
  label: 'Complex example',
  primaryValue: '$10,123.25',
  secondaryValue: '-22%',
  trend: 'down',
  caption: 'Since last week',
};
