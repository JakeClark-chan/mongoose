import BaseModalCenter from './BaseModalCenter.vue';
import { Icon as BaseIcon } from '@iconify/vue';
import BaseAvatar from './BaseAvatar.vue';

export default {
  title: 'Components/BaseModalCenter',
  component: BaseModalCenter,
  args: {
    position: 'bottom-right',
  },
  argTypes: {
    verticalAlign: {
      control: { type: 'select' },
      options: ['center', 'top'],
    },
  },
};

const Template = (args) => ({
  components: {
    BaseModalCenter,
    BaseIcon,
    BaseAvatar,
  },
  setup() {
    const show = ref(false);
    return { args, show };
  },
  template: `
    <div class="">
      <button @click="show = true" class="btn">Show modal</button>
      <BaseModalCenter v-model="show" v-bind="args">
        <template #default="{close}">
          <div class="p-8">
            <h2 class="font-semibold text-lg mb-6">This is a center modal</h2>

            <p v-for="i in 10" :key="i" class="mb-3 text-slate-600">Ipsum magna irure aliquip aute adipisicing Lorem non commodo amet. Est labore dolor laboris sint est magna quis fugiat id cillum deserunt cupidatat veniam. Exercitation dolore consequat labore deserunt laboris id. In laborum ea irure amet esse commodo et deserunt do officia et. Nulla incididunt est laboris pariatur ad duis ad reprehenderit voluptate. Tempor consectetur magna eiusmod incididunt.</p>

            <button @click="close" class="btn mt-4">Close</button>
          </div>
        </template>
      </BaseModalCenter>
    </div>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const VerticalAlignTop = Template.bind({});
VerticalAlignTop.args = {
  verticalAlign: 'top',
};

export const NoCloseButton = Template.bind({});
NoCloseButton.args = {
  showCloseButton: false,
};

export const CustomBackdropClass = Template.bind({});
CustomBackdropClass.args = {
  backdropClass: 'bg-red-500 bg-opacity-70',
};

export const PreventLeave = Template.bind({});
PreventLeave.args = {
  closeOnOutsideClick: false,
};
