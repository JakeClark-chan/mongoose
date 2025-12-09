import BaseHasMany from './BaseHasMany.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { createFieldStory, options } from '../../.storybook/utils';
import BaseAppNotifications from './BaseAppNotifications.vue';

export default {
  title: 'Form/BaseHasMany',
  component: BaseHasMany,
  argTypes: {},
  args: {
    url: 'https://effettandem.com/api/content/articles',
    field: 'title',
    primaryKey: 'id',
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => {
  return {
    components: { BaseHasMany, ShowValue, BaseAppNotifications },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
      <BaseHasMany
        v-model="value"
        v-bind="args"
      ></BaseHasMany>
      <ShowValue :value="value" />
      <BaseAppNotifications />
  `,
  };
};

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = (args) => {
  return {
    components: { BaseHasMany },
    setup() {
      const value = ref([]);
      const currentModel = options[0];
      return { args, value, currentModel };
    },
    template: `<BaseHasMany
      v-bind="args"
      v-model="value"
      :current-models="[currentModel]"
      :disabled="true"
      primaryKey="value"
      field="label"
    ></BaseHasMany>`,
  };
};

export const Maximum = Template.bind({});
Maximum.args = {
  max: 3,
};

export const SlotOption = (args) => {
  return {
    components: {},
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
  <div class="mb-20">
    <BaseHasMany
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
    </BaseHasMany>
  </div>
  `,
  };
};

export const SlotFooter = (args) => {
  return {
    components: {},
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
    <BaseHasMany
      v-model="value"
      v-bind="args"
    >
      <template #footer>
        <div class="text-center p-2 border-t">
          <button type="button" @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
        </div>
      </template>
    </BaseHasMany>
  `,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: {},
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
    <BaseHasMany
      v-model="value"
      v-bind="args"
    >
      <template #empty="props">
        <div>
          <div v-if="props.firstSearch" class="text-center py-10 p-6">🤓🤓🤓</div>
          <div v-else class="text-center px-6 py-20">Start your search... 🔎</div>
        </div>
      </template>
    </BaseHasMany>
  `,
  };
};

export const Field = createFieldStory({
  component: BaseHasMany,
  componentName: 'BaseHasMany',
  label: 'Name',
});
