import { createZodDto } from 'nestjs-zod';
import { RegisterSchema, LoginSchema, AuthResponseSchema } from '@experiment/shared';

export class RegisterDto extends createZodDto(RegisterSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
export class AuthResponseDto extends createZodDto(AuthResponseSchema) {}
