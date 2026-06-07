import type { ApiResponse } from '@/types/api';

import type { AuthSession, LoginCredentials, RegisterPayload } from './auth.types';

const MOCK_USER_ID = 'usr_arcami_001';

function wait(ms = 700): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buildToken(identifier: string): string {
  return `mock-token-${identifier.replace(/[^\w]/g, '').toLowerCase()}-${Date.now()}`;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthSession>> {
    await wait();

    if (credentials.identifier.toLowerCase().includes('bloqueado')) {
      throw new Error('Esta cuenta requiere revision de soporte.');
    }

    const user = {
      id: MOCK_USER_ID,
      fullName: 'Cliente Arcami',
      phone: credentials.identifier.includes('@') ? '+507 6000-0000' : credentials.identifier,
      email: credentials.identifier.includes('@') ? credentials.identifier : 'cliente@arcami.com',
      defaultAddress: 'Ciudad de Panama, Panama',
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Sesion iniciada correctamente',
      data: {
        token: buildToken(credentials.identifier),
        user
      }
    };
  },

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthSession>> {
    await wait(900);

    return {
      success: true,
      message: 'Cuenta creada correctamente',
      data: {
        token: buildToken(payload.email),
        user: {
          id: `usr_${Date.now()}`,
          fullName: payload.fullName,
          phone: payload.phone,
          email: payload.email,
          defaultAddress: 'Sin direccion predeterminada',
          createdAt: new Date().toISOString()
        }
      }
    };
  }
};
