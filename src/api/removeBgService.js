import { request } from "@/utils/index.js";
const VITE_APP_REMOVE_BG_KEY = import.meta.env.VITE_APP_REMOVE_BG_KEY;

export function fetchRemoveBg(data) {
  return request.post("https://api.remove.bg/v1.0/removebg", data, {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": VITE_APP_REMOVE_BG_KEY,
    },
  });
}
