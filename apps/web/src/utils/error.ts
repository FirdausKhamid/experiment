import { ApiErrorResponseDto } from '@experiment/shared';
import { ZodError } from 'zod';
import axios from 'axios';

export type FailureType = 'API_ERROR' | 'VALIDATION_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';

export interface Failure {
  _isFailure: true; // internal discriminator (always true for this object)
  type: FailureType;
  statusCode: number;
  message: string | string[];
  raw?: any;
}

/**
 * Type guard to check if a returned value is a Failure object.
 */
export const isFailure = (error: any): error is Failure => {
  return typeof error === 'object' && error !== null && '_isFailure' in error && error._isFailure === true;
};

/**
 * Normalizes ANY thrown exception into our standard Failure format.
 */
export const normalizeToFailure = (error: unknown): Failure => {
  // 1. Is it an Axios Error?
  if (axios.isAxiosError(error)) {
    // If the interceptor attached the ApiErrorResponseDto data
    if (error.response?.data && typeof error.response.data === 'object' && 'statusCode' in error.response.data) {
      const apiError = error.response.data as ApiErrorResponseDto;
      return {
        _isFailure: true,
        type: 'API_ERROR',
        statusCode: apiError.statusCode,
        message: apiError.message,
        raw: apiError,
      };
    }
    
    // Otherwise standard Axios fallback (e.g. Network Error)
    return {
      _isFailure: true,
      type: 'NETWORK_ERROR',
      statusCode: error.response?.status || 500,
      message: error.message || 'Network Error',
      raw: error,
    };
  }

  // Fallback for custom formatted errors from our interceptor that lost AxiosError prototype
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
     const apiError = error as ApiErrorResponseDto;
     return {
        _isFailure: true,
        type: 'API_ERROR',
        statusCode: apiError.statusCode,
        message: apiError.message,
        raw: apiError,
      };
  }

  // 2. Did our frontend Zod Schema reject the backend's data mid-air?
  if (error instanceof ZodError) {
    return {
      _isFailure: true,
      type: 'VALIDATION_ERROR',
      statusCode: 422,
      message: error.issues.map(e => `${e.path.join('.')}: ${e.message}`), 
      raw: error,
    };
  }

  // 3. Is it a generic JavaScript Error?
  if (error instanceof Error) {
    return {
      _isFailure: true,
      type: 'UNKNOWN_ERROR',
      statusCode: 500,
      message: error.message,
      raw: error,
    };
  }

  // 4. Fallback for completely unknown throws (e.g., throw "string")
  return {
    _isFailure: true,
    type: 'UNKNOWN_ERROR',
    statusCode: 500,
    message: String(error),
    raw: error,
  };
};
