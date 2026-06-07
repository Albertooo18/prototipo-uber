import axios from 'axios';

import { env } from '../config/env';
import { setupInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

setupInterceptors(apiClient);

export default apiClient;
