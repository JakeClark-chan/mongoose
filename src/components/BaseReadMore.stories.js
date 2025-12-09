import BaseReadMore from './BaseReadMore.vue';
import BaseContainer from './BaseContainer.vue';

export default {
  title: 'Components/BaseReadMore',
  component: BaseReadMore,
  args: {},
};

const Template = (args) => ({
  components: {
    BaseReadMore,
    BaseContainer,
  },
  setup() {
    return { args };
  },
  template: `
  <BaseContainer size="3xl">
    <BaseReadMore v-bind="args">
      <p class="text-slate-600">
        Aute incididunt laborum in sint commodo reprehenderit et aliquip aliqua proident exercitation nostrud sunt. Consectetur laborum elit do non ullamco anim fugiat laboris non aliqua consequat culpa. Veniam aliquip irure et qui dolore eiusmod exercitation elit exercitation ad excepteur reprehenderit enim. Id laboris do eu amet qui Lorem excepteur. Eiusmod eiusmod est qui minim consectetur aliqua occaecat sit tempor nulla. Velit et eiusmod id ut adipisicing occaecat deserunt.Excepteur occaecat nulla deserunt Lorem eu mollit non esse. Velit do proident adipisicing labore ipsum nostrud ipsum pariatur magna. Consequat do reprehenderit eiusmod cupidatat cupidatat cupidatat reprehenderit. Aute fugiat ex fugiat in ut enim dolore est qui. Lorem irure eiusmod eiusmod cillum aute nostrud sint aute enim aute. Aliquip aliqua quis deserunt commodo fugiat incididunt sint qui proident.
      </p>
    </BaseReadMore>
  </BaseContainer>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};
