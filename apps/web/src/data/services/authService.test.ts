import { api } from '../api';
import { authService } from './authService';
import { AuthResponseSchema } from '@experiment/shared';

jest.mock('../api');

const mockedApi = api as jest.Mocked<typeof api>;

jest.mock('@experiment/shared', () => {
  const original = jest.requireActual('@experiment/shared');
  return {
    ...original,
    AuthResponseSchema: {
      parse: jest.fn((value) => value),
    },
  };
});

const mockedSchema = AuthResponseSchema as unknown as { parse: jest.Mock };

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login posts to API and parses response', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { access_token: 'token' } } as any);

    const result = await authService.login({} as any);

    expect(mockedApi.post).toHaveBeenCalled();
    expect(mockedSchema.parse).toHaveBeenCalledWith({ access_token: 'token' });
    expect((result as any).access_token).toBe('token');
  });

  it('register posts to API and parses response', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { access_token: 'token2' } } as any);

    const result = await authService.register({} as any);

    expect(mockedApi.post).toHaveBeenCalled();
    expect(mockedSchema.parse).toHaveBeenCalledWith({ access_token: 'token2' });
    expect((result as any).access_token).toBe('token2');
  });
});

