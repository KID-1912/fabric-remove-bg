import axios from "axios";
import { setupInterceptor } from "./interceptor.js";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/www-form-urlencoded",
    },
  };
  const service = axios.create({ ...defaultOptions, ...options });
  setupInterceptor(service);
  return service;
}

export const request = createAxios();
