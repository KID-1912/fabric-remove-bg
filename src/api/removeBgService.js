import { request } from "@/utils/index.js";
const VITE_APP_REMOVE_BG_KEY = process.env.VITE_APP_REMOVE_BG_KEY;

export function login(data) {
  return request.post("https://api.remove.bg/v1.0/removebg", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": VITE_APP_REMOVE_BG_KEY,
    },
  });
}
