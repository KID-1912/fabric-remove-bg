import { WheelGesture } from "@use-gesture/vanilla";

export const useWheel = (el, options) => {
  const { onWheel } = options;
  // 初始化
  let wheelGesture;
  onMounted(() => {
    el = toValue(el);
    wheelGesture = new WheelGesture(el.parentNode, ({ delta }) => {
      const [, dy] = delta;
      if (dy === 0) return;
      onWheel?.(dy);
    });
  });
};
