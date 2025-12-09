<template>
  <div :data-name="name">
    <BaseInputLabel
      v-if="labelNormalized"
      :label="labelNormalized"
      :required="required"
      :class="labelClassInternal"
    />
    <slot></slot>
    <template v-if="errorMessage">
      <BaseInputError v-if="errorTypeInternal == 'default'" class="mt-1">
        {{ errorMessage }}
      </BaseInputError>
      <BaseAlert
        v-else-if="errorTypeInternal == 'alert'"
        bordered
        color="danger"
        class="mt-4"
      >
        {{ errorMessage }}
      </BaseAlert>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import BaseAlert from './BaseAlert.vue';
import BaseInputError from './BaseInputError.vue';
import BaseInputLabel from './BaseInputLabel.vue';

const props = defineProps({
  name: {
    default: '',
    type: String,
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorType: {
    type: String as PropType<'default' | 'alert'>,
    default: 'default',
  },
  labelClass: {
    default: '',
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, boolean>
    >,
  },
});

const errorTypeInternal = ref(props.errorType);

function setErrorType(errorType: 'default' | 'alert' | null) {
  if (errorType != null) {
    errorTypeInternal.value = errorType;
  }
}

const labelClassInternal = ref(props.labelClass);

function setLabelClass(
  labelClass: string | string[] | Record<string, boolean> | null
) {
  if (labelClass != null) {
    labelClassInternal.value = labelClass;
  }
}

const getErrorMessageByName = inject(
  'form:getErrorMessageByName',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (name: string) => {
    return null;
  }
) as (name: string) => string | null | undefined;

const clearErrors = inject('form:clearErrors', () => {
  return;
}) as () => void;

function fieldOnUpdate() {
  clearErrors();
}

const labelNormalized = computed((): string | null => {
  if (props.label) {
    return props.label;
  }

  return null;
});

const errorMessage = computed((): string | null | undefined => {
  return getErrorMessageByName(props.name);
});

provide('field:name', readonly(ref(props.name)));
provide('field:required', readonly(ref(props.required)));
provide('field:onUpdate', fieldOnUpdate);
provide('field:errorMessage', errorMessage);
provide('field:setErrorType', setErrorType);
provide('field:setLabelClass', setLabelClass);
</script>
