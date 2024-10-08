<script setup>
const emit = defineEmits(["change-draggable"]);

// 开启/关闭拖拽
const draggable = ref(false);
const onChangeDraggable = () => {
  draggable.value = !draggable.value;
  emit("change-draggable", draggable.value);
};
</script>

<template>
  <div class="control-bar">
    <!-- <div class="control-item" @click="handleZoom(0.1)">
      <el-icon><Plus /></el-icon>
    </div>
    <div class="control-item scale-ratio">{{ parseInt(scaleRatio * 100) }}%</div>
    <div class="control-item" @click="handleZoom(-0.1)">
      <el-icon><Minus /></el-icon>
    </div>
    <div class="control-item" @click="handleAdapt">
      <SvgIcon name="adapt-screen"></SvgIcon>
    </div>  @click="handleEnableDrag" -->
    <div class="control-item" @click="onChangeDraggable">
      <mc-hand-line />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  background-color: #fff;
  .control-item {
    cursor: pointer;
    padding: 6px;
    margin: 0 10px;
    font-size: 16px;
    line-height: 1;
    user-select: none;
    &:hover {
      background-color: #f5f7fd;
    }
  }
  // .scale-ratio {
  //   min-width: 56px;
  //   text-align: center;
  //   margin: 0;
  // }
}
</style>
