import { WheelGesture } from "@use-gesture/vanilla";

export const useWheel = (el, options) => {
  const { onWheel, ...gestureOptions } = options;
  // 初始化
  let wheelGesture;
  onMounted(() => {
    el = toValue(el);
    wheelGesture = new WheelGesture(
      el.parentNode,
      ({ delta }) => {
        const [, dy] = delta;
        if (dy === 0) return;
        onWheel?.(dy);
      },
      gestureOptions,
    );
  });
  // 开启/禁用滚轮
  const wheelEnable = ref(gestureOptions?.enabled === false ? false : true);
  const setWheelEnable = (enabled) => {
    wheelEnable.value = enabled;
    wheelGesture.setConfig({ enabled });
  };
  return {
    wheelEnable,
    setWheelEnable,
  };
};
