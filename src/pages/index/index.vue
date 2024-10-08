<script setup>
import { getImageSize } from "@/utils/index.js";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import ControlBar from "./components/ControlBar/ControlBar.vue";
import BasePanel from "./components/BasePanel/BasePanel.vue";
import ImagePanel from "./components/ImagePanel/ImagePanel.vue";
import FabricPanel from "./components/FabricPanel/FabricPanel.vue";
import { calcAdaptScale, calcCenterPosition } from "./helper/calculate.js";
const formImage = new URL("@/assets/images/person.jpg", import.meta.url).href;
const resultImage = new URL("@/assets/images/person.png", import.meta.url).href;

// 原图片
const fromImageURL = ref("");
const fromImageSize = ref({ width: 0, height: 0 });
onMounted(async () => {
  // 图片原尺寸
  const imageSize = await getImageSize(formImage);
  fromImageSize.value = { width: imageSize.width, height: imageSize.height };
  const panelContainerDOM = document.querySelector(".panel-container.left-border");
  const panelContainerSize = {
    width: panelContainerDOM.clientWidth,
    height: panelContainerDOM.clientHeight,
  };
  // 自适应容器宽高
  const adaptScale = calcAdaptScale(imageSize, panelContainerSize);
  const percentage = 0.8; // 不占满容器；
  scaleRatio.value = Math.floor(adaptScale * percentage * 100) / 100;
  const width = imageSize.width * scaleRatio.value;
  const height = imageSize.height * scaleRatio.value;
  formImageBasePanel.value.setWidthHeight({ width, height });
  fabricBasePanel.value.setWidthHeight({ width, height });
  // 内容居中
  const { x, y } = calcCenterPosition({ width, height }, panelContainerSize);
  formImageBasePanel.value.setXY({ x, y });
  fabricBasePanel.value.setXY({ x, y });
  // 初始化面板
  fromImageURL.value = formImage;
  fabricPanel.value.initFabric({ width, height, fromImage: formImage, removeBgImage: resultImage });
});

// 左侧图片
const formImageBasePanel = ref(null); // fromImage图片面板

// 右侧fabric画布
const fabricBasePanel = ref(null); // fabric基础面板
const fabricPanel = ref(null); // fabric画布面板
let fabricContext; // fabric画布
const onFabricCanvasInitialized = (context) => {
  fabricContext = context;
};

// cursor
const cursor = ref({
  visible: false,
  position: { x: 0, y: 0 },
  radius: 15,
});
provide("cursor", cursor);
// 移入显示cursor
const onMouseenter = () => {
  if (fabricPanel.value.getIsDrawingMode() === false) return;
  cursor.value.visible = true;
};
// 移出隐藏cursor
const onMouseleave = () => {
  cursor.value.visible = false;
};
// cursor跟随鼠标
const onMousemove = (event) => {
  if (cursor.value.visible === false) return;
  const rect = event.target.getBoundingClientRect();
  cursor.value.position = { x: event.clientX - rect.x, y: event.clientY - rect.y };
};

// 切换擦除/修补画笔
const pencil = ref({ mode: "none", radius: 15 });
const onChangePencilMode = (mode) => {
  pencil.value.mode = mode;
  fabricPanel.value.setIsDrawingMode(true);
  fabricPanel.value.setDrawingBrush({
    inverted: pencil.value.mode === "patch",
    width: pencil.value.radius,
  });
  fabricBasePanel.value.setDraggable(false);
  formImageBasePanel.value.setDraggable(false);
};
// 修改画笔半径粗细
const onChangePencilRadius = (radius) => {
  cursor.value.radius = radius;
  pencil.value.radius = radius;
  fabricPanel.value.setDrawingBrush({
    inverted: pencil.value.mode === "patch",
    width: pencil.value.radius,
  });
};

// 开启/关闭拖拽
const onChangeDraggable = (draggable) => {
  fabricBasePanel.value.setDraggable(draggable);
  formImageBasePanel.value.setDraggable(draggable);
  if (pencil.value.mode !== "none") {
    fabricPanel.value.setIsDrawingMode(!draggable);
  }
};

// 画板拖拽联动
const onDragFromImageBasePanel = ({ x, y }) => {
  fabricBasePanel.value.setXY({ x, y });
};
const onDragFabricBasePanel = ({ x, y }) => {
  formImageBasePanel.value.setXY({ x, y });
};

// 画板滚轮缩放与联动
const scaleRatio = ref(1);
const onWheelFormImageBasePanel = (dy) => {
  const { width, height } = formImageBasePanel.value.getWidthHeight();
  scaleRatio.value = Math.floor((width / fromImageSize.value.width) * 100) / 100;
  fabricPanel.value.setWidthHeight({ width, height });
  fabricBasePanel.value.triggerWheel(dy);
};
const onWheelFabricBasePanel = (dy) => {
  const { width, height } = fabricBasePanel.value.getWidthHeight();
  scaleRatio.value = Math.floor((width / fromImageSize.value.width) * 100) / 100;
  fabricPanel.value.setWidthHeight({ width, height });
  formImageBasePanel.value.triggerWheel(dy);
};
</script>

<template>
  <div class="absolute">{{ scaleRatio }}</div>
  <div class="flex h-full">
    <Sidebar
      :pencil="pencil"
      @change-pencil-mode="onChangePencilMode"
      @change-pencil-radius="onChangePencilRadius"
    />
    <div class="wrapper">
      <div class="panel-container">
        <BasePanel
          ref="formImageBasePanel"
          class="panel"
          @on-drag="onDragFromImageBasePanel"
          @on-wheel="onWheelFormImageBasePanel"
        >
          <ImagePanel :from-image-u-r-l="fromImageURL"></ImagePanel>
        </BasePanel>
      </div>
      <div class="panel-container left-border">
        <BasePanel
          ref="fabricBasePanel"
          class="panel fabric-panel"
          @mousemove="onMousemove"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
          @on-drag="onDragFabricBasePanel"
          @on-wheel="onWheelFabricBasePanel"
        >
          <FabricPanel ref="fabricPanel" @initialized="onFabricCanvasInitialized"></FabricPanel>
        </BasePanel>
      </div>
    </div>
    <ControlBar class="control-bar" @change-draggable="onChangeDraggable" />
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
  .fabric-panel {
    background-repeat: repeat;
    background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8IAEQgAHgAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgGcwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBEsoPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdoaWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUCBASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQk5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQIBAQIDAgICAwQDAwMDBAUEBAQEBAUGBQUFBQUFBgYGBgYGBgYHBwcHBwcICAgICAkJCQkJCQkJCQn/2wBDAQEBAQICAgQCAgQJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQn/2gAMAwEAAhEDEQAAAf0wudZ19Qal1XVLdUtfJu2r/9oACAEBAAEFAnt3+1Dt+jtwdlZXkN5+kdvf6R2/tuP+0/vuP+0/t//aAAgBAxEBPwHs/9oACAECEQE/Aez/2gAIAQEABj8CcH+7E/w9/wBxJ/glxSyxLSlK0kkg0Aq/38f+EH+/j/wh2n/3Wr+D7k/+61fwd//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/Ib/nfH/v+d/1QvufACqpABf87/u/53/f/P8AO+f/AOD/ADvn/wB//9oADAMBAAIRAxEAABBwxQD/xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxD8H//aAAgBAhEBPxD8H//aAAgBAQABPxD/APDo0Gn6aiPACqoBr/8Al6NGjR//2Q==);
    &.draggable :deep(canvas) {
      cursor: grab !important;
    }
  }
}
.control-bar {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
