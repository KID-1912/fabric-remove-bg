<script setup>
const visible = inject("cursorVisible");
const position = inject("cursorXY");
</script>

<template>
  <div
    v-show="visible"
    :style="{
      width: 10 + 'px',
      height: 10 + 'px',
      left: `${position.x}px`,
      top: `${position.y}px`,
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
