import { DragGesture } from "@use-gesture/vanilla";

export const useDraggable = (el, options) => {
  const { onDrag, ...gestureOptions } = options;
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
        onDrag?.(position);
      },
      gestureOptions,
    );
  });
  // 开启/禁用拖拽
  const draggable = ref(gestureOptions?.enabled === false ? false : true);
  const setDraggable = (enabled) => {
    draggable.value = enabled;
    dragGesture.setConfig({ enabled });
  };
  // 设置位置坐标
  const setPosition = ({ x, y }) => {
    position.x = x;
    position.y = y;
  };
  return {
    ...toRefs(position),
    position,
    draggable,
    setDraggable,
    setPosition,
  };
};
