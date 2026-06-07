import { create } from 'zustand';

import { userApi } from './user.api';
import type { UpdateUserPayload, User } from './user.types';

type UserState = {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
  loadProfile: () => Promise<void>;
  updateProfile: (payload: UpdateUserPayload) => Promise<void>;
  setProfile: (profile: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  async loadProfile() {
    set({ isLoading: true, error: null });

    try {
      const response = await userApi.getProfile();
      set({ profile: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'No se pudo cargar el perfil',
        isLoading: false
      });
    }
  },

  async updateProfile(payload) {
    set({ isLoading: true, error: null });

    try {
      const response = await userApi.updateProfile(payload);
      set({ profile: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'No se pudo actualizar el perfil',
        isLoading: false
      });
    }
  },

  setProfile(profile) {
    set({ profile });
  }
}));
