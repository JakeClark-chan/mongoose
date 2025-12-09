<template>
  <div class="base-date-picker relative">
    <div
      class="pointer-events-none absolute top-0 left-0 flex h-[42px] items-center justify-center pl-2.5"
    >
      <BaseIcon
        class="relative -top-px h-5 w-5 text-slate-400"
        icon="heroicons:calendar"
      />
    </div>
    <input
      ref="datepicker"
      type="text"
      readonly
      :disabled="disabled"
      class="flatpickr w-full rounded pl-10 pr-16 disabled:cursor-not-allowed disabled:text-slate-300"
      :class="[hasErrorInternal ? 'border-red-500' : 'border-slate-300']"
      :placeholder="$t('sui.click_or_select_date')"
    />
    <div
      v-if="modelValueFormatted && !disabled"
      class="absolute right-0 top-0 flex h-[42px] items-center justify-center p-1"
    >
      <button
        type="button"
        class="flex items-center rounded p-1.5 hover:bg-slate-100"
        @click="clear()"
      >
        <BaseIcon class="h-5 w-5 text-slate-600" icon="heroicons:x-mark" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref } from 'vue';
import { isArray } from 'lodash';
import { DateTime } from 'luxon';
import { BaseIcon } from '.';
import { useField } from '@/composables/field';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

import { French } from 'flatpickr/dist/l10n/fr';
import { english } from 'flatpickr/dist/l10n/default';
import { Instance } from 'flatpickr/dist/types/instance';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, null, Array] as PropType<
      string | null | string[] | undefined
    >,
  },
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  minDate: {
    default: null,
    type: [String, Date],
  },
  maxDate: {
    default: null,
    type: [String, Date],
  },
  hasError: {
    default: false,
    type: Boolean,
  },
  name: {
    default: undefined,
    type: String,
  },
  inline: {
    default: false,
    type: Boolean,
  },
  enableTime: {
    default: false,
    type: Boolean,
  },
  format: {
    default: 'Y-m-d',
    type: String,
  },
  mode: {
    default: 'single',
    type: String as PropType<
      'single' | 'multiple' | 'range' | 'time' | undefined
    >,
  },
  noCalendar: {
    default: false,
    type: Boolean,
  },
  disableDates: {
    type: [Array, Object] as PropType<string[] | Date[]>,
    default() {
      return [];
    },
  },
});

const i18n = useI18n();

const emit = defineEmits(['update:modelValue']);

const { hasErrorInternal, emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const modelValueFormatted = computed((): string | string[] | null => {
  if (!props.modelValue) {
    return null;
  }

  if (isArray(props.modelValue)) {
    const listModelValue = [] as string[];

    props.modelValue.forEach(function (date) {
      listModelValue.push(parseDate(date));
    });

    return listModelValue;
  }

  return parseDate(props.modelValue);
});

function dateJsToLuxon(date: Date): DateTime {
  return DateTime.fromJSDate(date);
}

function stringToLuxon(date: string): DateTime {
  if (date.includes('Z') && date.includes('T')) {
    return DateTime.fromISO(date);
  }

  return DateTime.fromSQL(date);
}

function luxonToString(date: DateTime): string {
  if (props.enableTime) {
    return date.toFormat('yyyy-MM-dd HH:mm:ss');
  }

  return date.toFormat('yyyy-MM-dd');
}

function parseDate(date: string): string {
  return luxonToString(stringToLuxon(date));
}

const locale = computed(() => {
  if (i18n.locale.value == 'fr') {
    return French;
  }

  return english;
});

const datepicker = ref(null) as Ref<HTMLInputElement | null>;

let picker = null as Instance | null;

const flatpickrConfig = computed(() => {
  return {
    enableTime: props.enableTime,
    dateFormat: props.format,
    mode: props.mode,
    locale: locale.value,
    minDate: props.minDate,
    maxDate: props.maxDate,
    noCalendar: props.noCalendar,
    disable: props.disableDates,
    inline: props.inline,
    animate: false,
    time_24hr: true,
  };
});

// Make sure the model value is always formatted on the parent component
onMounted(() => {
  if (props.modelValue !== modelValueFormatted.value) {
    emitUpdate(modelValueFormatted.value);
  }
});

/*
 | Flatpickr does not seem to observe changes in the value attribute of the input.
 | We should watch on modelValue,
 | and manually react and apply the changes on the picker
*/
watch(
  () => modelValueFormatted.value,
  () => {
    setPickerDate();
  },
  { immediate: true }
);

function setPickerDate() {
  if (!picker) {
    return;
  }

  if (!modelValueFormatted.value) {
    picker.clear();
    return;
  }

  picker.setDate(modelValueFormatted.value, false);
}

/*
 | If the props in flatpickrConfig are changed
 | update the flatpickr instance 
*/
watch(
  () => flatpickrConfig,
  () => init(),
  {
    deep: true,
    immediate: true,
  }
);

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  if (picker) {
    picker.destroy();
  }
});

function init() {
  if (!datepicker.value) {
    return;
  }

  picker = flatpickr(datepicker.value, {
    ...flatpickrConfig.value,
    onChange(dates) {
      if (!dates.length) {
        clear();
        return;
      }

      const datetime = DateTime.fromJSDate(dates[0]);

      if (!datetime) {
        clear();
        return;
      }

      const listDate = [] as string[];

      dates.forEach(function (date) {
        listDate.push(luxonToString(dateJsToLuxon(date)));
      });

      if (listDate.length == 0) {
        emitUpdate(null);
        return;
      }

      if (props.mode === 'range' || props.mode === 'multiple') {
        emitUpdate(listDate);
        return;
      }

      emitUpdate(listDate[0]);
    },
  });

  setPickerDate();
}

function clear() {
  emitUpdate(null);
}
</script>
<style lang="postcss">
body .flatpickr-calendar {
  width: 280px;
  box-shadow: 1px 0 0 #cbd5e1, -1px 0 0 #cbd5e1, 0 1px 0 #cbd5e1,
    0 -1px 0 #cbd5e1, 0 3px 13px rgb(0 0 0 / 10%);

  &.inline {
    width: 260px;
    box-shadow: none;
    border: none;
    padding: 0;

    .flatpickr-months {
      width: 260px;
    }

    .flatpickr-innerContainer {
      padding: 0;
      width: 260px;
    }
  }

  .dayContainer {
    width: 260px;
    max-width: 260px;
    min-width: 260px;
  }

  .flatpickr-day {
    height: 36px;
    line-height: 36px;
  }

  .flatpickr-months {
    width: 280px;
    padding-top: 10px;

    .flatpickr-prev-month,
    .flatpickr-next-month {
      top: 5px;
    }

    .flatpickr-prev-month {
      left: 2px;
    }

    .flatpickr-next-month {
      right: 2px;
    }

    .flatpickr-prev-month:hover svg,
    .flatpickr-next-month:hover svg {
      fill: #888;
    }
  }

  .flatpickr-current-month {
    padding-top: 1px;

    .flatpickr-monthDropdown-months {
      font-weight: 400;
      height: 25px;
      &:focus {
        box-shadow: none;
      }
    }

    input.cur-year {
      font-weight: 400;
      height: 25px;
      &:focus {
        box-shadow: none;
      }
    }
  }

  .flatpickr-innerContainer {
    padding: 10px;
    padding-top: 0;
    width: 280px;
  }

  .flatpickr-rContainer {
    width: 260px;
  }

  .numInput {
    &:focus {
      box-shadow: none;
    }
  }
}

.flatpickr-calendar span.flatpickr-weekday {
  @apply font-medium text-slate-400;
}
</style>
