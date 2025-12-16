<template>
  <div class="w-full max-w-[268px] overflow-hidden rounded border bg-white">
    <div class="flex w-full min-w-0 overflow-hidden px-3 pt-3">
      <select
        v-model="suffix"
        class="max-w-[80px] shrink-0 rounded-l border-r-0 border-slate-300 text-xs focus:border-slate-300 focus:outline-none focus:ring-0"
      >
        <option v-for="(label, key) in suffixes" :key="key" :value="key">
          {{ label }}
        </option>
      </select>

      <input
        v-model="keywords"
        type="text"
        :placeholder="$t('sui.autocomplete_placeholder')"
        class="grow rounded-r border-slate-300 text-xs"
      />
    </div>

    <div ref="drawer" class="h-44 overflow-y-auto py-2 px-3">
      <ul class="flex flex-wrap">
        <li v-for="icon in filteredIcons" :key="icon">
          <button
            type="button"
            :data-icon="icon"
            :class="[
              modelValue == icon
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-900 hover:bg-slate-200',
            ]"
            class="flex items-center justify-center rounded p-1"
            @click="onClick(icon)"
          >
            <BaseIcon :icon="icon" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseIcon } from '..';

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    collection?: string;
  }>(),
  {
    modelValue: null,
    collection: 'heroicons',
  }
);

const emit = defineEmits(['update:modelValue']);

function onClick(icon: string) {
  emit('update:modelValue', icon);
}

const icons = ref<string[]>([]);
const suffixes = ref<Record<string, string>>({});
const suffix = ref<string | null>(null);
const otherSuffixValue = computed(() => {
  return Object.keys(suffixes.value).filter((s) => {
    return s !== suffix.value;
  });
});

const drawer = ref<HTMLElement | null>(null);

const fullIcons = computed(() => {
  return icons.value.map((icon) => {
    return props.collection + ':' + icon;
  });
});

const visibleIcons = computed(() => {
  return fullIcons.value.filter((i) => {
    const matchCurrent = i.endsWith(suffix.value ?? '');

    if (!matchCurrent) {
      return false;
    }

    const matches = otherSuffixValue.value.filter((s) => {
      return i.endsWith(s);
    });

    const anotherMatchHasBiggerWeight = matches.some((m) => {
      return m.length > (suffix.value ?? '').length;
    });

    if (anotherMatchHasBiggerWeight) {
      return false;
    }

    return true;
  });
});

const keywords = ref('');

const filteredIcons = computed(() => {
  if (!keywords.value) {
    return visibleIcons.value;
  }

  return visibleIcons.value.filter((i) => {
    return i.toLocaleLowerCase().includes(keywords.value.toLowerCase());
  });
});

function fetchIcons() {
  fetch('https://api.iconify.design/collection?prefix=' + props.collection)
    .then((response) => response.json())
    .then((data) => {
      // Set icons
      icons.value = data.uncategorized;

      // Set suffix list
      suffixes.value = data.suffixes;

      // Set suffix
      selectCurrentSuffix();

      // Scroll to icon

      nextTick(() => {
        scrollToIcon();
      });
    });
}

function selectCurrentSuffix() {
  if (!props.modelValue) {
    return;
  }

  const suffixesOrderedByLength = Object.keys(suffixes.value).sort((a, b) => {
    return b.length - a.length;
  });

  for (let i = 0; i < suffixesOrderedByLength.length; i++) {
    const s = suffixesOrderedByLength[i];

    if (props.modelValue.endsWith(s)) {
      suffix.value = s;

      return;
    }
  }
}

function scrollToIcon() {
  if (!drawer.value) {
    return;
  }

  if (!props.modelValue) {
    return;
  }

  const icon = drawer.value.querySelector(
    'button[data-icon="' + props.modelValue + '"]'
  ) as HTMLElement | null;

  if (!icon) {
    return;
  }

  drawer.value.scrollTop = icon.offsetTop - 10;
}

onMounted(() => {
  fetchIcons();
});
</script>
