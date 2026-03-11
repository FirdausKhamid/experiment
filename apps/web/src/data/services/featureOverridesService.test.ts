import { api } from '../api';
import { featureOverridesService } from './featureOverridesService';

jest.mock('../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('featureOverridesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getOverrides calls API with query params', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] } as any);

    const result = await featureOverridesService.getOverrides('user', 'u1');

    expect(mockedApi.get).toHaveBeenCalledWith(expect.any(String), {
      params: { targetType: 'user', targetId: 'u1' },
    });
    expect(Array.isArray(result)).toBe(true);
  });

  it('patchOverrides validates body then calls API', async () => {
    mockedApi.patch.mockResolvedValueOnce({ data: [] } as any);

    const body = {
      targetType: 'user',
      targetId: 'u1',
      featureOverrides: [{ feature_id: 1, enabled: true }],
    } as any;

    const result = await featureOverridesService.patchOverrides(body);

    expect(mockedApi.patch).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
  });
});

