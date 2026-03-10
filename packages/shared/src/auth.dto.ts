import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(1, 'Username is required').describe('The username of the new user'),
  password: z.string().min(6, 'Password must be at least 6 characters').describe('The password for the new user (minimum 6 characters)'),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required').describe('The username to log in with'),
  password: z.string().min(1, 'Password is required').describe('The password to log in with'),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const ApiErrorResponseSchema = z.object({
  statusCode: z.number().describe('The HTTP status code of the error'),
  message: z.union([z.string(), z.array(z.string())]).describe('A descriptive error message or array of messages'),
  error: z.string().describe('The type of error (e.g., Bad Request, Unauthorized, Not Found)'),
  timestamp: z.string().optional().describe('ISO timestamp of when the error occurred'),
  path: z.string().optional().describe('The API path where the error occurred'),
});
export type ApiErrorResponseDto = z.infer<typeof ApiErrorResponseSchema>;

export const AuthResponseSchema = z.object({
  access_token: z.string().describe('The JWT access token'),
  expires_in: z.number().optional().describe('Token expiration time in seconds'),
  features: z.array(z.string()).optional().describe('Enabled feature keys for the user (for UI filtering)'),
});
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
