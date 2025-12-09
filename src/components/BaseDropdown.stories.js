import BaseBadge from './BaseBadge.vue';
import BaseAutocomplete from './BaseAutocomplete.vue';
import BaseModalCenter from './BaseModalCenter.vue';
import BaseDropdown from './BaseDropdown.vue';
import BaseDatePicker from './BaseDatePicker.vue';
import BaseClickOutside from './BaseClickOutside.vue';
import { options } from '../../.storybook/utils';

const items = [];

for (let i = 0; i < 100; i++) {
  items.push({
    label: `Item number #${i + 1}`,
  });
}

export default {
  title: 'Components/BaseDropdown',
  component: BaseDropdown,
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
  },
};

const Template = (args) => ({
  components: { BaseDropdown },
  setup() {
    const maxHeight = ref(200);
    setInterval(() => {
      maxHeight.value = Math.floor(Math.random() * 200) + 100;
    }, 1000);
    return { args, items, maxHeight };
  },
  template: `
  <div style="height: 1000px; margin-top: 300px;">
    <div style="height: 70px; overflow: hidden; position: relative; display: inline-block;">
      <BaseDropdown v-bind="args">
        <template #button>
          <div class="btn btn-primary">Click me</div>
        </template>
        <template #dropdown>
          <div 
            class="bg-white shadow py-1 px-1 rounded" 
            style="max-height: 200px; overflow: auto;" 
            :style="{maxHeight: maxHeight + 'px'}"
            data-scroll-lock-scrollable>
            <button type="button" v-for="item in items" :key="item.label" class="block text-sm px-4 py-1.5">{{ item.label }}</button>
          </div>
        </template>
      </BaseDropdown>
    </div>
  </div>
  `,
});

export const Demo = Template.bind({});

export const Animated = Template.bind({});
Animated.args = {
  animated: true,
};

export const WithAutocomplete = (args) => ({
  components: { BaseDropdown, BaseAutocomplete, BaseBadge },
  setup() {
    const value = ref(null);
    const autocomplete = ref(null);

    function onOpen() {
      if (autocomplete.value) {
        setTimeout(() => {
          autocomplete.value.open();
        }, 1);
      }
    }

    function onClose() {
      setTimeout(() => {
        if (autocomplete.value) {
          autocomplete.value.setKeywords('');
        }
      }, 10);
    }

    function onUpdate(v, close) {
      if (v) {
        close();
      }
    }
    return { args, options, value, onOpen, onClose, onUpdate, autocomplete };
  },
  template: `
    <BaseDropdown @open="onOpen" @close="onClose" v-bind="args">
      <template #button>
        <BaseBadge>{{ value ? value.label : 'Select a Character' }}</BaseBadge>
      </template>
      <template #dropdown="{close}">
        <div class="bg-white shadow border border-slate-300 py-1 px-1 rounded" style="min-width: 250px">
          <BaseAutocomplete
            ref="autocomplete"
            required
            v-model="value"
            label-key="label" 
            value-key="value" 
            size="xs"
            :options="options"
            :inline="true"
            :visibleFocus="false"
            dropdownShow="always"
            :showModelValue="false"
            @update:modelValue="onUpdate($event, close)"
          ></BaseAutocomplete>
        </div>
      </template>
    </BaseDropdown>
  `,
});

WithAutocomplete.args = {
  animated: true,
  placement: 'bottom-start',
  padding: 3,
};

export const ModalWithScroll = (args) => ({
  components: { BaseDropdown, BaseModalCenter },
  setup() {
    return { args, items };
  },
  template: `
  <BaseModalCenter :model-value="true">
    <div class="p-10 bg-white">
      <BaseDropdown v-bind="args">
        <template #button>
          <div class="btn btn-primary">Click me</div>
        </template>
        <template #dropdown>
          <div 
            class="bg-white shadow py-1 px-1 rounded" 
            style="max-height: 200px; overflow: auto;" 
            data-scroll-lock-scrollable>
            <button type="button" v-for="item in items" :key="item.label" class="block text-sm px-4 py-1.5">{{ item.label }}</button>
          </div>
        </template>
      </BaseDropdown>

      <div style="height: 3000px;"></div>
    </div>
  </BaseModalCenter>
  `,
});

export const WithDatePicker = (args) => ({
  components: { BaseDropdown, BaseDatePicker },
  setup() {
    const date = ref('2022-01-01');
    return { args, items, date };
  },
  template: `
  <BaseDropdown v-bind="args">
    <template #button>
      <div class="btn btn-primary">Click me</div>
    </template>
    <template #dropdown>
      <div class="bg-white shadow-lg rounded border p-2">
        <BaseDatePicker v-model="date" inline></BaseDatePicker>
      </div>
    </template>
  </BaseDropdown>
  `,
});

WithDatePicker.args = {
  placement: 'bottom-start',
};

export const WithinClickOutside = (args) => ({
  components: { BaseDropdown, BaseClickOutside },
  setup() {
    function onClickOutside() {
      alert('click outside');
    }
    return { args, items, onClickOutside };
  },
  template: `
  <BaseClickOutside @clickOutside="onClickOutside">
    <div class="bg-slate-200 shadow-md min-h-[100px] p-3">
      <BaseDropdown v-bind="args">
        <template #button>
          <div class="btn btn-primary">Click me</div>
        </template>
        <template #dropdown>
          <div class="bg-white shadow-lg rounded border p-2 w-[260px]">
            ...
          </div>
        </template>
      </BaseDropdown>
    </div>
  </BaseClickOutside>
  `,
});
