import BaseTimeline from './BaseTimeline.vue';

export default {
  title: 'Components/BaseTimeline',
  component: BaseTimeline,
};

const Template = (args) => ({
  components: { BaseTimeline },
  setup() {
    return { args };
  },
  template: `<div class="max-w-md"><BaseTimeline v-bind="args"/></div>`,
});

const items = [
  {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description:
      'Lorem nostrud quis aute elit ea Lorem magna eiusmod ipsum. Eu ipsum eiusmod ad minim adipisicing irure. Fugiat ut adipisicing consequat dolor.',
    color: null,
    date: '15 Jan',
  },
  {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description:
      'Lorem nostrud quis aute elit ea Lorem magna eiusmod ipsum. Eu ipsum eiusmod ad minim adipisicing irure. Fugiat ut adipisicing consequat dolor.',
    color: 'danger',
    date: null,
  },
  {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description:
      'Lorem nostrud quis aute elit ea Lorem magna eiusmod ipsum. Eu ipsum eiusmod ad minim adipisicing irure. Fugiat ut adipisicing consequat dolor.',
    color: 'success',
    date: '15 Jan',
  },
  {
    title: 'Advanced to phone screening by Bethany Blake',
    icon: 'heroicons:shield-check-20-solid',
    description: '',
    color: 'info',
    date: '15 Jan',
  },
];

export const Demo = Template.bind({});
Demo.args = {
  items: items,
};
