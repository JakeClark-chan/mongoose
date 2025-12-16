<template>
  <button
    v-if="status === 'completed'"
    type="button"
    class="group"
    @click="$emit('click')"
  >
    <span
      class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-slate-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
      aria-hidden="true"
    />
    <span
      :class="[
        index !== 0 ? 'lg:pl-9' : '',
        'flex items-start px-6 py-5 text-sm font-medium',
      ]"
    >
      <span class="flex-shrink-0">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600"
        >
          <BaseIcon
            :icon="'mdi-check'"
            class="h-6 w-6 text-white"
            aria-hidden="true"
          />
        </span>
      </span>
      <span class="mt-0.5 ml-4 flex min-w-0 flex-col items-start">
        <span class="mb-0.5 text-left text-sm font-medium leading-tight">{{
          title
        }}</span>
        <span
          v-if="description"
          class="text-left text-sm font-normal leading-snug text-slate-500"
        >
          {{ description }}
        </span>
      </span>
    </span>
  </button>
  <button
    v-else-if="status === 'current'"
    aria-current="step"
    type="button"
    @click="$emit('click')"
  >
    <span
      class="absolute top-0 left-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
      aria-hidden="true"
    />
    <span
      :class="[
        index !== 0 ? 'lg:pl-9' : '',
        'flex items-start px-6 py-5 text-sm font-medium',
      ]"
    >
      <span class="flex-shrink-0">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600"
        >
          <span class="text-indigo-600">{{ stepNumber }}</span>
        </span>
      </span>
      <span class="mt-0.5 ml-4 flex min-w-0 flex-col items-start">
        <span
          class="mb-0.5 text-left text-sm font-medium leading-tight text-indigo-600"
        >
          {{ title }}
        </span>
        <span
          v-if="description"
          class="text-left text-sm font-normal leading-snug text-slate-500"
        >
          {{ description }}
        </span>
      </span>
    </span>
  </button>
  <button
    v-else-if="status == 'pending'"
    type="button"
    class="group"
    @click="$emit('click')"
  >
    <span
      class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-slate-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
      aria-hidden="true"
    />
    <span
      :class="[
        index !== 0 ? 'lg:pl-9' : '',
        'flex items-start px-6 py-5 text-sm font-medium',
      ]"
    >
      <span class="flex-shrink-0">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-300"
        >
          <span class="text-slate-500">{{ stepNumber }}</span>
        </span>
      </span>
      <span class="mt-0.5 ml-4 flex min-w-0 flex-col items-start">
        <span
          class="mb-0.5 text-left text-sm font-medium leading-tight text-slate-600"
        >
          {{ title }}
        </span>
        <span
          v-if="description"
          class="text-left text-sm font-normal leading-snug text-slate-500"
        >
          {{ description }}
        </span>
      </span>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BaseIcon } from '.';

defineProps({
  stepNumber: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    default: null,
    type: String as PropType<string | null>,
  },
  status: {
    required: true,
    type: String,
  },
  index: {
    required: true,
    type: Number,
  },
});

defineEmits(['click']);
</script>
