import BaseTabs from './BaseTabs.vue';
import BaseTabItem from './BaseTabItem.vue';
import BaseContainer from './BaseContainer.vue';
import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';

export default {
  title: 'Layout/BaseTabs',
  component: BaseTabs,
  args: {},
};

const Template = (args) => ({
  components: {
    BaseTabs,
    BaseTabItem,
    BaseContainer,
    BaseCard,
    BaseCardRow,
  },
  setup() {
    return { args };
  },
  template: `
  <div class="bg-slate-100 py-10">
    <BaseContainer>
      <BaseTabs v-bind="args">
        <BaseTabItem to="/">
          Home
        </BaseTabItem>
        <BaseTabItem to="/setup">
          Setup
        </BaseTabItem>
        <BaseTabItem to="/settings">
          Settings
        </BaseTabItem>
        <BaseTabItem to="/misc">
          Miscellaneous
        </BaseTabItem>
      </BaseTabs>
      <div class="mt-10">
        <BaseCard>
          <BaseCardRow>
            {{ $route.path }}
          </BaseCardRow>
        </BaseCard>
      </div>
    </BaseContainer>
  </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
