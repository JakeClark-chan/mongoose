import BaseBadge from './BaseBadge.vue';
import BaseDropdownAutocomplete from './BaseDropdownAutocomplete.vue';
import ShowValue from '@/../.storybook/components/ShowValue.vue';
import { options } from '../../.storybook/utils';

export default {
  title: 'Components/BaseDropdownAutocomplete',
  component: BaseDropdownAutocomplete,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      },
    },
  },
  args: {
    placement: 'bottom-start',
    padding: 8,
    emptyOptionLabel: 'Nothing',
  },
};

export const Autocomplete = (args) => ({
  components: { BaseDropdownAutocomplete, BaseBadge, ShowValue },
  setup() {
    const value = ref(null);
    return { args, options, value };
  },
  template: `
  <BaseDropdownAutocomplete 
    v-bind="args"
    v-model="value"
  >
    <template #button="{ newValue }">
      <BaseBadge v-if="newValue">
        {{ newValue.label }}
      </BaseBadge>
      <div v-else>
        <BaseBadge contrast="low">
          Nothing
        </BaseBadge>
      </div>
    </template>
    <template #option="{ option }">
      <BaseBadge :contrast="option?.value ? 'high' : 'low'">
        {{ option.label }}
      </BaseBadge>
    </template>
  </BaseDropdownAutocomplete>
  <ShowValue :value="value" />
  `,
});

Autocomplete.args = {
  options: options,
  multiple: false,
  labelKey: 'label',
  valueKey: 'value',
  select: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
    ],
    labelKey: 'label',
    valueKey: 'value',
  },
};

export const AutocompleteFetch = (args) => ({
  components: { BaseDropdownAutocomplete, BaseBadge, ShowValue },
  setup() {
    const value = ref(null);
    return { args, options, value };
  },
  template: `
  <BaseDropdownAutocomplete 
    v-bind="args"
    v-model="value"
  >
    <template #button="{ newValue }">
      <BaseBadge v-if="newValue" contrast="high">
        {{ newValue.name }}
      </BaseBadge>
      <div v-else>
        <BaseBadge contrast="low">
          Nothing
        </BaseBadge>
      </div>
    </template>
    <template #option="{ option }">
      <BaseBadge :contrast="option?.id ? 'high' : 'low'">
        {{ option.name }}
      </BaseBadge>
    </template>
  </BaseDropdownAutocomplete>
  <ShowValue :value="value" />
  `,
});

AutocompleteFetch.args = {
  valueKey: 'id',
  labelKey: 'name',
  url: 'https://effettandem.com/api/content/tags',
  multiple: false,
};

export const TagAutocomplete = (args) => ({
  components: { BaseDropdownAutocomplete, BaseBadge, ShowValue },
  setup() {
    const value = ref([]);
    return { args, options, value };
  },
  template: `
  <BaseDropdownAutocomplete 
    v-bind="args"
    v-model="value"
  >
    <template #button="{ newValue }">
      <div v-if="newValue && newValue.length" class="flex flex-wrap gap-0.5">
        <BaseBadge v-for="item in newValue" :key="item.value" contrast="high">
          {{ item.label }}
        </BaseBadge>
      </div>
      <div v-else>
        <BaseBadge contrast="low">
          Nothing
        </BaseBadge>
      </div>
    </template>
    <template #option="{ option }">
      <BaseBadge contrast="high">
        {{ option.label }}
      </BaseBadge>
    </template>
  </BaseDropdownAutocomplete>
  <ShowValue :value="value" />
  `,
});

TagAutocomplete.args = {
  options: options,
  multiple: true,
  labelKey: 'label',
  valueKey: 'value',
};

export const TagAutocompleteFetch = (args) => ({
  components: { BaseDropdownAutocomplete, BaseBadge, ShowValue },
  setup() {
    const value = ref([]);
    return { args, options, value };
  },
  template: `
  <BaseDropdownAutocomplete 
    v-bind="args"
    v-model="value"
  >
    <template #button="{ newValue }">
      <div v-if="newValue && newValue.length" class="flex flex-wrap gap-0.5">
        <BaseBadge v-for="item in newValue" :key="item.value" contrast="high">
          {{ item.name }}
        </BaseBadge>
      </div>
      <div v-else>
        <BaseBadge contrast="low">
          Nothing
        </BaseBadge>
      </div>
    </template>
    <template #option="{ option }">
      <BaseBadge contrast="high">
        {{ option.name }}
      </BaseBadge>
    </template>
  </BaseDropdownAutocomplete>
  <ShowValue :value="value" />
  `,
});

TagAutocompleteFetch.args = {
  valueKey: 'id',
  labelKey: 'name',
  url: 'https://effettandem.com/api/content/tags',
  multiple: true,
};
