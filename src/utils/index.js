export { request } from "./http/index.js";

// 获取图片尺寸 by URL
export function getImageSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
}
