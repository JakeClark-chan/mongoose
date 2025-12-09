import { DefineComponent, defineComponent, h } from 'vue';

/**
 * Base component to manually render the slot of component
 */
export default defineComponent({
  name: 'SlotComponent',
  props: {
    component: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      default: 'default',
    },
    props: {
      required: true,
      type: Object,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  render() {
    let slots = (this.component as DefineComponent).$slots;

    if (slots == undefined) {
      slots = (this.component as DefineComponent).slots;
    }

    const slot = slots[this.name](this.props);

    return h(this.tag, {}, slot);
  },
});
