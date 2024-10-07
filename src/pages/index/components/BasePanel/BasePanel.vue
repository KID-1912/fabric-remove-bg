<script setup>
import { useDraggable } from "../../composables/useDraggable.js";

const basePanelRef = ref(null);

// 拖动位置
const { x, y, setDraggable, setPosition } = useDraggable(basePanelRef, { enabled: false });

// 面板大小
const width = ref(0);
const height = ref(0);
const setWidthHeight = (options) => {
  width.value = options.width;
  height.value = options.height;
};

defineExpose({ setDraggable, setXY: setPosition, setWidthHeight });
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
    class="base-panel"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.base-panel {
  position: absolute;
  touch-action: none;
}
</style>
