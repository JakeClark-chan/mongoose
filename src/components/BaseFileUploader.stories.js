import BaseFileUploader from '@/components/BaseFileUploader.vue';
import BaseLoadingCover from '@/components/BaseLoadingCover.vue';
import BaseAppNotifications from '@/components/BaseAppNotifications.vue';
import { Icon as BaseIcon } from '@iconify/vue';

export default {
  title: 'Form/BaseFileUploader',
  component: BaseFileUploader,
  args: {
    buttonClass: 'w-full',
    acceptedExtensions: ['jpg', 'png'],
    maxSize: 1024 * 200, // 200kb
    url: 'https://dummyjson.com/posts/add',
  },
};

const Template = (args) => ({
  components: {
    BaseFileUploader,
    BaseIcon,
    BaseLoadingCover,
    BaseAppNotifications,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseFileUploader v-bind="args">
      <template #default="{ dragging, disabled, uploading, selecting }">
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
            <p class="text-sm text-slate-500 mt-1">Max 200kb</p>
            <p class="text-sm text-slate-500">.jpg, .png</p>
          </div>
        </div>
      </template>
      <template #loading="{ dragging, disabled, uploading, selecting }">
        <BaseLoadingCover
          :model-value="args.loading || uploading || selecting"
          :delay="0"
          icon-class="text-primary-600 w-6 h-6"
          backdrop-class="bg-white opacity-60"
        />
      </template>
    </BaseFileUploader>
    <BaseAppNotifications></BaseAppNotifications>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
