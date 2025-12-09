import BaseApp from './BaseApp.vue';
import BaseMediaLibrary from './BaseMediaLibrary.vue';
import { createFieldStory } from '@/../.storybook/utils';

const mediaModel = {
  id: 'xxxxx',
  file_name: 'picture0-1-2dfjjje-23refg-45t.jpg',
  mime_type: 'image/jpg',
  url: 'https://images.unsplash.com/photo-1670139018938-af8bf748a1bc?auto=format&fit=crop&w=1200&h=800&q=80',
  size: 430 * 1024,
};

export default {
  title: 'Form/BaseMediaLibrary',
  component: BaseMediaLibrary,
  args: {
    max: null,
    min: 2,
    acceptedExtensions: ['jpg', 'png'],
    uploadUrl: 'https://api.com/upload',
    maxSize: 500 * 1024,
    currentMedia: [
      mediaModel,
      {
        id: '1',
        url: '',
        mime_type: 'application/pdf',
        file_name: 'document.pdf',
        size: 40012,
      },
      {
        id: '2',
        url: '',
        mime_type: 'application/excel',
        file_name: 'finance-2022.xlsx',
        size: 5461,
      },
      {
        id: '3',
        url: '',
        mime_type: 'image/png',
        file_name: '34345-1.png',
        size: 40012,
      },
      {
        id: '4',
        url: '',
        mime_type: 'audio/mp3',
        file_name: 'test.mp3',
        size: 792834,
      },
    ],
  },
};

const Template = (args) => ({
  components: {
    BaseApp,
    BaseMediaLibrary,
  },
  setup() {
    return { args };
  },
  template: `
    <BaseMediaLibrary v-bind="args" />
    <BaseApp></BaseApp>
  `,
});

export const Demo = Template.bind({});
Demo.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Field = createFieldStory({
  component: BaseMediaLibrary,
  componentName: 'BaseMediaLibrary',
});
