<template>
  <div
    class="base-rich-text relative"
    :class="[hasErrorInternal ? 'error' : '']"
  >
    <quill-editor
      :name="nameInternal"
      :required="requiredInternal"
      :theme="theme"
      :toolbar="toolbar"
      :placeholder="placeholder"
      :content="modelValue ?? ''"
      :read-only="disabled"
      :enable="enable"
      content-type="html"
      @update:content="emitUpdate(updateChange($event))"
    >
    </quill-editor>
  </div>
</template>

<script lang="ts" setup>
import { isString, trim } from 'lodash';
import { PropType } from 'vue';
import { useField } from '@/composables/field';

import { QuillEditor } from '@vueup/vue-quill';
import Delta from 'quill-delta';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  modelValue: {
    default: undefined,
    type: [String, Delta, null, undefined] as PropType<
      string | Delta | null | undefined
    >,
  },
  theme: {
    type: String as PropType<'' | 'snow' | 'bubble'>,
    default: 'snow',
  },
  toolbar: {
    type: [String, Array, Object] as PropType<
      string | unknown[] | Record<string, any> | undefined
    >,
    default() {
      return ['bold', 'italic', 'underline', 'link'];
    },
  },
  placeholder: {
    type: String,
    default: '',
  },
  enable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    default: undefined,
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const { nameInternal, requiredInternal, hasErrorInternal, emitUpdate } =
  useField({
    name: computed(() => props.name),
    required: computed(() => props.required),
    hasError: computed(() => props.hasError),
    emit: emit,
  });

function updateChange(value: string | null): string | null {
  if (value === null) {
    return '';
  }

  if (isString(value)) {
    return trim(value);
  }

  return '';
}
</script>

<style lang="postcss">
.base-rich-text {
  .ql-toolbar.ql-snow {
    @apply rounded-t border-slate-300 font-sans;
  }
  .ql-container.ql-snow {
    @apply rounded-b border-slate-300 font-sans;
  }
  .ql-container {
    @apply font-sans;
  }
  &.error {
    & .ql-toolbar.ql-snow,
    & .ql-container.ql-snow {
      @apply border-red-500;
    }
  }
  .ql-tooltip {
    @apply z-menu;
  }
  .ql-container {
    @apply text-slate-900;
  }

  .ql-editor.ql-blank::before {
    @apply text-base text-slate-400;
  }

  /** Style Prose */
  .ql-editor {
    h1 {
      @apply mt-0 mb-8 text-4xl font-bold leading-snug tracking-normal;
    }
    h2 {
      @apply mt-6 mb-4 text-3xl font-bold leading-snug tracking-normal;
    }
    h3 {
      @apply mt-5 mb-3 text-2xl font-bold leading-snug tracking-normal;
    }
    h4 {
      @apply mt-4 mb-2 text-xl font-bold leading-snug tracking-normal;
    }
    p {
      @apply my-5 text-base leading-relaxed;
      &:first-child {
        @apply mt-0;
      }
    }
    ol,
    ul {
      padding-left: 2rem;
      li {
        @apply my-2 text-base leading-relaxed;
        padding-left: 0.5rem;

        &::before {
          @apply text-slate-500;
          width: 2em;
          text-align: left;
          position: absolute;
          left: 3rem;
        }
      }
    }
    blockquote {
      @apply my-5 text-base;
    }
    pre {
      @apply my-5 p-4 text-sm;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
