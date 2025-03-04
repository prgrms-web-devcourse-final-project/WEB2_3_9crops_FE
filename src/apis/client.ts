import axios from 'axios';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) {
        prom.resolve(token);
      }
    }
  });

  failedQueue = [];
};

client.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (config.url !== '/auth/reissue' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const setAccessToken = useAuthStore.getState().setAccessToken;
    const logout = useAuthStore.getState().logout;
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (
      originalRequest.url === '/auth/reissue' ||
      originalRequest.url.includes('/api/auth/token?state=')
    ) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        try {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(client(originalRequest));
              },
              reject: (err: unknown) => reject(err),
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }

      isRefreshing = true;

      try {
        const response = await getNewToken();
        const newToken = response?.data.accessToken;

        if (!newToken) throw new Error('Failed to refresh token');

        setAccessToken(newToken);
        processQueue(null, newToken);

        isRefreshing = false;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        logout();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
