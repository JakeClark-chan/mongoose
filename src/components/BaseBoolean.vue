<template>
  <div
    class="inline-flex h-5 w-5 items-center justify-center rounded-full"
    :class="classes"
  >
    <div v-if="modelValue">
      <BaseIcon icon="heroicons-solid:check" />
    </div>
    <div v-else>
      <BaseIcon icon="heroicons-solid:x" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: true,
    type: [Boolean, String, Number],
  },
});

const classes = computed(() => {
  if (props.modelValue) {
    return 'text-white bg-green-500';
  }
  return 'text-white bg-red-500';
});
</script>
