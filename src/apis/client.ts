import axios from 'axios';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// type FailedRequest = {
//   resolve: (token: string) => void;
//   reject: (error: unknown) => void;
// };

let isRefreshing = false;
// let failedQueue: FailedRequest[] = [];

// const processQueue = (error: unknown, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       if (token) {
//         prom.resolve(token);
//       }
//     }
//   });

//   failedQueue = [];
// };

const callReissue = async () => {
  try {
    const response = await getNewToken();
    const newToken = response?.data.accessToken;
    return newToken;
  } catch (e) {
    return Promise.reject(e);
  }
};

let retry = false;
client.interceptors.request.use(
  (config) => {
    console.log('response again', config);

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
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    const originalRequest = error.config;

    if (!originalRequest || originalRequest.url === '/auth/reissue') {
      if (isLoggedIn) logout();
      return Promise.reject(error);
    }

    if ((error.response?.status === 401 || error.response?.status === 403) && !retry) {
      if (isRefreshing) {
        retry = true;
        if (isLoggedIn) logout();
        // try {
        //   return new Promise((resolve, reject) => {
        //     failedQueue.push({
        //       resolve: (token: string) => {
        //         originalRequest.headers.Authorization = `Bearer ${token}`;
        //         resolve(client(originalRequest));
        //       },
        //       reject: (err: unknown) => reject(err),
        //     });
        //   });
        // } catch (e) {
        //   return Promise.reject(e);
        // }
      } else {
        isRefreshing = true;
        try {
          const newToken = await callReissue();
          setAccessToken(newToken);
          // processQueue(null, newToken);
          isRefreshing = false;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        } catch (e) {
          // processQueue(e, null);
          isRefreshing = false;
          if (isLoggedIn) logout();
          return Promise.reject(e);
        }
      }
    }
    if (isLoggedIn) logout();
    console.error('Failed to refresh token', error);
    return Promise.reject(error);
  },
);

export default client;
