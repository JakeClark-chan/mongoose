import BaseMediaPreview from './BaseMediaPreview.vue';

export default {
  title: 'Components/BaseMediaPreview',
  component: BaseMediaPreview,
};

const Template = (args) => ({
  components: {
    BaseMediaPreview,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseMediaPreview v-bind="args" class="w-20 h-20" />
  `,
});

export const Image = Template.bind({});
Image.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.jpg',
    mime_type: 'image/jpg',
    size: 430 * 1024,
  },
};

export const ImageUrl = Template.bind({});
ImageUrl.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.jpg',
    mime_type: 'image/jpg',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    size: 430 * 1024,
  },
};

export const PDF = Template.bind({});
PDF.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.pdf',
    mime_type: 'application/pdf',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    size: 430 * 1024,
  },
};

export const Music = Template.bind({});
Music.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.mp3',
    mime_type: 'audio/mpeg',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    size: 430 * 1024,
  },
};

export const Other = Template.bind({});
Other.args = {
  media: {
    id: 'xxxxxxxxxxx',
    file_name: 'picture.mp3',
    mime_type: 'application/excel',
    url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=800&h=800&q=80',
    size: 430 * 1024,
  },
};
