import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ApiErrorResponseDto } from '@experiment/shared';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered, returns JWT.',
  })
  @ApiBadRequestResponse({ 
      description: 'Invalid input data (Zod Validation Error).',
      type: ApiErrorResponseDto
  })
  @ApiConflictResponse({ 
      description: 'Username already exists.',
      type: ApiErrorResponseDto
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in, returns JWT.',
  })
  @ApiBadRequestResponse({ 
      description: 'Invalid input data.',
      type: ApiErrorResponseDto
  })
  @ApiUnauthorizedResponse({ 
      description: 'Invalid credentials.',
      type: ApiErrorResponseDto
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
