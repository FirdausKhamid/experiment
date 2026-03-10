import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import { Failure, normalizeToFailure } from '../../utils/error';

/** Fetches a dumb endpoint that returns a string (plain text or JSON string). */
async function fetchText(path: string): Promise<string | Failure> {
  try {
    const response = await api.get<string>(path);
    return typeof response.data === 'string' ? response.data : String(response.data);
  } catch (error) {
    return normalizeToFailure(error);
  }
}

export const pageDataService = {
  getDashboard: () => fetchText(API_ENDPOINTS.DASHBOARD),
  getFeatureA: () => fetchText(API_ENDPOINTS.FEATURE_A),
  getFeatureB: () => fetchText(API_ENDPOINTS.FEATURE_B),
  getFeatureC: () => fetchText(API_ENDPOINTS.FEATURE_C),
  getSettings: () => fetchText(API_ENDPOINTS.SETTINGS),
};
