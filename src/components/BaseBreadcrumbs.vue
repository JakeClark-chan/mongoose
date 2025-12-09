<template>
  <div>
    <nav
      v-if="breadcrumbs.length > 0"
      class="hidden sm:flex"
      aria-label="Breadcrumb"
    >
      <ol role="list" class="flex items-center space-x-3">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <div class="flex items-center">
            <BaseIcon
              v-if="index > 0"
              icon="heroicons-solid:chevron-right"
              class="h-5 w-5 flex-shrink-0 text-slate-400"
              aria-hidden="true"
            />
            <RouterLink
              v-slot="{ href, navigate, isExactActive }"
              :to="breadcrumb.to"
              custom
            >
              <a
                :href="href"
                class="text-sm"
                :class="[
                  { 'ml-3': index > 0 },
                  isExactActive
                    ? 'text-primary-600'
                    : 'text-slate-500 hover:text-slate-700',
                ]"
                @click.prevent="navigate()"
              >
                <span v-if="breadcrumb.icon">
                  <BaseIcon :icon="breadcrumb.icon" />
                </span>
                <span v-else>
                  {{ truncate(breadcrumb.label) }}
                </span>
              </a>
            </RouterLink>
          </div>
        </li>
      </ol>
    </nav>

    <RouterLink
      v-if="mobileBreadcrumb"
      :to="mobileBreadcrumb.to"
      class="block text-slate-500 sm:hidden"
    >
      <div class="flex items-center">
        <BaseIcon icon="heroicons-solid:arrow-left" class="mr-2" />
        <span>
          {{ mobileBreadcrumb.label }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Breadcrumb } from '@/types';
import { truncate } from 'lodash';

const props = defineProps({
  breadcrumbs: {
    required: true,
    type: Array as PropType<Breadcrumb[]>,
  },
});

const mobileBreadcrumb = computed((): Breadcrumb | undefined => {
  if (props.breadcrumbs.length >= 2) {
    return props.breadcrumbs[props.breadcrumbs.length - 2];
  }
  return undefined;
});
</script>
