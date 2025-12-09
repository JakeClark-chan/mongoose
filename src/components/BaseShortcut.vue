<template>
  <BaseCard class="flex duration-200 hover:bg-slate-50">
    <router-link :to="to">
      <section class="whitespace-pre-line p-4">
        <!-- Icon -->
        <div
          class="mb-2.5 inline-flex items-center rounded p-2"
          :class="[colorClasses]"
        >
          <BaseIcon
            v-if="icon"
            :icon="icon"
            :class="iconSizeClasses"
          ></BaseIcon>
        </div>
        <!-- Title -->
        <div class="text-md font-semibold">
          {{ title }}
        </div>
        <!-- Description -->
        <div
          v-if="description"
          class="mt-1 mb-3 whitespace-pre-line text-sm text-slate-500 line-clamp-2"
        >
          {{ description }}
        </div>
        <!-- Text link -->
        <div
          v-if="linkText"
          class="flex items-center justify-start text-sm font-medium"
        >
          <div class="mr-1 leading-none">{{ linkText }}</div>
          <div>
            <BaseIcon
              icon="heroicons:arrow-right-20-solid"
              class="mt-px h-4 w-4"
            ></BaseIcon>
          </div>
        </div>
      </section>
    </router-link>
  </BaseCard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BaseIcon } from '.';
import BaseCard from './BaseCard.vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  to: {
    required: true,
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    default: null,
    type: String,
  },
  linkText: {
    default: null,
    type: String,
  },
  color: {
    default: 'gray',
    type: String as PropType<
      | 'gray'
      | 'red'
      | 'orange'
      | 'yellow'
      | 'green'
      | 'blue'
      | 'indigo'
      | 'purple'
      | 'pink'
    >,
  },
  icon: {
    required: true,
    type: String,
  },
  contrast: {
    default: 'low',
    type: String as PropType<'low' | 'high'>,
  },
});

const colorClasses = computed(() => {
  if (props.color == 'gray') {
    if (props.contrast == 'high') {
      return 'bg-slate-600 text-white';
    }
    return 'bg-slate-100 text-slate-800 border border-slate-300';
  }
  if (props.color == 'red') {
    if (props.contrast == 'high') {
      return 'bg-red-600 text-white';
    }
    return 'bg-red-100 text-red-700 border border-red-300';
  }
  if (props.color == 'orange') {
    if (props.contrast == 'high') {
      return 'bg-orange-500 text-white';
    }
    return 'bg-orange-100 text-yellow-700 border border-orange-300';
  }
  if (props.color == 'yellow') {
    if (props.contrast == 'high') {
      return 'bg-yellow-500 text-white';
    }
    return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
  }
  if (props.color == 'green') {
    if (props.contrast == 'high') {
      return 'bg-green-600 text-white';
    }
    return 'bg-green-100 text-green-700 border border-green-300';
  }
  if (props.color == 'blue') {
    if (props.contrast == 'high') {
      return 'bg-blue-600 text-white';
    }
    return 'bg-blue-100 text-blue-700 border border-blue-300';
  }
  if (props.color == 'indigo') {
    if (props.contrast == 'high') {
      return 'bg-indigo-600 text-white';
    }
    return 'bg-indigo-100 text-indigo-700 border border-indigo-300';
  }
  if (props.color == 'purple') {
    if (props.contrast == 'high') {
      return 'bg-purple-600 text-white';
    }
    return 'bg-purple-100 text-purple-700 border border-purple-300';
  }
  if (props.color == 'pink') {
    if (props.contrast == 'high') {
      return 'bg-pink-600 text-white';
    }
    return 'bg-pink-100 text-pink-700 border border-pink-300';
  }
  return 'bg-slate-100 text-slate-700 border border-slate-300';
});

const iconSizeClasses = computed(() => {
  return 'h-4 w-4';
});
</script>
