import { createFieldStory, options } from '../../.storybook/utils';
import BaseAutocomplete from './BaseAutocomplete.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { computed } from 'vue';

const sizes = ['xs', 'sm', 'base'];

export default {
  title: 'Form/BaseAutocomplete',
  component: BaseAutocomplete,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: sizes,
      },
    },
    dropdownShow: {
      control: {
        type: 'select',
        options: ['always', 'focus'],
      },
    },
  },
  args: {
    labelKey: 'label',
    valueKey: 'value',
    options: options,
  },
  decorators: [() => ({ template: '<div class="mb-36"><story/></div>' })],
};

const Template = (args) => ({
  components: { BaseAutocomplete, ShowValue },
  setup() {
    const value = ref(options[2]);
    return { args, value };
  },
  template: `
    <BaseAutocomplete v-model="value" v-bind="args"></BaseAutocomplete>
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
  options: [],
  disabled: true,
  modelValue: { label: 'Dark Maul', value: '1' },
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
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
  components: { BaseAutocomplete },
  setup() {
    const value = ref(null);
    return { args, sizes, value };
  },
  template: `
  <div v-for="size in sizes" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ size }}</p>
    <BaseAutocomplete v-model="value" v-bind="args" :size="size"></BaseAutocomplete>
  </div>
  `,
});

export const SlotOption = (args) => ({
  components: { BaseAutocomplete },
  setup() {
    const value = ref(null);

    const options = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
      { label: 'Gray', value: 'gray' },
    ];

    return { value, options, args };
  },
  template: `
<BaseAutocomplete
  v-bind="args"
  v-model="value"
  :options="options"
>
  <template #option="{ option, active, selected }">
    <div
      class="rounded px-2 font-semibold py-1 text-sm"
      :class="{
        'hover:bg-slate-100': !active && !selected,
        'bg-slate-200 hover:bg-slate-300': active && !selected,
        'bg-blue-500 text-white hover:bg-blue-600': !active && selected,
        'bg-blue-600 text-white hover:bg-blue-700': active && selected,
      }"
      :style="{ color: selected ? '' : option.value }"
    >
      {{ option.label }}
    </div>
  </template>
</BaseAutocomplete>
`,
});

export const SlotFooter = (args) => {
  return {
    components: { BaseAutocomplete },
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
  <BaseAutocomplete
    v-model="value"
    v-bind="args" 
  >
    <template #footer>
      <div class="text-center p-2 border-t">
        <button @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
      </div>
    </template>
  </BaseAutocomplete>
`,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: { BaseAutocomplete },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
  <BaseAutocomplete
    v-model="value"
    v-bind="args"
    :options="[]"
  >
    <template #empty>
      <div class="text-center p-6 py-10 flex items-center justify-center">🤓🤓🤓</div>
    </template>
  </BaseAutocomplete>
`,
  };
};

export const WithSelect = (args) => {
  return {
    components: { BaseAutocomplete, ShowValue },
    setup() {
      const value = ref(options[0]);
      const selected = ref(null);

      const select = {
        options: [
          { label: 'All', value: 'all' },
          { label: 'Jedi', value: 'jedi' },
          { label: 'Sith', value: 'sith' },
        ],
        labelKey: 'label',
        valueKey: 'value',
        onChange: (option) => {
          selected.value = option.value;
        },
      };

      const options2 = computed(() => {
        if (selected.value == 'all' || !selected.value) {
          return options;
        }
        return options.filter((option) => option.type === selected.value);
      });

      return { args, value, options2, selected, select };
    },
    template: `
  <BaseAutocomplete
    v-model="value"
    v-bind="args"
    :options="options2"
    :select="select"
  >
  </BaseAutocomplete>

  <div class="mb-2"></div>

  <p class="text-xs mb-0">Selection</p>
  <ShowValue class="mt-0 mb-2" :value="selected" />
  
  <p class="text-xs mb-0">Model Value</p>
  <ShowValue class="mt-0" :value="value" />
`,
  };
};

export const Field = createFieldStory({
  component: BaseAutocomplete,
  componentName: 'BaseAutocomplete',
  label: 'Article',
});
