import BaseContainer from './BaseContainer.vue';
import BasePanel from './BasePanel.vue';
import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';
import BaseInputLabel from './BaseInputLabel.vue';
import BaseInput from './BaseInput.vue';

export default {
  title: 'Layout/BasePanel',
  component: BasePanel,
  args: {
    title: 'General information',
    description:
      'Enter general user information, name and age. User must be more than 10 years old to participate.',
  },
};

const Template = (args) => ({
  components: {
    BaseContainer,
    BasePanel,
    BaseCard,
    BaseCardRow,
    BaseInputLabel,
    BaseInput,
  },
  setup() {
    return { args };
  },
  template: `
  <div class="bg-slate-100 py-10">
    <BaseContainer>
      <BasePanel v-bind="args">
        <BaseCard>
          <BaseCardRow>
            <div class="mb-4">
              <BaseInputLabel label="Name" />
              <BaseInput name="name" class="w-full" placeholder="Enter you name" />
            </div>

            <div class="mb-4">
              <BaseInputLabel label="Age" />
              <BaseInput name="age" class="w-full" placeholder="Enter you age" />
            </div>

            <button class="btn btn-primary mt-2">Submit</button>
          </BaseCardRow>
        </BaseCard>
      </BasePanel>
    </BaseContainer>
  </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
