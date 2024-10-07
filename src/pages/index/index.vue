<script setup>
import { getImageSize } from "@/utils/index.js";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import BasePanel from "./components/BasePanel/BasePanel.vue";
import ImagePanel from "./components/ImagePanel/ImagePanel.vue";
import FabricPanel from "./components/FabricPanel/FabricPanel.vue";
import { calcAdaptScale, calcCenterPosition } from "./helper/calculate.js";
import { provide } from "vue";
const formImage = new URL("@/assets/images/person.jpg", import.meta.url).href;
const resultImage = new URL("@/assets/images/person.png", import.meta.url).href;

// 原图片
const fromImageURL = ref("");
onMounted(async () => {
  // 图片原尺寸
  const imageSize = await getImageSize(formImage);
  const panelContainerDOM = document.querySelector(".panel-container.left-border");
  const panelContainerSize = {
    width: panelContainerDOM.clientWidth,
    height: panelContainerDOM.clientHeight,
  };
  // 自适应容器宽高
  const adaptScale = calcAdaptScale(imageSize, panelContainerSize);
  const percentage = 0.8; // 不占满容器；
  const width = imageSize.width * adaptScale * percentage;
  const height = imageSize.height * adaptScale * percentage;
  formImageBasePanel.value.setWidthHeight({ width, height });
  fabricBasePanel.value.setWidthHeight({ width, height });
  // 内容居中
  const { x, y } = calcCenterPosition({ width, height }, panelContainerSize);
  formImageBasePanel.value.setXY({ x, y });
  fabricBasePanel.value.setXY({ x, y });
  // 初始化面板
  fromImageURL.value = formImage;
  fabricPanel.value.initFabric({ width, height, fromImage: resultImage });
});

// 左侧图片面板
const formImageBasePanel = ref(null);

// 右侧fabric画布面板
const fabricBasePanel = ref(null);
const fabricPanel = ref(null);
const onFabricCanvasInitialized = () => {
  console.log("初始化完成");
};

// cursor
const cursorVisible = ref(false);
provide("cursorVisible", cursorVisible);
const cursorXY = ref({ x: 0, y: 0 });
provide("cursorXY", cursorXY);
// 移入显示cursor
const onMouseenter = () => {
  cursorVisible.value = true;
};
// 移出隐藏cursor
const onMouseleave = () => {
  cursorVisible.value = false;
};
// cursor跟随鼠标
const onMousemove = (event) => {
  const rect = event.target.getBoundingClientRect();
  cursorXY.value = { x: event.clientX - rect.x, y: event.clientY - rect.y };
};

// 擦除/修补画笔
const onChangePencil = (pencil) => {
  fabricPanel.value.setIsDrawingMode(true);
  fabricPanel.value.setDrawingBrush({
    inverted: pencil.mode === "patch",
    width: pencil.radius,
  });
};
</script>

<template>
  <div class="flex h-full">
    <Sidebar @change-pencil="onChangePencil" />
    <div class="wrapper">
      <div class="panel-container">
        <BasePanel ref="formImageBasePanel" class="panel">
          <ImagePanel :from-image-u-r-l="fromImageURL"></ImagePanel>
        </BasePanel>
      </div>
      <div class="panel-container left-border">
        <BasePanel
          ref="fabricBasePanel"
          class="panel"
          @mousemove="onMousemove"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
        >
          <FabricPanel ref="fabricPanel" @initialized="onFabricCanvasInitialized"></FabricPanel>
        </BasePanel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex: 1;
  height: 100%;
  background-color: #f5f7fd;
}
.panel-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 50%;
  &.left-border {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .panel,
  .panel:deep(canvas) {
    // cursor: grab !important;
  }
}
</style>
