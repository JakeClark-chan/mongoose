import BaseBadge from './BaseBadge.vue';
import BaseDescriptionList from './BaseDescriptionList.vue';
import BaseDescriptionListItem from './BaseDescriptionListItem.vue';

export default {
  title: 'Components/BaseDescriptionList',
  component: BaseDescriptionList,
  argTypes: {},
};

const Template = (args) => ({
  components: { BaseDescriptionList, BaseDescriptionListItem, BaseBadge },
  setup() {
    return { args };
  },
  template: `
    <BaseDescriptionList v-bind="args">
      <BaseDescriptionListItem>
        <template #left>Full name</template>
        <template #right>Full name</template>
      </BaseDescriptionListItem>
      <BaseDescriptionListItem>
        <template #left>Age</template>
        <template #right>66 years old</template>
      </BaseDescriptionListItem>
      <BaseDescriptionListItem>
        <template #left>Role</template>
        <template #right><BaseBadge color="indigo">admin</BaseBadge></template>
      </BaseDescriptionListItem>
    </BaseDescriptionList>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
