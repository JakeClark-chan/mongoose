import BaseTimelineItem from './BaseTimelineItem.vue';

const colors = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'grey',
  'black',
];

export default {
  title: 'Components/BaseTimelineItem',
  component: BaseTimelineItem,
};

const Template = (args) => ({
  components: { BaseTimelineItem },
  setup() {
    return { args };
  },
  template: `<div class="max-w-md"><BaseTimelineItem v-bind="args"/></div>`,
});

const ColorsTemplate = (args) => ({
  components: { BaseTimelineItem },
  setup() {
    const items = colors.map((color) => {
      return {
        title: 'Advanced to phone screening by Bethany Blake',
        icon: 'heroicons:shield-check-20-solid',
        description:
          'Lorem nostrud quis aute elit ea Lorem magna eiusmod ipsum. Eu ipsum eiusmod ad minim adipisicing irure. Fugiat ut adipisicing consequat dolor.',
        color: color,
        date: '15 Jan',
      };
    });
    return { args, items };
  },
  template: `
  <div class="max-w-md">
  <ul role="list" class="-mb-8">
  <li v-for="(item, index) in items" :key="index">
  <p class="text-xs text-slate-600 leading-tight mb-4">{{ item.color }}</p>
        <div class="relative pb-8">
          <BaseTimelineItem :item="item" />
        </div>
      </li>
      </ul>
      </div>
  `,
});

export const Simple = Template.bind({});
Simple.args = {
  item: {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description: '',
    color: 'warning',
    date: '15 Jan',
  },
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  item: {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description:
      'Lorem nostrud quis aute elit ea Lorem magna eiusmod ipsum. Eu ipsum eiusmod ad minim adipisicing irure. Fugiat ut adipisicing consequat dolor.',
    color: 'primary',
    date: '15 Jan',
  },
};

export const Colors = ColorsTemplate.bind({});
