import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';

export default {
  title: 'Layout/BaseCard',
  component: BaseCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { BaseCard, BaseCardRow },
  setup() {
    return { args };
  },
  template: `
    <BaseCard class="mb-3">
      Content (no padding)
    </BaseCard>

    <BaseCard class="mb-3">
      <BaseCardRow>
        Content (with padding)
      </BaseCardRow>
    </BaseCard>

    <BaseCard class="mb-3">
      <BaseCardRow>
        Row 1
      </BaseCardRow>
      <BaseCardRow>
        Row 2
      </BaseCardRow>
    </BaseCard>

    <BaseCard class="mb-3">
      <BaseCardRow size="xs">
        Row (xs)
      </BaseCardRow>
      <BaseCardRow size="sm">
        Row (sm)
      </BaseCardRow>
      <BaseCardRow size="base">
        Row (base)
      </BaseCardRow>
      <BaseCardRow size="lg">
        Row (lg)
      </BaseCardRow>
    </BaseCard>

    <BaseCard :clipped="false" class="mb-3">
      <div class="p-5 bg-slate-300">Not clipped</div>
    </BaseCard>

    <BaseCard clipped class="mb-3">
      <div class="p-5 bg-slate-300">Clipped</div>
    </BaseCard>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
