<template>
  <BaseCard>
    <div class="">
      <dl class="divide-y divide-slate-200">
        <slot />
      </dl>
    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from './BaseCard.vue';
</script>
