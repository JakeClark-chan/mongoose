import BaseSelect from './BaseSelect.vue';
import BaseInputLabel from './BaseInputLabel.vue';
import ShowValue from '../../.storybook/components/ShowValue.vue';
import { createFieldStory } from '../../.storybook/utils.js';
import { options } from '../../.storybook/utils';
import { computed } from 'vue';

export default {
  title: 'Form/BaseSelect',
  component: BaseSelect,
  args: {
    class: 'w-full',
  },
};

const Template = (args) => ({
  components: {
    BaseSelect,
    BaseInputLabel,
    ShowValue,
  },
  setup() {
    function onSubmit() {
      alert('submit');
    }
    // To test, you should try the following scenarios
    // - valid (ex: 'javascript')
    // - invalid (ex: 'test')
    // - empty string ''
    // - null
    // - undefined

    // Test on Safari AND Chrome

    // For optional, make sure the default option is selected
    // For required, try to submit, it should be prevented
    const value = ref('test');

    // Test if dynamically added options are available & selected
    const showTest = ref(false);
    setTimeout(() => {
      showTest.value = true;
    }, 3000);

    return { args, value, showTest, onSubmit };
  },
  template: `
  <form @submit.prevent="onSubmit" class="border-none">
    <BaseInputLabel :required="args.required" label="Choose your favorite programing language" />
    <BaseSelect v-model="value" v-bind="args">
      <option value="javascript">JavaScript</option>
      <option value="typescript">Typescript</option>
      <option value="golang">Golang</option>
      <option v-if="showTest" value="test">Test</option>
    </BaseSelect>
    <button type="submit" class="btn btn-primary mt-5">Submit</button>
  </form>
  <ShowValue :value="value" />
  `,
});

export const Optional = Template.bind({});
Optional.args = {
  required: false,
  placeholder: 'I dont like programing languages',
};

export const Required = Template.bind({});
Required.args = {
  required: true,
  placeholder: 'Choose a language',
};

export const Disabled = Template.bind({});
Disabled.args = {
  required: true,
  placeholder: 'Choose a language',
  disabled: true,
};

export const OptionsAsProps = (args) => ({
  components: { BaseSelect, ShowValue },
  setup() {
    const value = ref('test');
    const showTest = ref(false);

    setTimeout(() => {
      showTest.value = true;
    }, 3000);

    const options2 = computed(() => {
      if (!showTest.value) {
        return options;
      }
      return [...options, { label: 'Test', value: 'test' }];
    });
    return { args, options2, value };
  },
  template: `<BaseSelect v-model="value" v-bind="args" class="w-full" :options="options2"></BaseSelect>
  <ShowValue :value="value" />`,
});

OptionsAsProps.args = {
  required: true,
  labelKey: 'label',
  valueKey: 'value',
};

export const Field = createFieldStory({
  component: BaseSelect,
  componentName: 'BaseSelect',
  template: `<BaseSelect v-model="value" v-bind="args" class="w-full">
  <option value="javascript">JavaScript</option>
  <option value="typescript">Typescript</option>
  <option value="golang">Golang</option>
</BaseSelect>`,
  label: 'Choose your favorite programing language',
});
