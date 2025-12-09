import { Ref } from 'vue';
import { NormalizedOption, Option } from '@/types';
import { isArray, isObject } from 'lodash';

export function useHasOptions(
  modelValue: Ref<Option[] | Option | null | undefined>,
  options: Ref<Option[]>,
  labelKey: Ref<string>,
  valueKey: Ref<string>,
  multiple: Ref<boolean> = ref(false)
) {
  const normalizedModelValue = computed(
    (): NormalizedOption[] | NormalizedOption | null => {
      if (multiple.value) {
        if (!isArray(modelValue.value)) {
          return [];
        }
        return modelValue.value.map((option) => {
          return {
            label: option[labelKey.value] as string,
            value: option[valueKey.value] as string | number,
            option: option,
          } as NormalizedOption;
        });
      } else {
        if (!isObject(modelValue.value)) {
          return null;
        }

        return {
          label: modelValue.value[labelKey.value as never] as string,
          value: modelValue.value[valueKey.value as never] as string | number,
          option: modelValue.value,
        } as NormalizedOption;
      }
    }
  );

  const normalizedOptions = computed((): NormalizedOption[] => {
    return options.value.map((option) => {
      return {
        label: option[labelKey.value] as string,
        value: option[valueKey.value] as string | number,
        option: option,
      } as NormalizedOption;
    });
  });

  function isSelected(option: NormalizedOption): boolean {
    if (isArray(normalizedModelValue.value)) {
      return normalizedModelValue.value.some((modelValue) => {
        return modelValue.value === option.value;
      });
    }

    if (isObject(normalizedModelValue.value)) {
      return normalizedModelValue.value.value == option.value;
    }

    return false;
  }

  return {
    normalizedOptions,
    normalizedModelValue,
    isSelected,
  };
}
