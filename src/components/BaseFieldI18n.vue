<template>
  <div :data-name="nameInternal">
    <div class="space-y-2">
      <div v-for="(locale, key) in localesInternal" :key="key">
        <BaseField
          :name="`${nameInternal}.${key}`"
          :required="requiredInternal"
          :label="getLabel(locale)"
        >
          <BaseInput
            v-if="component == 'BaseInput'"
            :model-value="formattedValue[key] + ''"
            class="w-full bg-white"
            v-bind="componentProps"
            @update:model-value="onInput($event, key + '')"
          />
          <BaseTextarea
            v-else-if="component == 'BaseTextarea'"
            :model-value="formattedValue[key] + ''"
            :required="requiredInternal"
            :name="`${nameInternal}.${key}`"
            class="w-full bg-white"
            v-bind="componentProps"
            @update:model-value="onInput($event, key + '')"
          />
        </BaseField>
      </div>
    </div>
    <BaseAlert v-if="globalErrorMessage" class="mt-3" bordered color="danger">
      {{ globalErrorMessage }}
    </BaseAlert>
  </div>
</template>

<script lang="ts" setup>
import { Locales } from '@/types';
import { get, isPlainObject } from 'lodash';
import objectHash from 'object-hash';
import { PropType } from 'vue';
import { config } from '..';
import { useField } from '@/composables/field';
import BaseInput from './BaseInput.vue';
import BaseTextarea from './BaseTextarea.vue';
import BaseField from './BaseField.vue';
import BaseAlert from './BaseAlert.vue';

defineComponent({
  components: {
    BaseInput,
    BaseTextarea,
  },
});

type Value = { [locale: string]: string | number | boolean };

const props = defineProps({
  modelValue: {
    default: null,
    type: [Object, null] as PropType<Value | null>,
  },
  locales: {
    default: undefined,
    type: Object as PropType<Locales>,
  },
  component: {
    default: 'BaseInput',
    type: String as PropType<'BaseInput' | 'BaseTextarea'>,
  },
  componentProps: {
    default: undefined,
    type: Object,
  },
  defaultValue: {
    default: '',
    type: [String, Boolean, Number] as PropType<string | boolean | number>,
  },
  name: {
    default: undefined,
    type: String,
  },
  required: {
    default: false,
    type: Boolean,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  label: {
    default: undefined,
    type: String,
  },
});

const emit = defineEmits(['update:modelValue']);

const { nameInternal, requiredInternal } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const getErrorMessageByName = inject(
  'form:getErrorMessageByName',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (name: string) => {
    return null;
  }
) as (name: string) => string | null | undefined;

const colors = ref(['#10b981', '#06b6d4', '#a855f7']);

const localesInternal = computed((): Locales => {
  if (props.locales) {
    return props.locales;
  }
  return config.locales;
});

const formattedValue = computed((): Value => {
  // Get current value
  let value = {} as Value;
  if (props.modelValue && isPlainObject(props.modelValue)) {
    value = props.modelValue as Value;
  }
  // Fill missing locales
  Object.keys(localesInternal.value).forEach((locale) => {
    const currentValue = get(props.modelValue, locale);
    if (!currentValue) {
      value[locale] = props.defaultValue;
    }
  });
  return value;
});

// If formatted value is different, send event to parent
if (
  !props.modelValue ||
  objectHash(formattedValue.value) !== objectHash(props.modelValue)
) {
  const newFormattedValue = formattedValue.value;
  emit('update:modelValue', newFormattedValue);
}

function onInput(value: string, locale: string) {
  const newFormattedValue = formattedValue.value;
  newFormattedValue[locale] = value;
  emit('update:modelValue', newFormattedValue);
}

function getLabel(locale: string): string | undefined {
  if (!props.label) {
    return undefined;
  }
  return `${props.label} (${locale})`;
}

const globalErrorMessage = computed(() => {
  return getErrorMessageByName(nameInternal.value);
});
</script>
