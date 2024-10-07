import { DragGesture } from "@use-gesture/vanilla";

export const useDraggable = (el, options) => {
  // 初始化
  let dragGesture;
  const position = reactive({ x: 0, y: 0 });
  onMounted(() => {
    el = toValue(el);
    dragGesture = new DragGesture(
      el,
      ({ delta }) => {
        const [dx, dy] = delta;
        position.x += dx;
        position.y += dy;
      },
      options,
    );
  });
  // 开启/禁用拖拽
  const setDraggable = (enabled) => {
    dragGesture.setConfig({ drag: { enabled } });
  };
  // 设置位置坐标
  const setPosition = ({ x, y }) => {
    position.x = x;
    position.y = y;
  };
  return {
    ...toRefs(position),
    position,
    setDraggable,
    setPosition,
  };
};
