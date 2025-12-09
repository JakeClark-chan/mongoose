<template>
  <component
    :is="as"
    :aria-label="showTooltip ? tooltip : undefined"
    :data-microtip-position="showTooltip ? tooltipPosition : undefined"
    :data-microtip-size="showTooltip ? tooltipSize : undefined"
    :role="showTooltip ? 'tooltip' : undefined"
  >
    <slot name="default" :readable-date="readableDate">
      <span class="text-xs text-slate-600">
        {{ readableDate }}
      </span>
    </slot>
  </component>
</template>

<script lang="ts" setup>
import humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';
import { PropType } from 'vue';
const props = defineProps({
  value: {
    required: true,
    type: String,
  },
  showTooltip: {
    default: false,
    type: Boolean,
  },
  tooltipPosition: {
    default: 'top',
    type: String as PropType<'top' | 'right' | 'left' | 'bottom'>,
  },
  tooltipSize: {
    default: 'large',
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  timeZone: {
    default: 'utc',
    type: String,
  },
  as: {
    default: 'span',
    type: String,
  },
});

const now = ref(DateTime.now().toSeconds());

function getMinutes(duration: number) {
  return Math.abs(duration / 60000);
}

function getDuration() {
  const nowLuxon = DateTime.fromSeconds(now.value);
  const duration = DateTime.fromISO(props.value, {
    zone: props.timeZone,
  }).diff(nowLuxon).milliseconds;

  return duration;
}

function getInterval() {
  const duration = getDuration();
  const minutes = Math.ceil(getMinutes(duration));

  if (minutes < 10) {
    return 10 * 1000;
  }

  if (minutes < 60) {
    return 30 * 1000;
  }

  if (minutes < 1140) {
    return 60 * 1000;
  }

  if (minutes < 10080) {
    return 60 * 60 * 1000;
  }

  return 1000;
}

const intervalValue = getInterval();

const intervalId = setInterval(() => {
  now.value = DateTime.now().toSeconds();
}, intervalValue);

const i18n = useI18n();

const readableDate = computed(() => {
  const duration = getDuration();
  const durationHuman = humanizeDuration(duration, {
    language: i18n.locale.value,
    round: true,
    largest: 1,
  });

  const minutes = getMinutes(duration);

  if (minutes < 1) {
    return i18n.t('sui.just_now');
  }

  return i18n.t('sui.x_ago', { duration: durationHuman });
});

const tooltip = computed(() => {
  return DateTime.fromISO(props.value)
    .setLocale(i18n.locale.value)
    .toLocaleString(DateTime.DATETIME_FULL);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
