<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle
      stroke="currentColor"
      class="text-slate-200"
      :stroke-width="stroke"
      fill="transparent"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <circle
      stroke="currentColor"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :style="{ strokeDashoffset: strokeDashoffset }"
      :stroke-width="stroke"
      fill="transparent"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <text
      text-anchor="middle"
      alignment-baseline="middle"
      :x="radius"
      :y="radius + fontSize / 10"
      :style="{ fontSize: fontSize + 'px', fontWeight: 600 }"
    >
      {{ Math.round(progress * 100) }}%
    </text>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    radius: {
      default: 10,
      type: Number,
    },
    stroke: {
      default: 1,
      type: Number,
    },
    progress: {
      default: 0.5,
      type: Number,
    },
  },
  computed: {
    normalizedRadius(): number {
      return this.radius - this.stroke * 2;
    },
    circumference(): number {
      return this.normalizedRadius * 2 * Math.PI;
    },
    strokeDashoffset(): number {
      const offset =
        this.circumference - Math.min(1, this.progress) * this.circumference;
      return offset;
    },
    fontSize(): number {
      return Math.min(30, this.radius / 2.7);
    },
  },
});
</script>

<style scoped>
circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
