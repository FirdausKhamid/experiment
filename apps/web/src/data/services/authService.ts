import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import { LoginDto, RegisterDto, AuthResponseDto, AuthResponseSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

export const authService = {
  login: async (credentials: LoginDto): Promise<AuthResponseDto | Failure> => {
    try {
      const response = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.LOGIN, credentials);
      // Validate response mid-air
      return AuthResponseSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },

  register: async (userData: RegisterDto): Promise<AuthResponseDto | Failure> => {
    try {
      const response = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.REGISTER, userData);
      // Validate response mid-air
      return AuthResponseSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
