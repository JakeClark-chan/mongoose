import { createFieldStory, options } from '../../.storybook/utils';
import BaseTagAutocomplete from './BaseTagAutocomplete.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import BaseAppNotifications from './BaseAppNotifications.vue';

const sizes = ['xs', 'sm', 'base'];

export default {
  title: 'Form/BaseTagAutocomplete',
  component: BaseTagAutocomplete,
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
  components: { BaseTagAutocomplete, ShowValue, BaseAppNotifications },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: `
    <BaseTagAutocomplete v-model="value" v-bind="args"></BaseTagAutocomplete>
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
  options: options,
  disabled: true,
  modelValue: [options[0]],
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const Sizes = (args) => ({
  components: { BaseTagAutocomplete },
  setup() {
    const value = ref([]);
    return { args, sizes, value };
  },
  template: `
  <div v-for="size in sizes" class="mb-1">
    <p class="text-xs text-slate-600 leading-tight">{{ size }}</p>
    <BaseTagAutocomplete v-model="value" v-bind="args" :size="size"></BaseTagAutocomplete>
  </div>
  `,
});

export const SlotOption = (args) => ({
  components: { BaseTagAutocomplete, ShowValue, BaseAppNotifications },
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
  <BaseTagAutocomplete
    v-bind="args"
    v-model="value"
    :options="options"
  >
    <template #option="{ option, active }">
      <div
        class="rounded px-2 font-semibold py-1 text-sm"
        :class="{
          'hover:bg-slate-100': !active,
          'bg-slate-200 hover:bg-slate-300': active,
        }"
        :style="{ color: option.value }"
      >
        {{ option.label }}
      </div>
    </template>
  </BaseTagAutocomplete>
  `,
});

export const SlotFooter = (args) => {
  return {
    components: { BaseTagAutocomplete, ShowValue, BaseAppNotifications },
    setup() {
      const value = ref(null);
      function onClick() {
        setTimeout(() => {
          alert(1);
        }, 300);
      }
      return { args, value, onClick };
    },
    template: `
    <BaseTagAutocomplete
      v-model="value"
      v-bind="args" 
    >
      <template #footer>
        <div class="text-center p-2 border-t">
          <button type="button" @click=onClick class="btn btn-sm w-full btn-slate-200-outline">This is the footer 💯</button>
        </div>
      </template>
    </BaseTagAutocomplete>
  `,
  };
};

export const SlotEmpty = (args) => {
  return {
    components: { BaseTagAutocomplete, ShowValue, BaseAppNotifications },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `
    <BaseTagAutocomplete
      v-model="value"
      v-bind="args"
      :options="[]"
    >
      <template #empty>
        <div class="text-center p-6 py-10 flex items-center justify-center">🤓🤓🤓</div>
      </template>
    </BaseTagAutocomplete>
  `,
  };
};

export const Field = createFieldStory({
  component: BaseTagAutocomplete,
  componentName: 'BaseTagAutocomplete',
  label: 'Name',
});
