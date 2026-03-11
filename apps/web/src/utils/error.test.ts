import axios, { AxiosError } from 'axios';
import { ZodError, z } from 'zod';
import { isFailure, normalizeToFailure } from './error';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('error utils', () => {
  describe('isFailure', () => {
    it('returns true for Failure-like object', () => {
      const failure = { _isFailure: true, type: 'UNKNOWN_ERROR', statusCode: 500, message: 'oops' };
      expect(isFailure(failure)).toBe(true);
    });

    it('returns false for non Failure object', () => {
      expect(isFailure({})).toBe(false);
      expect(isFailure(null)).toBe(false);
    });
  });

  describe('normalizeToFailure', () => {
    it('handles AxiosError with ApiErrorResponseDto payload', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: { statusCode: 400, message: 'Bad', error: 'Bad Request' },
        },
        message: 'Request failed',
      } as unknown as AxiosError;

      mockedAxios.isAxiosError.mockReturnValueOnce(true as any);

      const failure = normalizeToFailure(axiosError);
      expect(failure.type).toBe('API_ERROR');
      expect(failure.statusCode).toBe(400);
      expect(failure.message).toBe('Bad');
    });

    it('handles AxiosError as network error when no ApiErrorResponseDto', () => {
      const axiosError = {
        isAxiosError: true,
        response: { status: 503, data: null },
        message: 'Network down',
      } as unknown as AxiosError;

      mockedAxios.isAxiosError.mockReturnValueOnce(true as any);

      const failure = normalizeToFailure(axiosError);
      expect(failure.type).toBe('NETWORK_ERROR');
      expect(failure.statusCode).toBe(503);
      expect(failure.message).toBe('Network down');
    });

    it('handles plain ApiErrorResponse-like object', () => {
      const apiError = { statusCode: 401, message: 'Unauthorized', error: 'Unauthorized' };
      const failure = normalizeToFailure(apiError);
      expect(failure.type).toBe('API_ERROR');
      expect(failure.statusCode).toBe(401);
      expect(failure.message).toBe('Unauthorized');
    });

    it('handles ZodError as validation error', () => {
      const schema = z.object({ name: z.string() });
      let zodError: ZodError;
      try {
        schema.parse({});
      } catch (err) {
        zodError = err as ZodError;
      }

      const failure = normalizeToFailure(zodError!);
      expect(failure.type).toBe('VALIDATION_ERROR');
      expect(failure.statusCode).toBe(422);
      expect(Array.isArray(failure.message)).toBe(true);
    });

    it('handles generic Error', () => {
      const err = new Error('boom');
      const failure = normalizeToFailure(err);
      expect(failure.type).toBe('UNKNOWN_ERROR');
      expect(failure.message).toBe('boom');
    });

    it('handles unknown throw (string)', () => {
      const failure = normalizeToFailure('weird');
      expect(failure.type).toBe('UNKNOWN_ERROR');
      expect(failure.message).toBe('weird');
    });
  });
});

