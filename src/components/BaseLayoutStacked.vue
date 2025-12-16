<template>
  <div class="sticky top-0 z-20 w-full shadow-sm">
    <BaseSystemAlert
      v-for="systemAlert in systemAlerts"
      :key="systemAlert.id"
      :color="systemAlert.color"
      :to="systemAlert.to"
      :action="systemAlert.action"
      :closable="systemAlert.closable"
      @close="systemAlertStore.remove(systemAlert)"
    >
      {{ systemAlert.message }}
    </BaseSystemAlert>

    <BaseNavbar :dark="dark">
      <template #navbar>
        <slot name="navbar" />
      </template>

      <template #mobile>
        <slot name="mobile" />
      </template>
    </BaseNavbar>
  </div>

  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useSystemAlertStore } from '../stores/systemAlerts';
import BaseNavbar from './BaseNavbar.vue';
import BaseSystemAlert from './BaseSystemAlert.vue';

defineProps({
  dark: {
    default: false,
    type: Boolean,
  },
});

/**
 * System Alerts
 */

const systemAlertStore = useSystemAlertStore();

const systemAlerts = computed(() => {
  return systemAlertStore.systemAlerts;
});
</script>
