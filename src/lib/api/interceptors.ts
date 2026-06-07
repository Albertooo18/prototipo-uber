import type { AxiosError, AxiosInstance } from 'axios';

import { tokenStorage } from '../storage/tokenStorage';

export function setupInterceptors(apiClient: AxiosInstance): void {
  apiClient.interceptors.request.use(async (config) => {
    const token = await tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
