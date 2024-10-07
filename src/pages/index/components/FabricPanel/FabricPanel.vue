<script setup>
import { fabric } from "fabric";
import { useFabric } from "../../composables/useFabric.js";
import Cursor from "../Cursor.vue";

const props = defineProps({
  // fromImageUrl: { type: String, required: true },
});
const emit = defineEmits(["initialized"]);

// 初始化画布
const fabricCanvasRef = ref(null);
let fabricInstance;
// todo:图片改变的时候，重新初始化替换
const initFabric = async (options) => {
  const { fromImage, ...fabricOptions } = options;
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
      fabricInstance.add(img);
      emit("initialized", fabricInstance);
    },
    { crossOrigin: "Anonymous" },
  );
};

// 画布绘制模式
const setIsDrawingMode = (isDrawingMode) => {
  fabricInstance.set("isDrawingMode", isDrawingMode);
};
const setDrawingBrush = ({ inverted, width }) => {
  const eraserBrush = new fabric.EraserBrush(fabricInstance);
  eraserBrush.inverted = inverted;
  eraserBrush.width = width;
  fabricInstance.freeDrawingBrush = eraserBrush;
};

defineExpose({
  initFabric,
  setIsDrawingMode,
  setDrawingBrush,
});
</script>

<template>
  <canvas ref="fabricCanvasRef"></canvas>
  <Cursor />
</template>

<style lang="" scoped></style>
