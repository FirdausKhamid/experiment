import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import { LoginDto, RegisterDto, AuthResponseDto, AuthResponseSchema } from '@experiment/shared';

export const authService = {
  login: async (credentials: LoginDto): Promise<AuthResponseDto> => {
    const response = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return AuthResponseSchema.parse(response.data);
  },

  register: async (userData: RegisterDto): Promise<AuthResponseDto> => {
    const response = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.REGISTER, userData);
    return AuthResponseSchema.parse(response.data);
  },
};
