import BaseFilePicker from './BaseFilePicker.vue';
import { Icon as BaseIcon } from '@iconify/vue';

export default {
  title: 'Form/BaseFilePicker',
  component: BaseFilePicker,
};

const Template = (args) => ({
  components: { BaseFilePicker, BaseIcon },
  setup() {
    return { args };
  },
  template: `
    <BaseFilePicker v-bind="args">
      <template #default="{ dragging, disabled }">
        <div
          class="flex w-full items-center space-x-4 rounded-lg border-2 border-dashed border-slate-200 p-5 duration-100"
          :class="[
            dragging ? 'bg-slate-100' : 'bg-white',
            disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:bg-slate-50',
          ]"
        >
          <div class="rounded-full bg-slate-200 p-2">
            <BaseIcon
              icon="heroicons:arrow-up-on-square"
              class="h-6 w-6"
              :class="[disabled ? 'text-slate-400' : 'text-slate-500']"
            />
          </div>
          <div class="text-left">
            <p 
              class="mb-0 text-sm font-medium leading-tight" 
              :class="[disabled ? 'text-slate-400' : 'text-slate-900']"
            >
              {{ $t("sui.drop_or_click_to_upload") }}
            </p>
          </div>
        </div>
      </template>
    </BaseFilePicker>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
