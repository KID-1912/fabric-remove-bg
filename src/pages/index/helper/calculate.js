// 根据内容宽高、容器宽高，计算内容自适应容器时比例
export const calcAdaptScale = (contentSize, containerSize) => {
  const { width: contentWidth, height: contentHeight } = contentSize;
  const { width: containerWidth, height: containerHeight } = containerSize;
  const adaptScale = Math.min(containerWidth / contentWidth, containerHeight / contentHeight);
  const scale = Math.floor(adaptScale * 100) / 100;
  return scale;
};

// 根据内容宽高、容器宽高，计算内容居中位置坐标
export const calcCenterPosition = (contentSize, containerSize) => {
  const position = {
    x: Math.round((containerSize.width - contentSize.width) / 2),
    y: Math.round((containerSize.height - contentSize.height) / 2),
  };
  return position;
};
