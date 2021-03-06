import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

VantComponent({
  field: true,

  classes: ['icon-class'],

  props: {
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: {
      type: null,
      observer: 'setSizeWithUnit'
    },
    icon: {
      type: String,
      value: 'star'
    },
    voidIcon: {
      type: String,
      value: 'star-o'
    },
    color: {
      type: String,
      value: '#ffd21e'
    },
    voidColor: {
      type: String,
      value: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      value: '#bdbdbd'
    },
    count: {
      type: Number,
      value: 5
    },
    gutter: {
      type: null,
      observer: 'setGutterWithUnit'
    },
  },

  data: {
    innerValue: 0,
    gutterWithUnit: undefined,
    sizeWithUnit: '20px'
  },

  watch: {
    value(value: number) {
      if (value !== this.data.innerValue) {
        this.set({ innerValue: value });
      }
    }
  },

  methods: {
    setSizeWithUnit(val) {
      this.set({
        sizeWithUnit: addUnit(val)
      });
    },

    setGutterWithUnit(val) {
      this.set({
        gutterWithUnit: addUnit(val)
      });
    },

    onSelect(event: Weapp.Event) {
      const { data } = this;
      const { score } = event.currentTarget.dataset;
      if (!data.disabled && !data.readonly) {
        this.set({ innerValue: score + 1 });
        this.$emit('input', score + 1);
        this.$emit('change', score + 1);
      }
    },

    onTouchMove(event: Weapp.TouchEvent) {
      const { clientX, clientY } = event.touches[0];

      this.getRect('.van-rate__icon', true).then(
        (list: WechatMiniprogram.BoundingClientRectCallbackResult[]) => {
          const target = list
            .sort(item => item.right - item.left)
            .find(
              item =>
                clientX >= item.left &&
                clientX <= item.right &&
                clientY >= item.top &&
                clientY <= item.bottom
            );
          if (target != null) {
            this.onSelect({
              ...event,
              currentTarget: target
            });
          }
        }
      );
    }
  }
});
