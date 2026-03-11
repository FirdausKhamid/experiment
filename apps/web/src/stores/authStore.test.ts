import { useAuthStore } from './authStore';
import { authService } from '../data/services/authService';
import type { Failure } from '../utils/error';

jest.mock('../data/services/authService');

const mockedAuthService = authService as jest.Mocked<typeof authService>;

const successResponse = {
  access_token: 'token',
  features: ['a', 'b'],
} as any;

const failure: Failure = {
  _isFailure: true,
  type: 'API_ERROR',
  statusCode: 400,
  message: 'Bad',
};

describe('useAuthStore', () => {
  beforeEach(() => {
    (useAuthStore as any).setState({
      user: null,
      isLoading: false,
      error: null,
      enabledFeatures: null,
      _hasHydrated: true,
    });
    jest.clearAllMocks();
  });

  it('login success updates user and enabledFeatures', async () => {
    mockedAuthService.login.mockResolvedValueOnce(successResponse);

    const ok = await useAuthStore.getState().login({} as any);
    expect(ok).toBe(true);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(successResponse);
    expect(state.enabledFeatures).toEqual(['a', 'b']);
    expect(state.error).toBeNull();
  });

  it('login failure sets error and returns false', async () => {
    mockedAuthService.login.mockResolvedValueOnce(failure as any);

    const ok = await useAuthStore.getState().login({} as any);
    expect(ok).toBe(false);

    const state = useAuthStore.getState();
    expect(state.error).toEqual(failure);
    expect(state.enabledFeatures).toBeNull();
  });

  it('logout clears user and error', () => {
    useAuthStore.setState({ user: successResponse, error: failure } as any);
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });
});

