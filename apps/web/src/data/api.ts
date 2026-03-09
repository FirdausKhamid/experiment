import axios, { AxiosError } from 'axios';
import { ApiErrorResponseDto } from '@experiment/shared';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponseDto>) => {
    const defaultError: ApiErrorResponseDto = {
      statusCode: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred',
      error: 'Client Error',
    };
    const formattedError = error.response?.data || defaultError;
    console.error('[API Error]:', formattedError.message);
    return Promise.reject(formattedError);
  }
);
