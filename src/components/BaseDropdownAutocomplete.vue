<template>
  <BaseDropdown
    :animated="true"
    :keep-alive="false"
    :placement="placement"
    :padding="padding"
    @open="onOpen"
    @close="onClose"
  >
    <template #button="buttonProps">
      <slot name="button" v-bind="buttonProps" :new-value="newValue"></slot>
    </template>
    <template #dropdown="{ close }">
      <div
        class="inline-block w-[320px] overflow-hidden rounded-md border border-slate-300 bg-white px-1 pt-1 shadow-lg"
      >
        <component
          :is="componentName"
          ref="autocomplete"
          :model-value="newValue"
          :size="size"
          v-bind="autocompleteProps"
          :label-key="labelKey"
          :value-key="valueKey"
          :inline="true"
          :required="required"
          :select="select"
          dropdown-show="always"
          @update:model-value="onUpdate($event, close)"
        >
          <template #option="optionProps">
            <div
              :class="[optionProps.active ? 'bg-slate-100' : 'bg-white']"
              class="mb-px flex items-center rounded py-1 px-1"
            >
              <div class="flex grow items-center">
                <slot
                  name="option"
                  :option="optionProps.option"
                  :active="optionProps.active"
                  :size="size"
                ></slot>
              </div>
              <div class="shrink-0">
                <BaseIcon
                  v-if="
                    (optionProps.selected ?? false) ||
                    (optionProps.option[valueKey] == null && newValue == null)
                  "
                  icon="mdi:check-bold"
                  class="h-4 w-4 text-slate-500"
                ></BaseIcon>
              </div>
            </div>
          </template>
        </component>
      </div>
    </template>
  </BaseDropdown>
</template>

<script lang="ts" setup>
import { isArray } from 'lodash';
import { PropType } from 'vue';
import { Option, SelectConfiguration } from '@/types';
import BaseDropdown from './BaseDropdown.vue';
import BaseAutocomplete from './BaseAutocomplete.vue';
import BaseAutocompleteFetch from './BaseAutocompleteFetch.vue';
import BaseTagAutocomplete from './BaseTagAutocomplete.vue';
import BaseTagAutocompleteFetch from './BaseTagAutocompleteFetch.vue';

const props = defineProps({
  modelValue: {
    type: [Array, Object, null, undefined] as PropType<
      Option[] | Option | null | undefined
    >,
    default: undefined,
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  url: {
    type: String as PropType<string>,
    default: undefined,
  },
  options: {
    type: Array as PropType<Option[] | undefined>,
    default: undefined,
  },
  labelKey: {
    default: 'name',
    type: String,
  },
  valueKey: {
    default: 'id',
    type: String,
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'base'>,
    default: 'sm',
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  emptyOptionLabel: {
    default: undefined,
    type: String,
  },
  placement: {
    type: String as PropType<
      'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    >,
    default: undefined,
  },
  padding: {
    default: undefined,
    type: Number,
  },
  select: {
    default: undefined,
    type: [Object, undefined] as PropType<SelectConfiguration | undefined>,
  },
});

const emit = defineEmits(['update:model-value', 'close']);

const componentName = computed(() => {
  if (props.multiple) {
    if (props.url) {
      return BaseTagAutocompleteFetch;
    }
    if (props.options) {
      return BaseTagAutocomplete;
    }
    console.error('BaseDropdownAutocomplete: options or url is required');
    return;
  }

  if (props.url) {
    return BaseAutocompleteFetch;
  }
  if (props.options) {
    return BaseAutocomplete;
  }
  console.error('BaseDropdownAutocomplete: options or url is required');
});

const autocomplete = ref<any>(null);

const newValue = ref<any>(null);

const autocompleteProps = computed(() => {
  const newProps = {} as any;

  if (props.url) {
    newProps.url = props.url;
  } else {
    newProps.options = props.options ?? [];
  }

  if (!props.multiple) {
    newProps.showModelValue = false;
    newProps.showEmptyOption = true;
    newProps.emptyOptionLabel = props.emptyOptionLabel;
  }

  return newProps;
});

watch(
  () => props.modelValue,
  (modelValue) => {
    newValue.value = modelValue ?? null;
  },
  { immediate: true, deep: true }
);

function onOpen() {
  nextTick(() => {
    setTimeout(() => {
      autocomplete.value?.open();
    }, 1);
  });
}

function onClose() {
  nextTick(() => {
    setTimeout(() => {
      autocomplete.value?.setKeywords('');
    }, 1);
  });

  emit('close');
}

function onUpdate(
  value: Option | Option[] | null | undefined,
  close: () => void
) {
  newValue.value = getNewValue(value);

  update();

  if (!props.multiple) {
    close();
  }
}

function getNewValue(value: Option | Option[] | null | undefined) {
  if (isArray(value)) {
    return value;
  }

  if (value == null) {
    return null;
  }

  if (value[props.valueKey] ?? null) {
    return value;
  }

  return null;
}

function update() {
  emit('update:model-value', newValue.value);
}
</script>
