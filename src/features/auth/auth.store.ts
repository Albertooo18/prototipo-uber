import { create } from 'zustand';

import { tokenStorage } from '@/lib/storage/tokenStorage';

import type { User } from '../user/user.types';
import { authApi } from './auth.api';
import type { LoginCredentials, RegisterPayload } from './auth.types';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  hydrateSession: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrio un error inesperado';
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,
  isLoading: false,
  error: null,

  async hydrateSession() {
    try {
      const [token, user] = await Promise.all([
        tokenStorage.getAccessToken(),
        tokenStorage.getSessionUser<User>()
      ]);

      if (token && user) {
        set({
          token,
          user,
          isAuthenticated: true,
          isHydrated: true
        });
        return;
      }

      await tokenStorage.clearSession();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true
      });
    } catch {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true
      });
    }
  },

  async login(credentials) {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login(credentials);

      await Promise.all([
        tokenStorage.setAccessToken(response.data.token),
        tokenStorage.setSessionUser(response.data.user)
      ]);

      set({
        token: response.data.token,
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  async register(payload) {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register(payload);

      await Promise.all([
        tokenStorage.setAccessToken(response.data.token),
        tokenStorage.setSessionUser(response.data.user)
      ]);

      set({
        token: response.data.token,
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  async logout() {
    await tokenStorage.clearSession();

    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  clearError() {
    set({ error: null });
  }
}));
