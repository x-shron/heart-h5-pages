import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { Toast } from "antd-mobile";

let instance: AxiosInstance;
export const authCodes = [3800, 3801, 3802, 3806];
export const successCode = 0;

interface RequestConfig extends AxiosRequestConfig {
  showFailedMessage?: boolean;
}

export function request<T = any>(config: RequestConfig): Promise<T> {
  if (!instance) {
    instance = axios.create({
      baseURL: "/",
      timeout: 10000,
    });

    instance.interceptors.response.use(
      (res: { config: RequestConfig; data: any }) => {
        const data = res.data || {};
        if (data.code && data.code !== 200 && data.code !== "200") {
          // @ts-ignore
          if (
            res.config.showFailedMessage !== false &&
            authCodes.indexOf(data.code) === -1
          ) {
            Toast.show({
                icon: 'fail',
              content: data.message || '服务器异常',
            });
          }
        }

        if (data.code !== successCode) {
          // 约定 成功code 为 0
          Toast.show({
            icon: 'fail',
            content: data.message || '服务器异常',
          });
          return Promise.reject(data.errorMsg);
        }
        return data;
      },
      (err) => {
        Toast.show({
            icon: 'fail',
          content: err.message || '服务器异常',
        });
        return Promise.reject(err.message || "Uncaught error");
      }
    );

    instance.interceptors.request.use((config) => {
      const authToken = window.sessionStorage.getItem("AUTH_TOKEN");
      if (authToken) {
        config.headers["user-id"] = authToken;
      }
      return config;
    });
  }
  // @ts-ignore
  return instance(config);
}
