<script setup>
import { fabric } from "fabric";
import { useFabric } from "../../composables/useFabric.js";
import Cursor from "../Cursor.vue";
import { createHistory } from "fabricjs-history";
import { saveAs } from "file-saver";

const props = defineProps({
  fromImage: { type: String, required: true },
  fromImageSize: { type: Object, required: true },
  removeBgImage: { type: String, required: true },
  fabricOptions: { type: Object, required: true },
});
const emit = defineEmits(["initialized"]);

// 初始化画布
const fabricCanvasRef = ref(null);
let fabricInstance;
const isAvailable = ref(false);
const initFabric = async () => {
  const { fromImage, removeBgImage, fabricOptions } = props;
  // 创建fabric实例
  const defaultOptions = {
    selection: false,
    hoverCursor: "default",
    freeDrawingCursor: "default",
    isDrawingMode: false,
  };
  fabricInstance = useFabric(fabricCanvasRef.value, { ...defaultOptions, ...fabricOptions });
  // 加载底图
  fabric.Image.fromURL(
    fromImage,
    function (img) {
      img.scaleToWidth(fabricInstance.width);
      img.scaleToHeight(fabricInstance.height);
      img.set("selectable", false);
      // 底图默认被擦除
      let path = new fabric.Path(
        `M 0 0 L ${img.width} 0 L ${img.width} ${img.height} L 0 ${img.height} z`,
      );
      path.set("globalCompositeOperation", "destination-out");
      fabric.EraserBrush.prototype._addPathToObjectEraser(img, path);
      fabricInstance.add(img);
    },
    { crossOrigin: "Anonymous" },
  );
  // 加载抠图
  fabric.Image.fromURL(
    removeBgImage,
    function (img) {
      img.scaleToWidth(fabricInstance.width);
      img.scaleToHeight(fabricInstance.height);
      img.set("selectable", false);
      fabricInstance.add(img);
      createHistory({ canvas: fabricInstance, historyEvent: ["erasing:end"] });
      isAvailable.value = true;
      emit("initialized", fabricInstance);
    },
    { crossOrigin: "Anonymous" },
  );
};
onMounted(initFabric);
onUnmounted(() => {
  fabricInstance?.dispose();
});

// 画布绘制模式
const getIsDrawingMode = () => fabricInstance.isDrawingMode;
const setIsDrawingMode = (isDrawingMode) => {
  fabricInstance.set("isDrawingMode", isDrawingMode);
};
const setDrawingBrush = ({ inverted, width }) => {
  const eraserBrush = new fabric.EraserBrush(fabricInstance);
  eraserBrush.inverted = inverted;
  eraserBrush.width = width;
  fabricInstance.freeDrawingBrush = eraserBrush;
};
const setDrawingBrushWidth = (width) => {
  fabricInstance.freeDrawingBrush.width = width;
};

// 设置画布大小
const setWidthHeight = ({ width, height }) => {
  const zoom = (width * fabricInstance.getZoom()) / fabricInstance.getWidth();
  fabricInstance.setWidth(width);
  fabricInstance.setHeight(height);
  fabricInstance.setZoom(zoom);
};

// 设置画布背景色
const setBackgroundColor = (color) => {
  fabricInstance.setBackgroundImage(null);
  fabricInstance.setBackgroundColor(color, fabricInstance.renderAll.bind(fabricInstance));
  fabricInstance.record();
};

// 设置画布背景图
const setBackgroundImage = (url) => {
  fabric.Image.fromURL(
    url,
    function (img) {
      let scaleX = fabricInstance.width / img.width;
      let scaleY = fabricInstance.height / img.height;
      const scale = Math.ceil(Math.max(scaleX, scaleY) * 100) / 100;
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: fabricInstance.width >> 1,
        top: fabricInstance.height >> 1,
        originX: "center",
        originY: "center",
      });
      img.set("erasable", false);
      fabricInstance.setBackgroundColor("");
      fabricInstance.setBackgroundImage(img);
      fabricInstance.renderAll();
      fabricInstance.record();
    },
    { crossOrigin: "Anonymous" },
  );
};

// 导出画布为图片
const saveAsImage = () => {
  const currentZoom = fabricInstance.getZoom();
  const currentWidth = fabricInstance.width;
  const currentHeight = fabricInstance.height;
  fabricInstance.setDimensions({
    width: props.fromImageSize.width,
    height: props.fromImageSize.height,
  });
  fabricInstance.setZoom(1);
  const dataURL = fabricInstance.toDataURL();
  saveAs(dataURL, "image.png");
  fabricInstance.setDimensions({
    width: currentWidth,
    height: currentHeight,
  });
  fabricInstance.setZoom(currentZoom);
};

defineExpose({
  isAvailable,
  initFabric,
  getIsDrawingMode,
  setIsDrawingMode,
  setDrawingBrush,
  setDrawingBrushWidth,
  setWidthHeight,
  setBackgroundColor,
  setBackgroundImage,
  saveAsImage,
});
</script>

<template>
  <canvas ref="fabricCanvasRef"></canvas>
  <Cursor />
</template>

<style lang="scss" scoped></style>
