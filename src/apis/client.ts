import axios from 'axios';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;

const callReissue = async () => {
  try {
    const response = await getNewToken();
    if(response?.status !== 200) throw new Error('error while fetching newToken');
    const newToken = response?.data.data.accessToken;
    return newToken;
  } catch (e) {
    return Promise.reject(e);
  }
};

let retry = false;

client.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (config.url !== '/api/reissue' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('interceptor', config);
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
      retry = true;
      if (isRefreshing) {
        if (isLoggedIn) logout();
      } else {
        isRefreshing = true;
        try {
          const newToken = await callReissue();
          setAccessToken(newToken);
          isRefreshing = false;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        } catch (e) {
          isRefreshing = false;
          if (isLoggedIn) logout();
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default client;
