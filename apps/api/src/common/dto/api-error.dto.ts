import { createZodDto } from 'nestjs-zod';
import { ApiErrorResponseSchema } from '@experiment/shared';

export class ApiErrorResponseDto extends createZodDto(ApiErrorResponseSchema) {}
