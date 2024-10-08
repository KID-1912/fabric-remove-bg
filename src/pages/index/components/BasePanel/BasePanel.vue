<script setup>
import { useDraggable } from "../../composables/useDraggable.js";
import { useWheel } from "../../composables/useWheel.js";

const emit = defineEmits(["onDrag", "onWheel"]);

const basePanelRef = ref(null);

// 拖动位置
const { x, y, draggable, setDraggable, setPosition } = useDraggable(basePanelRef, {
  enabled: false,
  onDrag: (position) => emit("onDrag", position),
});

// 面板大小
const width = ref(0);
const height = ref(0);
const getWidthHeight = () => ({ width: width.value, height: height.value });
const setWidthHeight = (options) => {
  width.value = options.width;
  height.value = options.height;
};

// 滚轮缩放
const scaleStep = 0.2;
const onWheel = (dy, isTrusted = true) => {
  const diff = dy > 0 ? -scaleStep : scaleStep;
  const oldWidthHeight = { width: width.value, height: height.value };
  setWidthHeight({
    width: width.value * (1 + diff),
    height: height.value * (1 + diff),
  });
  const leftOffset = (width.value - oldWidthHeight.width) >> 1;
  const topOffset = (height.value - oldWidthHeight.height) >> 1;
  setPosition({ x: x.value - leftOffset, y: y.value - topOffset });
  isTrusted && emit("onWheel", dy);
};
const triggerWheel = (dy) => onWheel(dy, false);
useWheel(basePanelRef, { onWheel });

defineExpose({
  setDraggable,
  setXY: setPosition,
  getWidthHeight,
  setWidthHeight,
  triggerWheel,
});
</script>

<template>
  <div
    ref="basePanelRef"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      left: `${x.toFixed()}px`,
      top: `${y.toFixed()}px`,
    }"
    :class="{ draggable }"
    class="base-panel"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.base-panel {
  position: absolute;
  touch-action: none;

  &.draggable {
    cursor: grab;
  }
}
</style>
