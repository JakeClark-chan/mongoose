import BaseAutocompleteFetch from './BaseAutocompleteFetch.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { options } from '@/../.storybook/utils';
import { createFieldStory } from '../../.storybook/utils';

const sizes = ['xs', 'sm', 'base'];

export default {
  title: 'Form/BaseAutocompleteFetch',
  component: BaseAutocompleteFetch,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: sizes,
      },
    },
  },
  args: {
    url: 'https://effettandem.com/api/content/articles',
    labelKey: 'title',
    valueKey: 'id',
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseAutocompleteFetch, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
      <BaseAutocompleteFetch v-model="value" v-bind="args"></BaseAutocompleteFetch>
      <ShowValue :value="value" />
    `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const AlwaysShowDropdown = Template.bind({});
AlwaysShowDropdown.args = {
  inline: true,
  dropdownShow: 'always',
};

export const NoFocus = Template.bind({});
NoFocus.args = {
  visibleFocus: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  labelKey: 'label',
  valueKey: 'value',
  modelValue: options[0],
  disabled: true,
};

export const ShowEmptyOption = Template.bind({});
ShowEmptyOption.args = {
  showEmptyOption: true,
  emptyOptionLabel: 'No Jedi',
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const Sizes = (args) => ({
  components: { BaseAutocompleteFetch },
  setup() {
    const value = ref(null);
    return { args, sizes, value };
  },
  template: `
  <div v-for="size in sizes" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ size }}</p>
    <BaseAutocompleteFetch v-model="value" v-bind="args" :size="size"></BaseAutocompleteFetch>
  </div>
  `,
});

export const SlotOption = (args) => {
  return {
    components: { BaseAutocompleteFetch },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
      <BaseAutocompleteFetch
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
      </BaseAutocompleteFetch>
    `,
  };
};

export const SlotFooter = (args) => {
  return {
    components: { BaseAutocompleteFetch },
    setup() {
      const value = ref(null);
      function onClick() {
        setTimeout(() => {
          alert(1);
        }, 150);
      }
      return { args, value, onClick };
    },
    template: `
      <BaseAutocompleteFetch
        v-model="value"
        v-bind="args"
      >
        <template #footer>
          <div class="text-center p-2 border-t">
            <button @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
          </div>
        </template>
      </BaseAutocompleteFetch>
    `,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: { BaseAutocompleteFetch },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
      <BaseAutocompleteFetch
        v-model="value"
        v-bind="args"
      >
        <template #empty="props">
          <div>
            <div v-if="props.firstSearch" class="text-center py-10 p-6">🤓🤓🤓</div>
            <div v-else class="text-center p-6">Start your search... 🔎</div>
          </div>
        </template>
      </BaseAutocompleteFetch>
    `,
  };
};

export const WithSelect = (args) => {
  return {
    components: { BaseAutocompleteFetch, ShowValue },
    setup() {
      const value = ref(options[0]);
      const selected = ref(null);

      const select = {
        options: [
          { label: 'All', value: 'all' },
          { label: 'Video', value: 'video' },
          { label: 'Article', value: 'article' },
        ],
        labelKey: 'label',
        valueKey: 'value',
        onChange: (option) => {
          selected.value = option.value;
        },
      };

      const url = computed(() => {
        if (selected.value == 'all' || !selected.value) {
          return 'https://effettandem.com/api/content/articles';
        }
        return (
          'https://effettandem.com/api/content/articles' +
          '?type=' +
          selected.value
        );
      });

      return { args, value, url, selected, select };
    },
    template: `
  <BaseAutocompleteFetch
    v-model="value"
    v-bind="args"
    :url="url"
    :select="select"
  >
  </BaseAutocompleteFetch>

  <div class="mb-2"></div>

  <p class="text-xs mb-0">Selection</p>
  <ShowValue class="mt-0 mb-2" :value="selected" />
  
  <p class="text-xs mb-0">Model Value</p>
  <ShowValue class="mt-0" :value="value" />
`,
  };
};

export const Field = createFieldStory({
  component: BaseAutocompleteFetch,
  componentName: 'BaseAutocompleteFetch',
  label: 'Article',
});
