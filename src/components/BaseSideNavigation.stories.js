import BaseSideNavigation from './BaseSideNavigation.vue';
import BaseSideNavigationItem from './BaseSideNavigationItem.vue';
import BaseContainer from './BaseContainer.vue';
import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';

export default {
  title: 'Layout/BaseSideNavigation',
  component: BaseSideNavigation,
  args: {},
};

const Template = (args) => ({
  components: {
    BaseSideNavigation,
    BaseSideNavigationItem,
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
      <div class="md:flex">
        <div class="shrink-0 mb-6 md:mb-0" style="margin-right: 2rem; width: 200px;">
          <BaseSideNavigation v-bind="args">
            <BaseSideNavigationItem to="/">
              Home
            </BaseSideNavigationItem>
            <BaseSideNavigationItem to="/setup">
              Setup
            </BaseSideNavigationItem>
            <BaseSideNavigationItem to="/settings">
              Settings
            </BaseSideNavigationItem>
          </BaseSideNavigation>
        </div>
        <div class="grow">
          <BaseCard>
            <BaseCardRow>
              {{ $route.path }}
            </BaseCardRow>
          </BaseCard>
        </div>
      </div>
    </BaseContainer>
  </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
