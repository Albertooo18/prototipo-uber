import type { ApiResponse } from '@/types/api';

import type { UpdateUserPayload, User } from './user.types';

const mockProfile: User = {
  id: 'usr_arcami_001',
  fullName: 'Cliente Arcami',
  phone: '+507 6000-0000',
  email: 'cliente@arcami.com',
  defaultAddress: 'Ciudad de Panama, Panama',
  createdAt: new Date().toISOString()
};

function wait(ms = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const userApi = {
  async getProfile(): Promise<ApiResponse<User>> {
    await wait();

    return {
      success: true,
      data: mockProfile
    };
  },

  async updateProfile(payload: UpdateUserPayload): Promise<ApiResponse<User>> {
    await wait();

    const updatedProfile = {
      ...mockProfile,
      ...payload
    };

    return {
      success: true,
      message: 'Perfil actualizado',
      data: updatedProfile
    };
  }
};
