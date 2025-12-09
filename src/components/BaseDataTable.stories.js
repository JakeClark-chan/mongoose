import BaseDataTable from './BaseDataTable.vue';
import BaseTableColumn from './BaseTableColumn.vue';
import BaseBoolean from './BaseBoolean.vue';
import BaseSelect from './BaseSelect.vue';
import BaseBadge from './BaseBadge.vue';
import BaseAppNotifications from './BaseAppNotifications.vue';
import BaseAppDialogs from './BaseAppDialogs.vue';

export default {
  title: 'Data/BaseDataTable',
  component: BaseDataTable,
  argTypes: {},
  args: {
    url: 'https://effettandem.com/api/content/articles',
    resource: 'articles',
    urlQuery: {
      per_page: 5,
    },
    historyMode: false,
  },
};

const template = `
<BaseDataTable v-bind="args" @cell-click="onCellClick">
  <BaseTableColumn
    v-slot="{ row }"
    label="Titre"
    sortable
    field="title->en"
    :toggle="false"
  >
    <div class="max-w-sm">
      <div class="font-medium text-slate-900">
        {{ row.title }}
      </div>
      <p class="text-xs leading-tight text-slate-500">
        {{ row.subtitle }}
      </p>
    </div>
  </BaseTableColumn>

  <BaseTableColumn
    v-slot="{ row }"
    label="VIP"
    field="access_level"
    sortable
  >
    <BaseBoolean :model-value="row.access_level == 'vip'" />
  </BaseTableColumn>

  <BaseTableColumn
    v-slot="{ row }"
    label="Vote"
    field="votes_avg_score"
    sortable
  >
    <div class="">
      {{ Math.round(row.votes_avg_score) }} / 5
    </div>
  </BaseTableColumn>

  <BaseTableColumn
    v-slot="{ row }"
    label="Access level"
    field="access_level"
    sortable
    optional
  >
    <BaseBadge>
      {{ row.access_level }}
    </BaseBadge>
  </BaseTableColumn>

  <template #detail="{ row }">
    <div class="p-4 text-sm">
      <p>ID : {{ row.id }}</p>
      <p>Created at : {{ row.created_at }}</p>
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
</BaseDataTable>
<BaseAppNotifications></BaseAppNotifications>
<BaseAppDialogs></BaseAppDialogs>
`;

const Template = (args) => ({
  components: {
    BaseDataTable,
    BaseTableColumn,
    BaseBoolean,
    BaseSelect,
    BaseBadge,
    BaseAppNotifications,
    BaseAppDialogs,
  },
  setup() {
    function onCellClick() {
      alert('cell click!');
    }

    return { args, onCellClick };
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
  checkable: true,
  checkableActions: [
    {
      label: 'Delete all',
      action: () => {
        alert('delete!');
      },
    },
  ],
  detailed: true,
  maxHeight: 400,
  editUrl() {
    return '/';
  },
  deleteUrl() {
    return '/';
  },
};

const SimpleTemplate = (args) => ({
  components: {
    BaseDataTable,
    BaseTableColumn,
    BaseBoolean,
  },
  setup() {
    return { args };
  },
  template: `
  <BaseDataTable v-bind="args">
    <BaseTableColumn
      v-slot="{ row }"
      label="Titre"
      sortable
      field="title->en"
      :toggle="false"
    >
      <div class="max-w-sm">
        <div class="font-medium text-slate-900">
          {{ row.title }}
        </div>
        <p class="text-xs leading-tight text-slate-500">
          {{ row.subtitle }}
        </p>
      </div>
    </BaseTableColumn>
  
    <BaseTableColumn
      v-slot="{ row }"
      label="VIP"
      field="access_level"
      sortable
    >
      <BaseBoolean :model-value="row.access_level == 'vip'" />
    </BaseTableColumn>
  
    <BaseTableColumn
      v-slot="{ row }"
      label="Vote"
      field="votes_avg_score"
      sortable
    >
      <div class="">
        {{ Math.round(row.votes_avg_score) }} / 5
      </div>
    </BaseTableColumn>
  </BaseDataTable>
  `,
});

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  searchable: false,
  toggleable: false,
  actions: [],
};
