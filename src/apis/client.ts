import axios from 'axios';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    console.log(config.url);
    console.log(accessToken);
    if (config.url !== '/auth/reissue' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('intercepter', config.headers);
    }
    return config
    ;
  },
  (error) => {
    const { logout } = useAuthStore.getState();
    logout();
    window.location.replace('/login');
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setAccessToken, logout } = useAuthStore.getState();
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.data.message === 'Unauthorized') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await getNewToken();
        const newToken = response?.data.accessToken;

        if (!newToken) throw new Error('Failed to Refresh Token');

        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return client(originalRequest);
      } catch (e) {
        logout();
        window.location.replace('/login');
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
