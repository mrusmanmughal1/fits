import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  getAccessToken,
  setAuthTokens,
  clearAuthTokens,
} from "./token";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

const http: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // IMPORTANT: send cookies (refresh token) on requests
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: AxiosRequestConfig) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token && prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
};

http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise<AxiosRequestConfig>((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        })
          .then((cfg) => http.request(cfg))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use a raw axios call to avoid interceptors.
        // Refresh token is expected to be in cookies (HttpOnly) so no body is required.
        const { data } = await axios.post(
          `${API_BASE}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccessToken = data?.accessToken || data?.token || null;

        if (!newAccessToken) {
          clearAuthTokens();
          processQueue(new Error("Refresh failed"));
          isRefreshing = false;
          return Promise.reject(error);
        }

        setAuthTokens({
          accessToken: newAccessToken,
        });
        processQueue(null, newAccessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return http.request(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuthTokens();
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
