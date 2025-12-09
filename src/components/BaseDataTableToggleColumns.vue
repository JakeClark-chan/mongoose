<template>
  <ul>
    <li v-for="col in toggleableColumns" :key="col.newKey">
      <label>
        <input
          :checked="visibleColumns.includes(col.newKey)"
          type="checkbox"
          class="mr-1.5 h-3.5 w-3.5 rounded focus:ring-1 focus:ring-primary-300 focus:ring-offset-1"
          :value="col.newKey"
          @change="onVisibleColumnChange($event, col.newKey)"
        />
        <span class="text-xs text-slate-600">
          {{ col.label }}
        </span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { PropType } from 'vue';
import BaseTable from './BaseTable.vue';

const props = defineProps({
  table: {
    required: true,
    type: [Object, null] as PropType<InstanceType<typeof BaseTable> | null>,
  },
  visibleColumns: {
    required: true,
    type: Array as PropType<number[]>,
  },
});

const emit = defineEmits(['update:visibleColumns']);

const toggleableColumns = computed(() => {
  const tableVue = props.table;

  if (tableVue == null) {
    return [];
  }

  if (!tableVue.newColumns) {
    return [];
  }

  return tableVue.newColumns.filter((c) => c.toggle);
});

function onVisibleColumnChange(event: any, newKey: number) {
  const checked = event.target.checked as boolean;

  let newVisibleColumns = cloneDeep(props.visibleColumns);

  if (checked) {
    if (!newVisibleColumns.includes(newKey)) {
      newVisibleColumns.push(newKey);
    }
  } else {
    newVisibleColumns = newVisibleColumns.filter((c) => c != newKey);
  }

  emit('update:visibleColumns', newVisibleColumns);
}
</script>
