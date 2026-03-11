import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { RequireAuth } from './RequireAuth';
import { SplashScreen } from './SplashScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/stores/authStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('./SplashScreen', () => ({
  SplashScreen: () => <div>Loading...</div>,
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;

function mockAuthState(state: { _hasHydrated: boolean; user: any }) {
  mockedUseAuthStore.mockImplementation((selector: any) => selector(state));
}

describe('RequireAuth', () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({ replace: jest.fn() });
    jest.clearAllMocks();
  });

  it('shows splash while not hydrated', () => {
    mockAuthState({ _hasHydrated: false, user: null });
    render(
      <RequireAuth>
        <div>Protected</div>
      </RequireAuth>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows splash when no access token', () => {
    mockAuthState({ _hasHydrated: true, user: null });
    render(
      <RequireAuth>
        <div>Protected</div>
      </RequireAuth>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children when user has access token', () => {
    mockAuthState({ _hasHydrated: true, user: { access_token: 'token' } });
    render(
      <RequireAuth>
        <div>Protected</div>
      </RequireAuth>,
    );
    expect(screen.getByText('Protected')).toBeInTheDocument();
  });
});

