import axios from 'axios';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// eslint-disable-next-line react-hooks/rules-of-hooks

client.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (config.url !== '/auth/reissue' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setAccessToken, logout } = useAuthStore.getState();
    const originalRequest = error.config;

    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.data.message === 'Unauthorized'
    ) {
      originalRequest._retry = true;
      try {
        const response = await getNewToken();
        const newToken = response?.data.accessToken;
        if (!newToken) {
          logout();
          window.location.replace('/login');
          return Promise.reject(error);
        }

        setAccessToken(newToken);
        originalRequest.headers.access = newToken;
        return client(originalRequest);
      } catch (error) {
        logout();
        window.location.replace('/login');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
