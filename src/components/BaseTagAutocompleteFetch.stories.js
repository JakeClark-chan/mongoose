import BaseTagAutocompleteFetch from './BaseTagAutocompleteFetch.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory } from '../../.storybook/utils';
import BaseAppNotifications from './BaseAppNotifications.vue';

export default {
  title: 'Form/BaseTagAutocompleteFetch',
  component: BaseTagAutocompleteFetch,
  argTypes: {},
  args: {
    url: 'https://effettandem.com/api/content/articles',
    labelKey: 'title',
    valueKey: 'id',
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => {
  return {
    components: { BaseTagAutocompleteFetch, ShowValue, BaseAppNotifications },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
      <BaseTagAutocompleteFetch
        v-model="value"
        v-bind="args"
      ></BaseTagAutocompleteFetch>
      <ShowValue :value="value" />
      <BaseAppNotifications />
  `,
  };
};

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = (args) => {
  return {
    components: { BaseTagAutocompleteFetch },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `<BaseTagAutocompleteFetch
      v-bind="args"
      v-model="value"
      :disabled="true"
    ></BaseTagAutocompleteFetch>`,
  };
};

export const Maximum = Template.bind({});
Maximum.args = {
  max: 3,
};

export const SlotOption = (args) => {
  return {
    components: { BaseTagAutocompleteFetch },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
  <div class="mb-20">
    <BaseTagAutocompleteFetch
      v-model="value"
      v-bind="args"
    >
      <template #option="{ option, active, selected }">
        <div
          class="rounded px-2 py-1"
          :class="{
            'hover:bg-slate-100': !active && !selected,
            'bg-slate-200 hover:bg-slate-300': active && !selected,
            'bg-blue-500 text-white hover:bg-blue-600': !active && selected,
            'bg-blue-600 text-white hover:bg-blue-700': active && selected,
          }"
        >
          <p class="text-sm font-medium">{{ option.title }}</p>
          <p class="opacity-60 text-xs">{{ option.owner?.name }}</p>
        </div>
      </template>
    </BaseTagAutocompleteFetch>
  </div>
  `,
  };
};

export const SlotFooter = (args) => {
  return {
    components: { BaseTagAutocompleteFetch },
    setup() {
      const value = ref([]);
      function onClick() {
        setTimeout(() => {
          alert(1);
        }, 300);
      }
      return { args, value, onClick };
    },
    template: `
    <BaseTagAutocompleteFetch
      v-model="value"
      v-bind="args"
    >
      <template #footer>
        <div class="text-center p-2 border-t">
          <button type="button" @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
        </div>
      </template>
    </BaseTagAutocompleteFetch>
  `,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: { BaseTagAutocompleteFetch },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
    <BaseTagAutocompleteFetch
      v-model="value"
      v-bind="args"
    >
      <template #empty="props">
        <div>
          <div v-if="props.firstSearch" class="text-center py-10 p-6">🤓🤓🤓</div>
          <div v-else class="text-center px-6 py-20">Start your search... 🔎</div>
        </div>
      </template>
    </BaseTagAutocompleteFetch>
  `,
  };
};

export const Field = createFieldStory({
  component: BaseTagAutocompleteFetch,
  componentName: 'BaseTagAutocompleteFetch',
  label: 'Name',
});
