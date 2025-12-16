<template>
  <div>
    <div class="-m-0.5 flex">
      <div class="w-auto p-0.5">
        <select
          v-model="date.year"
          :disabled="disabled"
          :required="required"
          data-cy="year"
          class="w-full rounded"
          :class="[
            {
              'cursor-not-allowed bg-slate-100 text-slate-500': disabled,
            },
            [hasErrorInternal ? 'border-red-500' : 'border-slate-300'],
          ]"
          :placeholder="$t('sui.year')"
          @change="update()"
        >
          <option disabled selected hidden :value="null">
            {{ $t('sui.year') }}
          </option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="w-auto p-0.5">
        <select
          v-model="date.month"
          :disabled="disabled"
          :required="required"
          data-cy="month"
          class="w-full rounded capitalize"
          :class="[
            {
              'cursor-not-allowed bg-slate-100 text-slate-500': disabled,
            },
            [hasErrorInternal ? 'border-red-500' : 'border-slate-300'],
          ]"
          :placeholder="$t('sui.month')"
          @change="update()"
        >
          <option disabled selected hidden :value="null">
            {{ $t('sui.month') }}
          </option>
          <option v-for="(month, i) in months" :key="month" :value="i + 1">
            {{ month }}
          </option>
        </select>
      </div>

      <div class="w-auto p-0.5">
        <select
          v-model="date.day"
          :disabled="dayDisabled"
          :required="required"
          data-cy="day"
          class="w-full rounded capitalize"
          :class="[
            {
              'cursor-not-allowed bg-slate-100 text-slate-500': dayDisabled,
            },
            [hasErrorInternal ? 'border-red-500' : 'border-slate-300'],
          ]"
          :placeholder="$t('sui.day')"
          @change="update()"
        >
          <option disabled selected hidden :value="null">
            {{ $t('sui.day') }}
          </option>
          <option v-for="day in days" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>
    </div>

    <button
      type="button"
      :disabled="disabled"
      class="mt-1 appearance-none border-transparent bg-transparent text-sm text-slate-700 underline outline-none disabled:cursor-not-allowed disabled:opacity-50"
      @click="clear()"
    >
      <span>{{ $t('sui.clear') }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { range, padStart } from 'lodash';
import { DateTime, Info } from 'luxon';
import { useField } from '@/composables/field';

const props = defineProps({
  modelValue: {
    required: true,
    type: [String, null] as PropType<string | null>,
  },
  required: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  minYear: {
    default: DateTime.now().year - 90,
    type: Number,
  },
  maxYear: {
    default: DateTime.now().year,
    type: Number,
  },
  name: {
    default: undefined,
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const { hasErrorInternal, emitUpdate } = useField({
  name: computed(() => props.name),
  required: computed(() => props.required),
  hasError: computed(() => props.hasError),
  emit: emit,
});

const i18n = useI18n();

const years = range(props.maxYear, props.minYear) as number[];
const months = Info.months('short', { locale: i18n.locale.value });
const days = computed(() => {
  if (!date.value.year) {
    return [];
  }

  if (!date.value.month) {
    return [];
  }

  const d = new Date(date.value.year, date.value.month, 0);
  return range(1, d.getDate() + 1);
});

const date = ref({
  year: null as number | null,
  month: null as number | null,
  day: null as number | null,
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const datetime = DateTime.fromISO(props.modelValue, { zone: 'utc' });
      date.value.year = datetime.year;
      date.value.month = datetime.month;
      date.value.day = datetime.day;
    }
  },
  { immediate: true }
);

function update() {
  const dateTime = getDateTime();

  if (dateTime) {
    emitUpdate(dateTime.toISODate());
  } else {
    emitUpdate(null);
  }
}

function clear() {
  date.value.day = null;
  date.value.month = null;
  date.value.year = null;

  emitUpdate(null);
}

function getDateTime(): DateTime | null {
  if (!date.value.year || !date.value.month || !date.value.day) {
    return null;
  }

  return DateTime.fromISO(
    padStart(date.value.year + '', 4, '0') +
      '-' +
      padStart(date.value.month + '', 2, '0') +
      '-' +
      padStart(date.value.day + '', 2, '0'),
    { zone: 'utc' }
  );
}

const dayDisabled = computed(() => {
  return days.value.length == 0 || props.disabled;
});
</script>
