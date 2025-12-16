<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Progress">
      <ol
        role="list"
        class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="relative overflow-hidden lg:flex-1"
        >
          <div
            :class="[
              index === 0 ? 'rounded-t-md border-b-0' : '',
              index === items.length - 1 ? 'rounded-b-md border-t-0' : '',
              'overflow-hidden border border-gray-200 lg:border-0',
            ]"
          >
            <BaseStepperItem
              :title="item.title"
              :description="item.description"
              :step-number="item.stepNumber"
              :status="item.status"
              :index="index"
              @click="$emit('click', index)"
            />

            <template v-if="index !== 0">
              <!-- Separator -->
              <div
                class="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                aria-hidden="true"
              >
                <svg
                  class="w-full h-full text-gray-300"
                  viewBox="0 0 12 82"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V31L10.5 41L0.5 51V82"
                    stroke="currentcolor"
                    vector-effect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </template>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { StepperItem } from '@/types/StepperItem';
import BaseStepperItem from './BaseStepperItem.vue';

defineProps({
  items: {
    required: true,
    type: Array as PropType<StepperItem[]>,
  },
});

defineEmits(['click']);
</script>
