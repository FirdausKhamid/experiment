import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponseDto } from '../dto/api-error.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorType = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      
      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse.message || exceptionResponse.error || exception.message;
        errorType = exceptionResponse.error || exception.name;
      } else {
        message = exceptionResponse || exception.message;
        errorType = exception.name;
      }
    } else if (exception instanceof Error) {
        message = exception.message;
        errorType = exception.name;
    }

    const apiErrorResponse: ApiErrorResponseDto = {
      statusCode: status,
      message: message,
      error: errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(apiErrorResponse);
  }
}
