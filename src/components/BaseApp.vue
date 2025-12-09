<template>
  <div class="min-h-full">
    <slot />

    <!-- Notifications -->
    <BaseAppNotifications />

    <!-- Dialogs -->
    <BaseAppDialogs />
  </div>
</template>

<script lang="ts" setup>
import BaseAppDialogs from './BaseAppDialogs.vue';
import BaseAppNotifications from './BaseAppNotifications.vue';
</script>
