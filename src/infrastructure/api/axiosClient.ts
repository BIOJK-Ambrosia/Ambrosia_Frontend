import axios from 'axios';
import { env } from '@/shared/config/env';

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
});
