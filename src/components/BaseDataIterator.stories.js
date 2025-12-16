import BaseDataIterator from './BaseDataIterator.vue';
import BaseSelect from './BaseSelect.vue';
import BaseCard from './BaseCard.vue';
import BaseCardRow from './BaseCardRow.vue';
import BaseLoadingCover from './BaseLoadingCover.vue';

export default {
  title: 'Data/BaseDataIterator',
  component: BaseDataIterator,
  argTypes: {},
  args: {
    url: 'https://effettandem.com/api/content/articles',
    urlQuery: {
      per_page: 5,
    },
    history: false,
  },
};

const template = `
<BaseDataIterator v-bind="args" :url-query="urlQuery">
  <template #default="{ items, loading }">
    <div class="relative">
      <div class="space-y-1.5">
        <a
          v-for="item in items"
          :key="item.id"
          :href="item.website_url"
          target="_blank"
          class="block group"
        >
          <BaseCard class="group-hover:bg-slate-100">
            <BaseCardRow size="sm">
              <div class="font-medium text-slate-900">
                {{ item.title }}
              </div>
              <p class="text-xs leading-tight text-slate-500">
                {{ item.subtitle }}
              </p>
            </BaseCardRow>
          </BaseCard>
        </a>
      </div>

      <BaseLoadingCover
        v-show="loading"
        size="lg"
        backdropClass="bg-white bg-opacity-50"
      >
      </BaseLoadingCover>
    </div>
  </template>

  <template #filters="{ query, updateQueryValue }">
    <div class="space-y-3">
      <div>
        <p class="mb-1 text-sm">
          Type
        </p>
        <BaseSelect
          :model-value="query.type ?? null"
          class="w-full rounded border-slate-300"
          placeholder="-"
          @update:model-value="updateQueryValue('type', $event)"
        >
          <option value="video">
            Video
          </option>
          <option value="article">
            Article
          </option>
        </BaseSelect>
      </div>
      <div>
        <p class="mb-1 text-sm">
          Access Level
        </p>
        <BaseSelect
          :model-value="query.access_level ?? null"
          class="w-full rounded border-slate-300"
          placeholder="-"
          @update:model-value="updateQueryValue('access_level', $event)"
        >
          <option value="public">
            Public
          </option>
          <option value="member">
            Member
          </option>
          <option value="vip">
            VIP
          </option>
        </BaseSelect>
      </div>
    </div>
  </template>
</BaseDataIterator>
`;

const Template = (args) => ({
  components: {
    BaseDataIterator,
    BaseCard,
    BaseCardRow,
    BaseLoadingCover,
    BaseSelect,
  },
  setup() {
    const urlQuery = ref({});

    setTimeout(() => {
      urlQuery.value = {
        type: 'video',
      };
    }, 3000);

    return { args, urlQuery };
  },
  template: template,
});

export const Demo = Template.bind({});
Demo.args = {
  searchable: true,
  actions: [
    {
      label: 'Open Google',
      icon: 'heroicons:link',
      href: 'https://google.com',
    },
    {
      label: 'Export',
      icon: 'heroicons:table-cells',
      action: () => alert('export!'),
    },
    { line: true },
    {
      label: 'Delete all',
      icon: 'heroicons:trash',
      action: () => alert('Delete All!'),
      color: 'danger',
    },
  ],
};

const SimpleTemplate = (args) => ({
  components: {
    BaseDataIterator,
    BaseCard,
    BaseCardRow,
    BaseLoadingCover,
  },
  setup() {
    return { args };
  },
  template: `
  <BaseDataIterator v-bind="args">
    <template #default="{ items, loading }">
      <div class="relative">
        <div class="space-y-1.5">
          <a
            v-for="item in items"
            :key="item.id"
            :href="item.website_url"
            target="_blank"
            class="block group"
          >
            <BaseCard class="group-hover:bg-slate-100">
              <BaseCardRow size="sm">
                <div class="font-medium text-slate-900">
                  {{ item.title }}
                </div>
                <p class="text-xs leading-tight text-slate-500">
                  {{ item.subtitle }}
                </p>
              </BaseCardRow>
            </BaseCard>
          </a>
        </div>
  
        <BaseLoadingCover
          v-show="loading"
          size="lg"
          backdropClass="bg-white bg-opacity-50"
        >
        </BaseLoadingCover>
      </div>
    </template>
  </BaseDataIterator>
  `,
});

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  searchable: false,
  actions: [],
};
