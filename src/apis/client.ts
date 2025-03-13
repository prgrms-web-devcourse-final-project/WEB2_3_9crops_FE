import axios from 'axios';

import useAuthStore from '@/stores/authStore';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

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
    const logout = useAuthStore.getState().logout;
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    const originalRequest = error.config;

    if (!originalRequest || originalRequest.url === '/api/reissue') {
      if (isLoggedIn) logout();
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await useAuthStore.getState().refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default client;
