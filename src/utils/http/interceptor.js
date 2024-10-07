import { resErrorPreHandle } from "./helpers.js";

const reqResolve = (config) => {
  const accessToken = localStorage.getItem("loginToken") || "";
  config.headers.Authorization = accessToken;
  return config;
};

const reqReject = (error) => {
  return Promise.reject(error);
};

const SUCCESS_CODES = [200];
const resResolve = (response) => {
  const { status, data } = response;
  const code = data?.code || status;
  const message = data?.message || response.statusText;
  if (SUCCESS_CODES.includes(code)) {
    return data;
  } else {
    resErrorPreHandle(code, message);
    return Promise.reject({ code, message, data });
  }
};

const resReject = (error) => {
  const { data, status } = error.response || {};
  const code = data?.code || status;
  const message = data?.message || error.message;
  resErrorPreHandle(code, message);
  return Promise.reject({ code, message, data });
};

export function setupInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(reqResolve, reqReject);
  axiosInstance.interceptors.response.use(resResolve, resReject);
}
