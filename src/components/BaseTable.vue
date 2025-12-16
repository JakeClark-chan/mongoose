<template>
  <div class="relative w-full overflow-hidden">
    <div ref="slot" style="display: none">
      <slot />
    </div>

    <div class="flex flex-col">
      <div
        class="overflow-x-auto overflow-y-auto"
        data-scroll-lock-scrollable
        :style="{ maxHeight: maxHeight ? maxHeight + 'px' : undefined }"
      >
        <div class="inline-block min-w-full align-middle">
          <div class="relative min-h-[300px]">
            <table class="min-w-full border-separate border-spacing-0">
              <thead v-if="newColumns.length" ref="thead">
                <tr>
                  <th v-if="showDetailRowIcon" class="th" />
                  <th
                    v-if="checkable && checkboxPosition === 'left'"
                    class="th py-0 pl-3"
                    align="left"
                  >
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        autocomplete="off"
                        :checked="isAllChecked"
                        :disabled="isAllUncheckable"
                        :class="checkboxStyle"
                        @change="checkAll"
                      />
                    </div>
                  </th>
                  <th
                    v-for="(column, index) in visibleColumns"
                    :key="column.newKey + ':' + index + 'header'"
                    v-bind="column.thAttrs && column.thAttrs(column)"
                    :style="column.style"
                    class="th py-2 pl-3 pr-3 text-left"
                    @click.stop="sort(column, undefined, $event as any)"
                  >
                    <button
                      type="button"
                      class="flex w-full items-center bg-transparent text-left text-sm font-medium leading-tight text-slate-900"
                      :class="{
                        'cursor-default': !column.sortable,
                        'text-blue-600':
                          column.sortable && currentSortColumn === column,
                      }"
                    >
                      <span class="mr-1 whitespace-nowrap">{{
                        column.label
                      }}</span>
                      <span
                        v-show="column.sortable && currentSortColumn === column"
                      >
                        <BaseIcon
                          icon="mdi:chevron-down"
                          class="h-5 w-5 duration-300"
                          :class="{
                            'rotate-180': isAsc,
                          }"
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    v-if="checkable && checkboxPosition === 'right'"
                    class="th pr-3"
                    align="right"
                  >
                    <input
                      autocomplete="off"
                      type="checkbox"
                      :checked="isAllChecked"
                      :disabled="isAllUncheckable"
                      :class="checkboxStyle"
                      @change="checkAll"
                    />
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-if="newCheckedRows.length">
                  <td
                    :colspan="columnCount"
                    class="sticky z-[1] p-0"
                    :style="{
                      top: theadHeight + 'px',
                    }"
                    :class="[borderClasses]"
                  >
                    <slot
                      name="checkedHeader"
                      :uncheck-all="uncheckAll"
                      :count="newCheckedRows.length"
                      :check-rows="newCheckedRows"
                    >
                      <div
                        class="flex items-center justify-between bg-slate-100 py-2 pl-3 pr-2 text-sm"
                      >
                        <div>
                          <span class="mr-3 text-slate-500"
                            >{{
                              $t('sui.x_rows_selected', {
                                count: newCheckedRows.length,
                              })
                            }}.</span
                          >
                          <button
                            type="button"
                            class="mr-3 inline text-slate-700 underline"
                            @click="uncheckAll()"
                          >
                            {{ $t('sui.deselect_all') }}
                          </button>
                        </div>
                        <BaseMenu
                          v-if="checkableActions?.length"
                          menu-class="w-52"
                          :items="checkableActions"
                        >
                          <template #button="{ open }">
                            <div
                              class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white duration-150 hover:bg-slate-50"
                              :class="[
                                open
                                  ? 'ring-2 ring-primary-500 ring-offset-2'
                                  : false,
                              ]"
                            >
                              <BaseIcon icon="heroicons-solid:dots-vertical" />
                            </div>
                          </template>
                        </BaseMenu>
                      </div>
                    </slot>
                  </td>
                </tr>

                <template
                  v-for="(row, index) in data"
                  :key="getRowIndex(row, index)"
                >
                  <tr>
                    <td
                      v-if="showDetailRowIcon"
                      class="pl-3"
                      :class="borderBottomClasses(index, row)"
                      style="width: 36px"
                    >
                      <button
                        type="button"
                        class="mr-0 flex h-8 w-8 appearance-none items-center justify-center rounded-full border-0 bg-white text-slate-400 duration-300 hover:bg-slate-100 hover:text-slate-700"
                        :class="{
                          'rotate-180': isVisibleDetailRow(row),
                        }"
                        @click.stop="toggleDetails(row)"
                      >
                        <BaseIcon
                          v-if="hasDetailedVisible(row)"
                          icon="mdi:chevron-down"
                          class="h-5 w-5"
                        />
                      </button>
                    </td>

                    <td
                      v-if="checkable && checkboxPosition === 'left'"
                      class="pl-3"
                      :class="borderBottomClasses(index, row)"
                    >
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          autocomplete="off"
                          :disabled="!isRowCheckable(row)"
                          :checked="isRowChecked(row)"
                          :class="checkboxStyle"
                          @click="checkRow(row, index, $event as MouseEvent)"
                        />
                      </div>
                    </td>

                    <SlotComponent
                      v-for="(column, colindex) in visibleColumns"
                      :key="column.newKey + index + ':' + colindex"
                      v-bind="column.tdAttrs && column.tdAttrs(row, column)"
                      :component="column"
                      scoped
                      name="default"
                      tag="td"
                      class="py-3 pl-3 pr-3 text-sm"
                      :class="borderBottomClasses(index, row)"
                      :data-label="column.label"
                      :props="{ row, column, index, colindex, toggleDetails }"
                      @click="
                        onColumnClick(row, column, index, colindex, $event)
                      "
                    />

                    <td
                      v-if="checkable && checkboxPosition === 'right'"
                      class="pr-3"
                      :class="borderBottomClasses(index, row)"
                      align="right"
                    >
                      <input
                        type="checkbox"
                        autocomplete="off"
                        :disabled="!isRowCheckable(row)"
                        :checked="isRowChecked(row)"
                        :class="checkboxStyle"
                        @click="checkRow(row, index, $event as MouseEvent)"
                      />
                    </td>
                  </tr>

                  <transition :name="detailTransition">
                    <tr
                      v-if="isActiveDetailRow(row)"
                      :key="getRowIndex(row, index) + 'detail'"
                    >
                      <td
                        :colspan="columnCount"
                        class="td"
                        :class="borderBottomDetailClasses(index)"
                      >
                        <slot name="detail" :row="row" :index="index" />
                      </td>
                    </tr>
                  </transition>
                </template>

                <tr v-if="data.length == 0">
                  <td :colspan="columnCount">
                    <slot name="empty" />
                  </td>
                </tr>
              </tbody>
            </table>

            <slot name="loading">
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="loading"
                  class="absolute inset-0 flex h-full w-full items-start justify-center"
                >
                  <div class="absolute h-full w-full bg-white bg-opacity-60" />

                  <div class="pt-20">
                    <BaseSpinnerLarge class="h-10 w-10 text-blue-500" />
                  </div>
                </div>
              </Transition>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseTable',
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { BaseTableColumn, MenuItemInterface, Row } from '@/types';
import SlotComponent from './SlotComponent';
import { useResizeObserver } from '@vueuse/core';
import { debounce, isArray } from 'lodash';
import BaseMenu from './BaseMenu.vue';
import BaseSpinnerLarge from '../svg/BaseSpinnerLarge.vue';

const checkboxStyle =
  'disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed border-slate-400 rounded';

provide('table', getCurrentInstance());

const props = defineProps({
  /** Table data */
  data: {
    type: Array as PropType<Row[]>,
    default: () => [],
  },
  /** Loading state */
  loading: {
    default: false,
    type: Boolean,
  },
  visibleColumns: {
    default: undefined,
    type: Array as PropType<number[]>,
  },
  /** Allow row details  */
  detailed: {
    default: false,
    type: Boolean,
  },
  /** Rows can be checked (multiple) */
  checkable: {
    default: false,
    type: Boolean,
  },
  /** Define checkable actions */
  checkableActions: {
    default: undefined,
    type: Array as PropType<MenuItemInterface[]>,
  },
  /**
   * Position of the checkbox (if checkable is true)
   * @values left, right
   */
  checkboxPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  /** Custom method to verify if a row is checkable, works when is checkable */
  isRowCheckable: {
    type: Function,
    default: () => true,
  },
  /** Set which rows are checked, use v-model:checkedRows to make it two-way binding */
  checkedRows: {
    default: () => [],
    type: Array as PropType<Row[]>,
  },
  /** Sets the default sort column field */
  sortField: {
    type: String,
    default: '',
  },
  /**
   * Sets the default sort column direction
   * @values asc, desc
   */
  sortDirection: {
    type: String,
    default: 'asc',
  },
  /** Controls the visibility of the trigger that toggles the detailed rows. */
  hasDetailedVisible: {
    type: Function,
    default: () => true,
  },
  /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
  rowKey: {
    type: String,
    default: 'id',
  },
  /* Transition name to use when toggling row details. */
  detailTransition: {
    type: String,
    default: '',
  },
  /* Max height (in px) */
  maxHeight: {
    default: undefined,
    type: Number,
  },
});

const emit = defineEmits([
  'check',
  'check-all',
  'update:checkedRows',
  'details-open',
  'details-close',
  'update:openedDetailed',
  'sort',
  'cell-click',
]);

const visibleDetailRows = ref<Row[]>([]);
const newCheckedRows = ref<Row[]>([...props.checkedRows]);
const lastCheckedRowIndex = ref<number | null>(null);
const currentSortColumn = ref<BaseTableColumn | null>(null);
const isAsc = ref(true);
const defaultSlots = ref<BaseTableColumn[]>([]);
const sequence = ref(1);

const slot = ref<HTMLElement | null>(null);
const thead = ref<HTMLElement | null>(null);
const theadHeight = ref(0);

useResizeObserver(thead, () => setTheadHeightDebounce());

const setTheadHeightDebounce = debounce(() => {
  setTheadHeight();
}, 100);

function setTheadHeight() {
  if (thead.value) {
    theadHeight.value = thead.value.clientHeight;
  }
}

const newColumns = computed(() => {
  return defaultSlots.value;
});

const visibleColumns = computed(() => {
  if (!newColumns.value) {
    return newColumns.value;
  }

  return newColumns.value.filter((column: BaseTableColumn) => {
    if (column.toggle === false) {
      return !!column.visible;
    }

    if (!isArray(props.visibleColumns)) {
      return true;
    }

    if (props.visibleColumns.includes(column.newKey)) {
      return true;
    }

    return false;
  });
});

/**
 * Return total column count based if it's checkable or expanded
 */
const columnCount = computed(() => {
  let count = visibleColumns.value.length;
  count += props.checkable ? 1 : 0;
  count += props.detailed ? 1 : 0;

  return count;
});

/**
 * Return if detailed row tabled
 * will be with chevron column & icon or not
 */
const showDetailRowIcon = computed(() => {
  return props.detailed;
});

/**
 * When checkedRows prop change, update internal value without
 * mutating original data.
 */
watch(
  () => props.checkedRows,
  (rows) => {
    newCheckedRows.value = [...rows];
  },
  { deep: true }
);

watch(
  () => props.sortField,
  () => {
    updateSortState();
  }
);

watch(
  () => props.sortDirection,
  () => {
    updateSortState();
  }
);

onMounted(() => {
  nextTick(() => {
    updateSortState();
  });
});

/**
 * Sort the column.
 * Toggle current direction on column if it's sortable
 * and not just updating the prop.
 */
function sort(column: BaseTableColumn, updatingData = false, event = null) {
  if (!column || !column.sortable) {
    return;
  }

  if (!updatingData) {
    isAsc.value =
      column === currentSortColumn.value
        ? !isAsc.value
        : props.sortDirection.toLowerCase() !== 'desc';
  }

  /**
   * @property {string} field column field
   * @property {boolean} direction 'asc' or 'desc'
   * @property {Event} event native event
   */
  emit('sort', column.field, isAsc.value ? 'asc' : 'desc', event);

  currentSortColumn.value = column;
}

/**
 * Check if the row is checked (is added to the array).
 */
function isRowChecked(row: Row): boolean {
  return (
    newCheckedRows.value.find((r) => r[props.rowKey] == row[props.rowKey]) !==
    undefined
  );
}

/**
 * Check if all rows in the page are checkable.
 */
const isAllUncheckable = computed(() => {
  const validData = props.data.filter((row) => props.isRowCheckable(row));
  return validData.length === 0;
});

/**
 * Check if all rows in the page are checked.
 */
const isAllChecked = computed(() => {
  const validData = props.data.filter((row) => {
    return props.isRowCheckable(row);
  });

  if (validData.length === 0) {
    return false;
  }

  const missingChecked = validData.some((currentRow) => {
    return !isRowChecked(currentRow);
  });

  return !missingChecked;
});

/**
 * Remove a checked row from the array.
 */
function removeCheckedRow(row: Row) {
  const index = newCheckedRows.value.findIndex(
    (r) => r[props.rowKey] == row[props.rowKey]
  );
  if (index >= 0) {
    newCheckedRows.value.splice(index, 1);
  }
}

/**
 * Header checkbox click listener.
 * Add or remove all rows in current page.
 */
function checkAll() {
  if (isAllChecked.value) {
    newCheckedRows.value = [];
  } else {
    props.data.forEach((currentRow) => {
      if (props.isRowCheckable(currentRow)) {
        newCheckedRows.value.push(currentRow);
      }
    });
  }

  sendCheckUpdate();
}

/**
 * Remove all rows in current page.
 */
function uncheckAll() {
  newCheckedRows.value = [];

  sendCheckUpdate();
}

function sendCheckUpdate() {
  emit('check', newCheckedRows.value);
  emit('check-all', newCheckedRows.value);
  emit('update:checkedRows', newCheckedRows.value);
}

/**
 * Row checkbox click listener.
 */
function checkRow(row: Row, index: number, event: MouseEvent) {
  if (!props.isRowCheckable(row)) {
    return;
  }

  const lastIndex = lastCheckedRowIndex.value;
  lastCheckedRowIndex.value = index;

  if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
    shiftCheckRow(row, index, lastIndex);
  } else if (!isRowChecked(row)) {
    newCheckedRows.value.push(row);
  } else {
    removeCheckedRow(row);
  }

  emit('check', newCheckedRows.value, row);

  // Emit checked rows to update user variable
  emit('update:checkedRows', newCheckedRows.value);
}

/**
 * Check row when shift is pressed.
 */
function shiftCheckRow(row: Row, index: number, lastCheckedRowIndex: number) {
  // Get the subset of the list between the two indices
  const subset = props.data.slice(
    Math.min(index, lastCheckedRowIndex),
    Math.max(index, lastCheckedRowIndex) + 1
  );

  // Determine the operation based on the state of the clicked checkbox
  const shouldCheck = !isRowChecked(row);

  subset.forEach((item) => {
    removeCheckedRow(item);
    if (shouldCheck && props.isRowCheckable(item)) {
      newCheckedRows.value.push(item);
    }
  });
}

/**
 * Toggle to show/hide details slot
 */
function toggleDetails(row: Row) {
  const found = isVisibleDetailRow(row);

  if (found) {
    closeDetailRow(row);
    emit('details-close', row);
  } else {
    openDetailRow(row);
    emit('details-open', row);
  }

  // Syncs the detailed rows with the parent component
  emit('update:openedDetailed', visibleDetailRows.value);
}

function openDetailRow(row: Row) {
  const index = getDetailedIndex(row);
  visibleDetailRows.value.push(index);
}

function closeDetailRow(row: Row) {
  const index = getDetailedIndex(row);
  const i = visibleDetailRows.value.indexOf(index);
  if (i >= 0) {
    visibleDetailRows.value.splice(i, 1);
  }
}

function isVisibleDetailRow(row: Row) {
  const index = getDetailedIndex(row);
  return visibleDetailRows.value.indexOf(index) >= 0;
}

function isActiveDetailRow(row: Row) {
  return props.detailed && isVisibleDetailRow(row);
}

/**
 * When the rowKey is defined we use the object[rowKey] as index.
 * If not, use the object reference by default.
 */
function getDetailedIndex(row: Row) {
  const key = props.rowKey;
  return !key.length || !row ? row : row[key];
}

/**
 * Update sort state
 */
function updateSortState() {
  const sortField = props.sortField;

  const sortDirection = props.sortDirection;

  const sortColumn = newColumns.value.filter(
    (column) => column.field === sortField
  )[0];

  // Set sort state

  if (sortColumn) {
    currentSortColumn.value = sortColumn;
    isAsc.value = sortDirection.toLowerCase() !== 'desc';
  } else {
    currentSortColumn.value = null;
    return;
  }
}

/*
|--------------------------------------------------------------------------
| BaseTableColumns functions
|--------------------------------------------------------------------------
*/

function addColumn(column: BaseTableColumn) {
  defaultSlots.value.push(column);

  const slotHTMLElement = slot.value as HTMLElement;

  if (slotHTMLElement && slotHTMLElement.children) {
    nextTick(() => {
      const ids = defaultSlots.value
        .map((it) => `[data-id="${it.newKey}"]`)
        .join(',');

      const sortedIds = Array.from(slotHTMLElement.querySelectorAll(ids)).map(
        (el: Element) => el.getAttribute('data-id')
      );

      defaultSlots.value = defaultSlots.value.sort((a, b) => {
        return (
          sortedIds.indexOf(`${a.newKey}`) - sortedIds.indexOf(`${b.newKey}`)
        );
      });
    });
  }
}

function removeColumn(column: BaseTableColumn) {
  defaultSlots.value = defaultSlots.value.filter(
    (d) => d.newKey !== column.newKey
  );
}

const borderClasses = 'border-b border-slate-300';

function borderBottomClasses(index: number, row: Record<string, any>): string {
  if (index < props.data.length - 1) {
    return borderClasses;
  }

  if (isActiveDetailRow(row)) {
    return borderClasses;
  }

  return '';
}

function borderBottomDetailClasses(index: number): string {
  if (index < props.data.length - 1) {
    return borderClasses;
  }

  return '';
}

function onColumnClick(
  row: Row,
  column: BaseTableColumn,
  index: number,
  colindex: number,
  event: MouseEvent
) {
  if (column.clickable) {
    emit('cell-click', row, column, index, colindex, event);
  }
}

function nextSequence() {
  return sequence.value++;
}

function getRowIndex(row: Row, index: number): string {
  if (row.id) {
    return row.id;
  }
  if (row.key) {
    return row.key;
  }
  if (row.uuid) {
    return row.uuid;
  }
  return index + '';
}

provide('addColumn', addColumn);
provide('removeColumn', removeColumn);
provide('nextSequence', nextSequence);

defineExpose({
  newColumns,
});
</script>

<style scoped>
.th {
  @apply bg-slate-50;
  @apply sticky;
  @apply top-0;
  @apply z-[1];
  @apply border-b border-slate-300;
  @apply bg-opacity-75 backdrop-blur backdrop-filter;
}
</style>
