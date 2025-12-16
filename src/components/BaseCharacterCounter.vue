<template>
  <div>
    <div
      v-if="max && (!min || length >= min)"
      :class="{
        'text-red-600': length > max,
      }"
    >
      {{ length }}/{{ max }}
    </div>
    <div v-else-if="min && length < min" class="text-red-600">
      {{ $t('sui.min_x_characters', { x: min }) }} ({{ length }}/{{ min }})
    </div>
  </div>
</template>

<script lang="ts" setup>
import { trim } from 'lodash';

const props = defineProps({
  text: {
    required: true,
    type: String,
  },
  min: {
    default: undefined,
    type: Number,
  },
  max: {
    default: undefined,
    type: Number,
  },
  trim: {
    default: true,
    type: Boolean,
  },
  removeDoubleSpaces: {
    default: true,
    type: Boolean,
  },
});

const trimmedText = computed(() => {
  let text = props.text;

  if (props.trim) {
    text = trim(props.text);
  }

  if (props.removeDoubleSpaces) {
    text = text.replace(/ +(?= )/g, '');
  }

  return text;
});

const length = computed(() => {
  return trimmedText.value.length;
});
</script>
