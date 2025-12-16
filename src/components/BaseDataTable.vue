<template>
  <BaseDataIterator
    ref="dataIterator"
    :url="url"
    :url-query="urlQuery"
    :default-query="defaultQuery"
    :searchable="searchable"
    :actions="actions"
    :history-mode="historyMode"
  >
    <template
      #default="{
        items,
        loading,
        sortField,
        sortDirection,
        onSortChange,
        error,
        firstLoad,
      }"
    >
      <BaseCard clipped class="w-full overflow-hidden">
        <BaseTable
          ref="table"
          :data="items"
          :loading="loading"
          :detailed="detailed"
          :has-detailed-visible="hasDetailedVisible"
          :checkable="checkable"
          :checkable-actions="checkableActions"
          :checked-rows="checkedRows"
          :is-row-checkable="isRowCheckable"
          checkbox-position="left"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          :max-height="maxHeight"
          :visible-columns="visibleColumns"
          @sort="onSortChange"
          @check="$emit('check', $event)"
          @update:checked-rows="$emit('update:checked-rows', $event)"
          @check-all="$emit('checkAll', $event)"
          @cell-click="onCellClick"
        >
          <template #default>
            <slot />

            <BaseTableColumn
              v-slot="{ row }"
              :visible="editButton || deleteButton || $slots.rowActions != null"
              :toggle="false"
              :clickable="false"
              custom-key="actions"
            >
              <div class="flex justify-end text-right">
                <slot name="rowActions" :row="row" />

                <router-link
                  v-if="editButton && editUrl"
                  :to="editUrl(row)"
                  :disabled="!canUpdate(row)"
                >
                  <button class="btn btn-white bg-transparent p-2">
                    <BaseIcon
                      icon="heroicons:cog-6-tooth-solid"
                      class="text-slate-500"
                    />
                  </button>
                </router-link>

                <button
                  v-if="deleteButton && deleteUrl"
                  type="button"
                  class="btn btn-white bg-transparent p-2"
                  :disabled="!canDelete(row)"
                  @click="onDeleteClick(row)"
                >
                  <BaseIcon
                    icon="heroicons:trash-solid"
                    class="text-slate-500"
                  />
                </button>
              </div>
            </BaseTableColumn>
          </template>

          <template #detail="propsDetail">
            <slot name="detail" v-bind="propsDetail" />
          </template>

          <template #checkedHeader="propsCheckHeader">
            <slot name="checkedHeader" v-bind="propsCheckHeader" />
          </template>

          <template #empty>
            <div v-if="error" class="flex items-center justify-center py-16">
              <div class="flex flex-col items-center justify-center">
                <BaseIcon
                  icon="heroicons:x-circle"
                  class="h-10 w-10 text-red-600"
                />
                <p class="mt-3 text-center text-sm text-slate-600">
                  {{ $t('sui.whoops') }}
                </p>
              </div>
            </div>
            <div
              v-else-if="firstLoad"
              class="flex items-center justify-center py-16"
            >
              <div class="flex flex-col items-center">
                <BaseEmptyState class="w-32"></BaseEmptyState>

                <p class="mt-3 text-center text-sm text-slate-600">
                  {{ $t('sui.nothing_found') }}
                </p>
              </div>
            </div>
          </template>
        </BaseTable>
      </BaseCard>
    </template>

    <template
      v-if="$slots.filters"
      #filters="{ query, updateQuery, updateQueryValue }"
    >
      <slot
        name="filters"
        :query="query"
        :update-query="updateQuery"
        :update-query-value="updateQueryValue"
      />
    </template>

    <template #sidebarTop="sidebarProps">
      <slot name="sidebarTop" v-bind="sidebarProps"></slot>
    </template>

    <template v-if="toggleable" #sidebarBottom>
      <div class="mb-3">
        <BaseCard>
          <BaseCardRow size="sm">
            <button
              type="button"
              class="flex w-full items-center justify-between"
              @click="showColumnsDesktop = !showColumnsDesktop"
            >
              <h2 class="font-semibold">
                {{ $t('sui.columns') }}
              </h2>

              <BaseIcon
                :icon="
                  showColumnsDesktop
                    ? 'heroicons:chevron-down'
                    : 'heroicons:chevron-up'
                "
              ></BaseIcon>
            </button>

            <div v-show="showColumnsDesktop" class="mt-4">
              <BaseDataTableToggleColumns
                v-model:visibleColumns="visibleColumns"
                :table="table"
                @update:visible-columns="onUpdateVisibleColumn"
              ></BaseDataTableToggleColumns>
            </div>
          </BaseCardRow>
        </BaseCard>
      </div>
    </template>
  </BaseDataIterator>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { CollectionItem, DataTableQuery, MenuItemInterface } from '@/types';
import { useDialogsStore } from '@/stores/dialogs';
import { useNotificationsStore } from '../stores/notifications';
import BaseDataIterator from './BaseDataIterator.vue';
import { isArray } from 'lodash';

import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';
import BaseTable from './BaseTable.vue';
import BaseTableColumn from './BaseTableColumn.vue';
import BaseDataTableToggleColumns from './BaseDataTableToggleColumns.vue';
import { config } from '@/index';
import BaseEmptyState from '../svg/BaseEmptyState.vue';

const i18n = useI18n();

const http = config.http;

const dialogs = useDialogsStore();
const notifications = useNotificationsStore();

const table = ref<null | InstanceType<typeof BaseTable>>(null);

const props = defineProps({
  /**
   * Base URL from which to make requests
   */
  url: {
    required: true,
    type: String,
  },

  /**
   * Query params that always get applied
   */
  urlQuery: {
    default: undefined,
    type: Object as PropType<Record<string, any>>,
  },

  /**
   * Query params that gets applied by default
   * These may be overwritten by URL params generated by the data-table or filters
   */
  defaultQuery: {
    default: undefined,
    type: Object as PropType<DataTableQuery>,
  },

  /**
   * Show/Hide edit button
   */
  editButton: {
    default: true,
    type: Boolean,
  },

  /**
   * Edit url for router link
   */
  editUrl: {
    default: undefined,
    type: Function as PropType<(row: CollectionItem) => string>,
  },

  /**
   * Show/Hide delete button
   */
  deleteButton: {
    default: true,
    type: Boolean,
  },

  /**
   * Delete endpoint to delete an item
   */
  deleteUrl: {
    default: undefined,
    type: Function as PropType<(row: CollectionItem) => string>,
  },

  /**
   * Show toggle-able details on each row
   */
  detailed: {
    default: false,
    type: Boolean,
  },

  /**
   * Check is a given row has details
   */
  hasDetailedVisible: {
    default() {
      return true;
    },
    type: Function as PropType<(row: any) => boolean>,
  },

  /**
   * Makes row checkable
   */
  checkable: {
    default: false,
    type: Boolean,
  },

  /**
   * Actions on each row
   */
  checkableActions: {
    default: undefined,
    type: Array as PropType<MenuItemInterface[]>,
  },

  /**
   * Checked rows array
   */
  checkedRows: {
    default() {
      return [];
    },
    type: Array as PropType<Record<string, any>[]>,
  },

  /**
   * Check is a given row is checkable
   */
  isRowCheckable: {
    default() {
      return () => true;
    },
    type: Function,
  },

  /**
   * Adds a search bar
   */
  searchable: {
    default: true,
    type: Boolean,
  },

  /**
   * Shows the column toggle utility
   */
  toggleable: {
    default: true,
    type: Boolean,
  },

  /**
   * Actions
   */
  actions: {
    default: undefined,
    type: Array as PropType<MenuItemInterface[]>,
  },

  /**
   * Save data table state in URL
   */
  historyMode: {
    default: false,
    type: Boolean,
  },

  /*
   * Max height (in px)
   */
  maxHeight: {
    default: undefined,
    type: Number,
  },
});

const emit = defineEmits([
  'cell-click',
  'delete',
  'checkAll',
  'update:checked-rows',
  'check',
]);

const dataIterator = ref<null | InstanceType<typeof BaseDataIterator>>(null);

/*
|--------------------------------------------------------------------------
| Handlers
|--------------------------------------------------------------------------
*/

function onCellClick(payload: CollectionItem) {
  emit('cell-click', payload);
}

/*
|--------------------------------------------------------------------------
| Gate helpers
|--------------------------------------------------------------------------
*/

const gate = (row: CollectionItem, action: string): boolean => {
  if (row.can && Object.prototype.hasOwnProperty.call(row.can, action)) {
    return row.can[action];
  }
  return true;
};

const canUpdate = (row: CollectionItem): boolean => {
  return gate(row, 'update');
};

const canDelete = (row: CollectionItem): boolean => {
  return gate(row, 'delete');
};

function onDeleteClick(row: CollectionItem) {
  dialogs.push({
    title: i18n.t('sui.delete_record') + '?',
    message: i18n.t('sui.delete_record_description'),
    color: 'danger',
    closeOnOutsideClick: true,
    confirmText: i18n.t('sui.yes_delete'),
    onConfirm: () => onDelete(row),
  });
}

const onDelete = (row: CollectionItem) => {
  if (!props.deleteUrl) {
    return;
  }

  http
    .delete(props.deleteUrl(row))
    .then((response) => {
      if (response.data && response.data.message) {
        notifications.push({
          title: i18n.t('sui.success'),
          text: response.data.message,
          color: 'success',
        });
      }
      emit('delete', row);

      // Refetch even if URL is the same
      fetch();
    })
    .catch((error) => {
      notifications.push({
        title: i18n.t('sui.error'),
        text: error.response.data?.message ?? 'Unknown error',
        color: 'danger',
      });
    });
};

/*
|--------------------------------------------------------------------------
| Toggle columns
|--------------------------------------------------------------------------
*/

const showColumnsDesktop = ref<boolean>(false);

const visibleColumns = ref<number[]>([]);

// Find visible columns in local storage
const VISIBLE_COLUMNS_LOCAL_STORAGE = 'sprintify.visible_columns.';
const VISIBLE_COLUMNS_LOCAL_STORAGE_KEY =
  VISIBLE_COLUMNS_LOCAL_STORAGE + window.location.pathname;

const visibleColumnsFromStorage = JSON.parse(
  localStorage.getItem(VISIBLE_COLUMNS_LOCAL_STORAGE_KEY) + ''
) as number[];

// If found, set visibleColumns
if (
  visibleColumnsFromStorage &&
  isArray(visibleColumnsFromStorage) &&
  visibleColumnsFromStorage.length > 0
) {
  visibleColumns.value = visibleColumnsFromStorage;
}

// If nothing is found, set visibleColumns to all non optional columns from table
const unWatchTable = watch(
  () => table.value,
  () => {
    if (
      table.value &&
      table.value.newColumns.length &&
      visibleColumns.value.length == 0
    ) {
      visibleColumns.value = table.value.newColumns
        .filter((c) => !c.optional)
        .map((c) => c.newKey);
      unWatchTable();
    }
  }
);

/**
 * Update local storage when check input update
 */
function onUpdateVisibleColumn() {
  localStorage.setItem(
    VISIBLE_COLUMNS_LOCAL_STORAGE_KEY,
    JSON.stringify(visibleColumns.value)
  );
}

/*
|--------------------------------------------------------------------------
| Exposed functions
|--------------------------------------------------------------------------
*/

function fetch() {
  if (!dataIterator.value) {
    return;
  }
  dataIterator.value.fetch();
}

function fetchWithoutLoading() {
  if (!dataIterator.value) {
    return;
  }
  dataIterator.value.fetchWithoutLoading();
}

const dataIteratorQuery = computed((): DataTableQuery | null => {
  return dataIterator.value?.query ?? null;
});

defineExpose({
  fetch,
  fetchWithoutLoading,
  query: dataIteratorQuery,
});
</script>
