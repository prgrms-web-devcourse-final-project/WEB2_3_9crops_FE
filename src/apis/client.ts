import axios from 'axios';
import { useLayoutEffect } from 'react';

import useAuthStore from '@/stores/authStore';

import { getNewToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// eslint-disable-next-line react-hooks/rules-of-hooks

export const useAxiosIntercepter = () => {
  const { accessToken, setAccessToken } = useAuthStore();
  const authIntercepter = client.interceptors.request.use(
    (config) => {
      config.headers.Authorization =
        accessToken && !config.headers['x-retry']
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const refreshInterceptor = client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response.status === 401 || error.response.status === 403) &&
        error.response.data.message === 'Unauthorized'
      ) {
        try {
          const response = await getNewToken();
          setAccessToken(response?.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${response?.data.accessToken}`;
          originalRequest.headers['x-retry'] = true;

          return client(originalRequest);
        } catch {
          setAccessToken('');
        }
      }
      return Promise.reject(error);
    },
  );

  useLayoutEffect(() => {
    return () => {
      client.interceptors.request.eject(authIntercepter);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    return () => {
      client.interceptors.response.eject(refreshInterceptor);
    };
  }, [accessToken]);
};

export default client;
