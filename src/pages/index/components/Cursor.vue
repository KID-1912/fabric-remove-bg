<script setup>
const cursor = inject("cursor");
const scaleRatio = inject("scaleRatio");
</script>

<template>
  <div
    v-show="cursor.visible"
    :style="{
      width: `${cursor.radius}px`,
      height: `${cursor.radius}px`,
      left: `${cursor.position.x}px`,
      top: `${cursor.position.y}px`,
    }"
    class="panel-cursor"
  ></div>
</template>

<style lang="scss" scoped>
.panel-cursor {
  position: absolute;
  z-index: 999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: rgba(7, 115, 252, 0.6);
}
</style>
