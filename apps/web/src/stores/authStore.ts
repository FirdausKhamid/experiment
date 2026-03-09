import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../data/services/authService";
import { LoginDto, RegisterDto, AuthResponseDto } from "@experiment/shared";
import { Failure, isFailure } from "../utils/error";

interface AuthState {
  user: AuthResponseDto | null;
  isLoading: boolean;
  error: Failure | null;
  login: (credentials: LoginDto) => Promise<boolean>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        const result = await authService.login(credentials);

        if (isFailure(result)) {
          set({ error: result, isLoading: false });
          return false;
        }

        set({ user: result, isLoading: false });
        return true;
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });

        const result = await authService.register(userData);

        if (isFailure(result)) {
          set({ error: result, isLoading: false });
          return;
        }

        set({ user: result, isLoading: false });
      },

      logout: () => {
        set({ user: null, error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
