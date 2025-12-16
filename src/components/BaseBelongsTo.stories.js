import BaseBelongsTo from './BaseBelongsTo.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { options } from '@/../.storybook/utils';
import { createFieldStory } from '../../.storybook/utils';

const sizes = ['xs', 'sm', 'base'];

export default {
  title: 'Form/BaseBelongsTo',
  component: BaseBelongsTo,
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
    field: 'title',
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseBelongsTo, ShowValue },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
      <BaseBelongsTo v-model="value" v-bind="args"></BaseBelongsTo>
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

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const ShowEmptyOption = Template.bind({});
ShowEmptyOption.args = {
  showEmptyOption: true,
  emptyOptionLabel: 'No Jedi',
};

export const Sizes = (args) => ({
  components: { BaseBelongsTo },
  setup() {
    const value = ref(null);
    return { args, sizes, value };
  },
  template: `
  <div v-for="size in sizes" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ size }}</p>
    <BaseBelongsTo v-model="value" v-bind="args" :size="size"></BaseBelongsTo>
  </div>
  `,
});

export const Disabled = Template.bind({});
Disabled.args = {
  currentModel: options[0],
  primaryKey: 'value',
  field: 'label',
  disabled: true,
};

export const SlotOption = (args) => {
  return {
    components: { BaseBelongsTo },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
      <BaseBelongsTo
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
      </BaseBelongsTo>
    `,
  };
};

export const SlotFooter = (args) => {
  return {
    components: { BaseBelongsTo },
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
      <BaseBelongsTo
        v-model="value"
        v-bind="args"
      >
        <template #footer>
          <div class="text-center p-2 border-t">
            <button @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
          </div>
        </template>
      </BaseBelongsTo>
    `,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: { BaseBelongsTo },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
      <BaseBelongsTo
        v-model="value"
        v-bind="args"
      >
        <template #empty="props">
          <div>
            <div v-if="props.firstSearch" class="text-center py-10 p-6">🤓🤓🤓</div>
            <div v-else class="text-center p-6">Start your search... 🔎</div>
          </div>
        </template>
      </BaseBelongsTo>
    `,
  };
};

export const WithSelect = (args) => {
  return {
    components: { BaseBelongsTo, ShowValue },
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
  <BaseBelongsTo
    v-model="value"
    v-bind="args"
    :url="url"
    :select="select"
  >
  </BaseBelongsTo>

  <div class="mb-2"></div>

  <p class="text-xs mb-0">Selection</p>
  <ShowValue class="mt-0 mb-2" :value="selected" />
  
  <p class="text-xs mb-0">Model Value</p>
  <ShowValue class="mt-0" :value="value" />
`,
  };
};

export const Field = createFieldStory({
  component: BaseBelongsTo,
  componentName: 'BaseBelongsTo',
  label: 'Article',
});
