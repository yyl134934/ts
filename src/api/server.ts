import axios from 'axios';

import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from './utils';

type Fn = (data: FcResponse<any>) => unknown;

type IAnyObj = Record<string, any>;

export interface FcResponse<T> {
  retno: string;
  retmsg: string;
  data: T;
}

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 修改请求头、配置用户参数
axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config);
  config = handleConfigureAuth(config);
  return config;
});

// 处理网络错误、授权错误、普通错误
axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  },
);

/**
 * get 请求方法
 * @param url
 * @param params
 * @param clearFn 结果处理函数
 * @returns
 */
export const Get = <T>(url: string, params: IAnyObj = {}, clearFn?: Fn): Promise<FcResponse<T> | any> =>
  new Promise((resolve) => {
    axiosInstance
      .get(url, { params })
      .then((result) => {
        console.log('🚀🐍 ~ .then ~ result:', result);
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve(res as FcResponse<T>);
      })
      .catch((err) => {
        resolve(err);
      });
  });

export const Post = <T>(url: string, data: IAnyObj, configParams: IAnyObj = {}): Promise<FcResponse<T> | any> => {
  return new Promise((resolve) => {
    axiosInstance
      .post(url, data, { params: configParams })
      .then((result) => {
        resolve(result.data as FcResponse<T>);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};
