import { blobToDataURL, imgSrcToBlob } from "blob-util";
import * as http from "@/api/index.js";
const exampleFormImage = new URL("@/assets/images/person.jpg", import.meta.url).href;
const exampleResultImage = new URL("@/assets/images/person.png", import.meta.url).href;

export const useRemoveBg = (defaultImageURL = exampleFormImage) => {
  defaultImageURL = toValue(defaultImageURL);
  const fromImageURL = ref(defaultImageURL);
  const loading = ref(false);
  const finished = ref(false);
  const resultImageURL = ref("");

  const fetchRemoveBg = async (imageURL) => {
    if (!imageURL) {
      console.warn("imageURL is required");
      return;
    }
    fromImageURL.value = imageURL;
    loading.value = true;
    finished.value = false;
    resultImageURL.value = "";
    try {
      // 示例图
      if (imageURL === exampleFormImage) {
        resultImageURL.value = await new Promise((resolve) => {
          setTimeout(() => resolve(exampleResultImage), 2000);
        });
      }
      // 其它图片
      else {
        const file = await imgSrcToBlob(imageURL);
        // const params = { image_file: file };
        // const blob = await http.fetchRemoveBg(params); // 使用 remove.bg API
        // const blob = await http.fetchRemoveBg2(params); // 使用 clipdrop API
        const params = { file };
        const blob = await http.fetchKoutu(params); // 使用 Koutu API
        resultImageURL.value = await blobToDataURL(blob);
      }
    } catch (error) {
      console.error(error);
      if (error.code === 402) {
        alert("接口次数已耗尽，请改用其它API key");
      } else {
        alert("智能抠图失败");
      }
    }
    loading.value = false;
    finished.value = true;
  };

  defaultImageURL && fetchRemoveBg(defaultImageURL);

  return {
    loading,
    finished,
    fromImageURL,
    resultImageURL,
    fetchRemoveBg,
  };
};
