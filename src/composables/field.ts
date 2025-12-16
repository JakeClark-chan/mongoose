import { Ref } from 'vue';

interface Config {
  name: Ref<string | null | undefined>;
  required: Ref<boolean>;
  hasError: Ref<boolean | undefined>;
  emit: any;
  errorType?: string;
  labelClass?: string;
}

export function useField(config: Config) {
  const name = config.name;
  const required = config.required;
  const hasError = config.hasError;
  const emit = config.emit;
  const errorType = config.errorType ?? null;
  const labelClass = config.labelClass ?? null;

  // Injections

  const fieldRequired = inject('field:required', ref(false)) as Ref<boolean>;
  const fieldName = inject('field:name', ref('')) as Ref<string>;

  const fieldOnUpdate = inject('field:onUpdate', () => {
    return;
  }) as () => void;

  const getErrorMessageByName = inject(
    'form:getErrorMessageByName',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (name: string) => {
      return null;
    }
  ) as (name: string) => string | null | undefined;

  const setErrorType = inject(
    'field:setErrorType',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (errorType: string | null) => {
      return;
    }
  ) as (errorType: string | null) => void;

  if (errorType) {
    setErrorType(errorType);
  }

  const setLabelClass = inject(
    'field:setLabelClass',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (labelClass: string | string[]) => {
      return;
    }
  ) as (errorType: string | string[]) => void;

  if (labelClass) {
    setLabelClass(labelClass);
  }

  const disableForm = inject('form:disable', () => {
    return;
  }) as () => void;

  const enableForm = inject('form:enable', () => {
    return;
  }) as () => void;

  const requiredInternal = computed((): boolean => {
    if (required.value) {
      return required.value;
    }

    return fieldRequired.value;
  });

  const nameInternal = computed((): string => {
    if (name.value) {
      return name.value;
    }

    return fieldName.value;
  });

  const errorMessageInternal = computed((): string | null | undefined => {
    return getErrorMessageByName(nameInternal.value);
  });

  const hasErrorInternal = computed((): boolean => {
    if (hasError.value) {
      return hasError.value;
    }

    return !!errorMessageInternal.value;
  });

  function emitUpdate(value: any) {
    emit('update:modelValue', value);
    fieldOnUpdate();
  }
  return {
    requiredInternal,
    nameInternal,
    hasErrorInternal,
    errorMessageInternal,
    emitUpdate,
    enableForm,
    disableForm,
  };
}
