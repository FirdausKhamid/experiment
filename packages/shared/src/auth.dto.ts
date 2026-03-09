import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegisterSchema = z.object({
  username: z.string().min(1, 'Username is required').describe('The username of the new user'),
  password: z.string().min(6, 'Password must be at least 6 characters').describe('The password for the new user (minimum 6 characters)'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required').describe('The username to log in with'),
  password: z.string().min(1, 'Password is required').describe('The password to log in with'),
});

export class LoginDto extends createZodDto(LoginSchema) {}
