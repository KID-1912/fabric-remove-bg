import * as http from "@/api/index.js";

export const useRemoveBg = (defaultImageURL = "") => {
  defaultImageURL = toValue(defaultImageURL);
  const fromImageURL = ref(defaultImageURL);
  const loading = ref(loading);
  const resultImageURL = ref("");

  const fetchRemoveBg = async (imageURL) => {
    fromImageURL.value = imageURL;
    loading.value = true;
    resultImageURL.value = "";
    try {
      const params = { image_url: imageURL, size: "auto" };
      const res = await http.fetchRemoveBg(params);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    loading.value = false;
  };

  defaultImageURL && fetchRemoveBg(defaultImageURL);

  return {
    loading,
    fromImageURL,
    resultImageURL,
  };
};
