<template>
  <div ref="dataIteratorNode">
    <div
      class="grid w-full max-w-full grid-flow-row gap-4"
      :class="{
        'grid-cols-[1fr_300px]': hasSidebar,
      }"
    >
      <div
        class="min-w-0"
        :class="{ 'col-span-1': !mobileLayout, 'col-span-2': mobileLayout }"
      >
        <!-- Header -->
        <div class="mb-4 flex space-x-2 empty:mb-0">
          <!-- Search bar -->
          <div v-if="searchable" class="grow">
            <div class="relative h-11">
              <div
                class="pointer-events-none absolute top-0 left-0 flex h-full items-center justify-center pl-2.5"
              >
                <BaseIcon
                  class="h-6 w-6 text-slate-400"
                  icon="heroicons:magnifying-glass"
                />
              </div>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                class="h-11 w-full overflow-hidden rounded-md border border-slate-300 bg-white pl-10 pr-9 shadow-sm"
                :placeholder="$t('sui.autocomplete_placeholder')"
                @input="onSearch"
              />
              <div
                v-if="searchQuery"
                class="absolute top-0 right-0 flex h-full items-center justify-center p-1"
              >
                <button
                  type="button"
                  class="flex appearance-none items-center rounded p-1 hover:bg-slate-100"
                  @click="
                    searchQuery = '';
                    onSearch('');
                  "
                >
                  <BaseIcon
                    class="h-6 w-6 text-slate-500"
                    icon="heroicons:x-mark"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Filters (mobile) -->
          <button
            v-if="mobileLayout && hasFilters"
            class="btn flex h-11 items-center justify-center py-1 text-base shadow-sm"
            type="button"
            @click="showFilters = true"
          >
            <BaseIcon
              class="h-6 w-6 text-slate-500 xs:mr-2"
              icon="heroicons:adjustments-horizontal-solid"
            />
            <span class="hidden xs:block">{{ $t('sui.filters') }}</span>
          </button>

          <!-- Menu -->
          <BaseMenu
            v-if="actions && actions.length"
            menu-class="w-52"
            :items="actions"
          >
            <template #button="{ open }">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 bg-white shadow-sm duration-150 hover:bg-slate-50"
                :class="[
                  open ? 'ring-2 ring-primary-500 ring-offset-2' : false,
                ]"
              >
                <BaseIcon icon="heroicons-solid:dots-vertical" />
              </div>
            </template>
          </BaseMenu>
        </div>

        <slot
          :items="items"
          :loading="loading"
          :error="error"
          :first-load="firstLoad"
          :page="page"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          :on-sort-change="onSortChange"
          :on-page-change="onPageChange"
        />

        <!-- Pagination -->

        <div v-if="paginationMetadata" class="mt-5">
          <p class="text-center text-xs text-slate-400 sm:text-right">
            {{
              (paginationMetadata.current_page - 1) *
                paginationMetadata.per_page +
              1
            }}
            -
            {{
              $t('sui.pagination_detail', {
                page: Math.min(
                  paginationMetadata.current_page * paginationMetadata.per_page,
                  paginationMetadata.total
                ),
                total: paginationMetadata.total,
              })
            }}
          </p>
        </div>

        <div v-if="paginationMetadata" class="mt-4">
          <BasePagination
            :model-value="page"
            :last-page="lastPage"
            @update:model-value="onPageChange"
          />
        </div>
      </div>

      <div v-if="!mobileLayout" ref="sidebar">
        <slot
          name="sidebarTop"
          :pagination-metadata="paginationMetadata"
        ></slot>

        <div v-if="hasFilters" class="mb-4">
          <BaseCard>
            <BaseCardRow size="sm">
              <button
                type="button"
                class="flex w-full items-center justify-between"
                @click="showFilterDesktop = !showFilterDesktop"
              >
                <h2 class="font-semibold">
                  {{ $t('sui.filters') }}
                </h2>

                <BaseIcon
                  :icon="
                    showFilterDesktop
                      ? 'heroicons:chevron-down'
                      : 'heroicons:chevron-up'
                  "
                ></BaseIcon>
              </button>

              <div v-show="showFilterDesktop" class="mt-4 space-y-3">
                <slot
                  name="filters"
                  :query="query"
                  :update-query="updateFilterQuery"
                  :update-query-value="updateFilterQueryValue"
                />
              </div>
            </BaseCardRow>
          </BaseCard>
        </div>

        <slot
          name="sidebarBottom"
          :pagination-metadata="paginationMetadata"
        ></slot>
      </div>
    </div>

    <BaseModalSide v-if="hasFilters" v-model="showFilters">
      <div class="px-4 py-5">
        <h2 class="mb-4 font-semibold">
          {{ $t('sui.filters') }}
        </h2>

        <div class="space-y-3">
          <slot
            name="filters"
            :query="query"
            :update-query="updateFilterQuery"
            :update-query-value="updateFilterQueryValue"
          />
        </div>

        <div>
          <button class="btn btn-primary mt-4" @click="showFilters = false">
            {{ $t('sui.apply_filters') }}
          </button>
        </div>
      </div>
    </BaseModalSide>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

type Direction = 'asc' | 'desc';

const DEFAULT_QUERY = {
  page: 1,
  search: '',
  sort: '',
  filter: {},
} as DataTableQuery;
</script>

<script lang="ts" setup>
import { cloneDeep, debounce, isArray, merge, set } from 'lodash';
import hash from 'object-hash';
import { PropType } from 'vue';
import {
  Collection,
  DataTableQuery,
  MenuItemInterface,
  PaginatedCollection,
  PaginationMetadata,
  ResourceCollection,
} from '@/types';

import BaseMenu from './BaseMenu.vue';
import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';
import BasePagination from './BasePagination.vue';
import BaseModalSide from './BaseModalSide.vue';
import { config } from '@/index';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';

const props = defineProps({
  /**
   * Base URL from which to make requests
   */
  url: {
    required: true,
    type: String,
  },

  /**
   * Query params that always get applied.
   * To add overwrite-able query params, use defaultQuery.
   */
  urlQuery: {
    default: undefined,
    type: Object as PropType<Record<string, any>>,
  },

  /**
   * Query params that gets applied by default.
   * These may be overwritten by URL params generated by the data-table or filters
   * To add query params that are always active, use urlQuery.
   */
  defaultQuery: {
    default: function () {
      return DEFAULT_QUERY;
    },
    type: Object as PropType<DataTableQuery>,
  },

  /**
   * Add a search bar.
   */
  searchable: {
    default: true,
    type: Boolean,
  },

  /**
   * Configure contextual actions.
   */
  actions: {
    default: undefined,
    type: Array as PropType<MenuItemInterface[]>,
  },

  /**
   * Save data table state in URL.
   */
  historyMode: {
    default: false,
    type: Boolean,
  },
});

const http = config.http;

defineEmits([
  'click',
  'delete',
  'checkAll',
  'update:checked-rows',
  'check',
  'update:query',
]);

const dataIteratorNode = ref<null | HTMLElement>(null);
const searchInput = ref<null | HTMLInputElement>(null);

const route = useRoute();
const router = useRouter();
const routeName = route.name;

let willUnmount = false;

onBeforeUnmount(() => {
  willUnmount = true;
});

const width = ref(800);
useResizeObserver(dataIteratorNode, () => {
  width.value = dataIteratorNode.value?.clientWidth ?? 800;
});

/** Data table state */

const firstLoad = ref(false);
const loading = ref(true);
const error = ref(false);
const showFilters = ref(false);
const searchQuery = ref('');

let lastUrl = '';
let lastQueryHash = '';
const query = ref<DataTableQuery>(cloneDeep(props.defaultQuery));
const slots = useSlots();

const mobileLayout = computed(() => {
  return width.value < 1024;
});

const hasFilters = computed((): boolean => {
  const numberOfFilterSlots = slots.filters;
  return numberOfFilterSlots !== undefined;
});

/*
|--------------------------------------------------------------------------
| Has sidebar observer
|--------------------------------------------------------------------------
*/

const hasSidebar = ref(false);
const sidebar = ref<null | HTMLElement>(null);

function checkIfSidebarIsEmpty() {
  hasSidebar.value = (sidebar?.value?.childElementCount ?? 0) > 0;
}

const checkIfSidebarIsEmptyDebounce = debounce(checkIfSidebarIsEmpty, 100);

useMutationObserver(sidebar, checkIfSidebarIsEmptyDebounce, {
  attributes: false,
  childList: true,
});

onMounted(() => {
  checkIfSidebarIsEmpty();
});

watch(
  () => mobileLayout.value,
  () => {
    // After the sidebar appears...
    nextTick(() => {
      checkIfSidebarIsEmpty();
    });
  }
);

const showFilterDesktop = ref(true);

/*
|--------------------------------------------------------------------------
| Query params
|--------------------------------------------------------------------------
*/

function updateFilterQueryValue(key: string, value: any) {
  let newQuery = cloneDeep(query.value);
  newQuery = set(newQuery, key, value);
  newQuery = set(newQuery, 'page', 1);
  updateQuery(newQuery);
}

function updateFilterQuery(newQuery: DataTableQuery) {
  newQuery = set(newQuery, 'page', 1);
  updateQuery(newQuery);
}

function updateQuery(newQuery: DataTableQuery) {
  if (!props.historyMode) {
    query.value = newQuery;
    fetch();
    return;
  }

  const newRoute = router.resolve({
    path: route.path,
    params: route.params,
  });

  const newParams = config.formatQueryString(newQuery);
  const newRoutePath = newRoute.fullPath + '?' + newParams;

  const oldParamString = getRouteQuery();
  const oldParams = config.formatQueryString(oldParamString);

  // Push new route if different
  if (oldParams != newParams) {
    if (!firstLoad.value) {
      router.replace(newRoutePath);
      return;
    }
    router.push(newRoutePath);
    return;
  }

  // If the URL is unchanged, we must manually trigger the fetch() method
  // on first load.

  if (!firstLoad.value) {
    query.value = newQuery;
    fetch();
  }
}

function queryHash(query: DataTableQuery): string {
  return hash(query);
}

/*
|--------------------------------------------------------------------------
| Data fetching
|--------------------------------------------------------------------------
*/

const url = computed<string>(() => {
  return props.url;
});

/*
|--------------------------------------------------------------------------
| Handlers
|--------------------------------------------------------------------------
*/

function onPageChange(p: number) {
  const newQuery = cloneDeep(query.value);

  newQuery.page = p;

  updateQuery(newQuery);

  scrollIntoView();
}

function onSortChange(field: string, direction: Direction) {
  let newSort = field;

  if (newSort && direction == 'desc') {
    newSort = '-' + newSort;
  }

  const newQuery = cloneDeep(query.value);

  newQuery.page = 1;
  newQuery.sort = newSort;

  updateQuery(newQuery);
}

const onSearch = debounce((event: any) => {
  const newQuery = cloneDeep(query.value);

  newQuery.page = 1;
  newQuery.search = searchQuery.value;

  updateQuery(newQuery);
}, 350);

/*
|--------------------------------------------------------------------------
| Route watcher
|--------------------------------------------------------------------------
*/

watch(
  () => route.query,
  () => {
    // Wait for the willUnmount flag to be set
    nextTick(() => {
      onRouteChange();
    });
  }
);

watch(
  () => props.urlQuery,
  () => {
    fetch();
  }
);

function getRouteQuery() {
  return config.parseQueryString(window.location.search.replace(/^(\?)/, ''));
}

function onRouteChange() {
  if (!props.historyMode) {
    return;
  }

  if (willUnmount) {
    return;
  }

  // Stop if route was changed
  if (route.name != routeName) {
    return;
  }

  const routeQuery = getRouteQuery();
  const newQuery = routeQuery as DataTableQuery;

  const newQueryHash = queryHash(newQuery);

  if (newQueryHash == lastQueryHash) {
    return;
  }

  lastQueryHash = newQueryHash;

  query.value = newQuery;

  // Update search input if not in focus
  if (searchInput.value && searchInput.value !== document.activeElement) {
    updateSearchInput();
  }

  fetch();
}

/*
|--------------------------------------------------------------------------
| Fetch
|--------------------------------------------------------------------------
*/

function fetchWithLoading(force = false) {
  fetch(force, true);
}

function fetchWithoutLoading(force = false) {
  fetch(force, false);
}

function fetch(force = false, showLoading = true) {
  if (willUnmount) {
    return;
  }

  const urlSplit = url.value.split(/[?#]/);

  const baseUrl = urlSplit[0];
  const urlQueryString = urlSplit[1] ?? null;
  const urlQuery = config.parseQueryString(urlQueryString);

  const allParams = merge(
    cloneDeep(query.value),
    cloneDeep(props.urlQuery),
    cloneDeep(urlQuery)
  );

  const queryString = config.formatQueryString(allParams);

  const fullUrl = baseUrl + '?' + queryString;

  if (lastUrl == fullUrl && !force) {
    return;
  }

  if (showLoading) {
    loading.value = true;
  }

  lastUrl = fullUrl;

  http
    .get(fullUrl)
    .then((response) => {
      data.value = response.data;
      loading.value = false;
      error.value = false;
      firstLoad.value = true;
    })
    .catch(() => {
      loading.value = false;
      error.value = true;
    });
}

/*
|--------------------------------------------------------------------------
| Data parsing
|--------------------------------------------------------------------------
*/

const data = ref<null | ResourceCollection | PaginatedCollection | Collection>(
  null
);

const items = computed(() => {
  if (!data.value) {
    return [];
  }
  if (isArray(data.value)) {
    return data.value;
  }
  return data.value.data;
});

const paginationMetadata = computed<PaginationMetadata | null>(() => {
  const defaultMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 0,
  };

  if (!data.value) {
    return defaultMeta;
  }
  if (isArray(data.value)) {
    return defaultMeta;
  }
  if ('meta' in data.value) {
    return data.value.meta;
  }

  if (data.value.current_page) {
    return {
      current_page: data.value.current_page,
      last_page: data.value.last_page,
      per_page: data.value.per_page,
      total: data.value.total,
    };
  }

  return null;
});

const page = computed((): number => {
  if (query.value.page && parseInt(query.value.page + '')) {
    return parseInt(query.value.page + '');
  }
  return 1;
});

const lastPage = computed(() => {
  if (!paginationMetadata.value) {
    return 1;
  }
  return paginationMetadata.value.last_page;
});

const sortField = computed((): string => {
  return query.value.sort?.trim().replace(/^(-)/, '') ?? '';
});

const sortDirection = computed((): Direction => {
  if (query.value.sort && query.value.sort.length) {
    if (query.value.sort[0] == '-') {
      return 'desc';
    }
  }
  return 'asc';
});

const searchKeywords = computed((): string => {
  return query.value.search ?? '';
});

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/** Scroll into view */

const scrollIntoView = () => {
  if (dataIteratorNode.value == null) {
    return;
  }
  dataIteratorNode.value.scrollIntoView({
    behavior: 'smooth',
  });
};

function updateSearchInput() {
  searchQuery.value = searchKeywords.value;
}

/*
|--------------------------------------------------------------------------
| Created
|--------------------------------------------------------------------------
*/

let newQuery = cloneDeep(query.value);
const routeQuery = getRouteQuery();

newQuery = merge(newQuery, routeQuery);

updateQuery(newQuery);

// Update search input on first load
onMounted(() => {
  updateSearchInput();
});

/*
|--------------------------------------------------------------------------
| Exposed API
|--------------------------------------------------------------------------
*/

defineExpose({
  fetch: () => fetch(true),
  fetchWithLoading: () => fetchWithLoading(true),
  fetchWithoutLoading: () => fetchWithoutLoading(true),
  scrollIntoView,
  query,
});
</script>
