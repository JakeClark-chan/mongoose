import BaseMediaItem from './BaseMediaItem.vue';

export default {
  title: 'Components/BaseMediaItem',
  component: BaseMediaItem,
  args: {},
};

const Template = (args) => ({
  components: {
    BaseMediaItem,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseMediaItem v-bind="args" />
  `,
});

export const Demo = Template.bind({});
Demo.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.jpg',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    mime_type: 'image',
    size: 430 * 1024,
  },
};

export const PDF = Template.bind({});
PDF.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'document.pdf',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    mime_type: 'application/pdf',
    size: 430 * 1024,
  },
};
