<script lang="ts">
import { defineComponent, h, PropType } from 'vue';

export default defineComponent({
  name: 'BaseTableColumn',
  props: {
    label: {
      default: '',
      type: String,
    },
    customKey: {
      default: '',
      type: [String, Number],
    },
    field: {
      default: '',
      type: String,
    },
    meta: {
      default: undefined,
      type: [Object, Array],
    },
    width: {
      default: undefined,
      type: Number,
    },
    numeric: {
      default: false,
      type: Boolean,
    },
    position: {
      default: 'left',
      type: String as PropType<'left' | 'center' | 'right'>,
    },
    searchable: {
      default: false,
      type: Boolean,
    },
    sortable: {
      default: false,
      type: Boolean,
    },
    visible: {
      default: true,
      type: Boolean,
    },
    clickable: {
      default: true,
      type: Boolean,
    },
    toggle: {
      type: Boolean,
      default: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    customSort: {
      default: undefined,
      type: Function,
    },
    customSearch: {
      default: undefined,
      type: Function,
    },
    /** Adds native attributes to th :th-attrs="(column)" => ({})" */
    thAttrs: {
      type: Function,
      default: () => ({}),
    },
    /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
    tdAttrs: {
      type: Function,
      default: () => ({}),
    },
  },
  setup() {
    const nextSequence = inject('nextSequence') as any;
    const addColumn = inject('addColumn') as any;
    const removeColumn = inject('removeColumn') as any;

    return {
      nextSequence,
      addColumn,
      removeColumn,
    };
  },
  data() {
    return {
      newKey: undefined as string | undefined,
    };
  },
  computed: {
    style() {
      return {
        width: this.width ? this.width + 'px' : undefined,
      };
    },
  },
  created() {
    if (this.customKey) {
      this.newKey = this.customKey + '';
    } else {
      this.newKey = this.nextSequence();
    }
    this.addColumn(this);
  },
  beforeUnmount() {
    this.removeColumn(this);
  },
  render() {
    // render-less
    return h('span', { 'data-id': this.newKey }, this.label);
  },
});
</script>
