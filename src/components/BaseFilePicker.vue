<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="disabled"
    @drop.prevent="
      dragging = false;
      handleDrop($event);
    "
    @dragleave.prevent="dragging = false"
    @dragover.prevent="dragging = true"
    @dragenter.prevent="dragging = true"
    @click="pickFile"
  >
    <slot :selecting="selecting" :dragging="dragging" :disabled="disabled" />
  </button>
  <input
    ref="input"
    type="file"
    :accept="accept"
    hidden="true"
    @change="onInputChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    buttonClass: {
      default: '',
      type: String,
    },
    accept: {
      default: undefined,
      type: String,
    },
  },
  emits: ['select'],
  data() {
    return {
      selecting: false,
      dragging: false,
    };
  },
  computed: {
    inputElement(): HTMLInputElement | undefined {
      return this.$refs.input as HTMLInputElement | undefined;
    },
  },
  methods: {
    async pickFile() {
      if (this.disabled) {
        return;
      }

      (this.$refs.input as HTMLElement | undefined)?.click();
    },
    onInputChange() {
      const files = (this.inputElement?.files ?? []) as File[];
      this.select(files);
    },
    handleDrop(e: any) {
      if (this.disabled) {
        return;
      }

      const files = e?.dataTransfer?.files ?? [];

      this.select(files);
    },
    async select(files: File[]) {
      if (this.disabled) {
        return;
      }

      if (!files || files.length == 0 || !(files[0] instanceof File)) {
        return;
      }

      this.selecting = true;

      try {
        const file = files[0];

        this.$emit('select', file);
      } finally {
        if (this.inputElement) {
          this.inputElement.value = '';
        }
        this.selecting = false;
      }
    },
  },
});
</script>
