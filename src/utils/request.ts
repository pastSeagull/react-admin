import type { AxiosError } from 'axios';

import axios, { type AxiosRequestConfig } from 'axios';

import { getToken } from '.';

const instance = axios.create({
  baseURL: '/api',
});

const errorHandler = (error: AxiosError<any>) => {
  // FIXME: 可自行处理此处错误拦截
  if (error.response) {
    // const data = error.response.data;
    // const status = error?.response?.status;
    // const errMsg = data?.message ?? 'Error';

    return Promise.reject(error?.response);
  }

  return Promise.reject(error);
};

// request interceptor
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
}, errorHandler);

// response interceptor
instance.interceptors.response.use((response) => {

  return response.data;
}, errorHandler);

export function request<T = any>(config: AxiosRequestConfig) {
  return instance.request<T, T>(config);
}

export default instance;
