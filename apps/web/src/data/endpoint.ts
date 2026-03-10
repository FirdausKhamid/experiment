export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  FEATURES: {
    FIND_ALL_PAGINATE: '/features/find-all-paginate',
    FETCH_BY_ID: (id: number) => `/features/fetch-by-id/${id}`,
    UPDATE: (id: number) => `/features/${id}`,
  },
  REGIONS: {
    FIND_ALL_PAGINATE: '/regions/find-all-paginate',
  },
  GROUPS: {
    FIND_ALL_PAGINATE: '/groups/find-all-paginate',
  },
  USERS: {
    FIND_ALL_PAGINATE: '/users/find-all-paginate',
  },
  DASHBOARD: '/dashboard',
  FEATURE_A: '/feature-a',
  FEATURE_B: '/feature-b',
  FEATURE_C: '/feature-c',
  SETTINGS: '/settings',
};
