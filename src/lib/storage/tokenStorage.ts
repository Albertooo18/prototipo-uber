import { secureStorage } from './secureStorage';

const ACCESS_TOKEN_KEY = 'arcami.accessToken';
const USER_KEY = 'arcami.user';

export const tokenStorage = {
  async getAccessToken(): Promise<string | null> {
    return secureStorage.getItem(ACCESS_TOKEN_KEY);
  },

  async setAccessToken(token: string): Promise<void> {
    await secureStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  async getSessionUser<TUser>(): Promise<TUser | null> {
    const rawUser = await secureStorage.getItem(USER_KEY);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as TUser;
    } catch {
      await secureStorage.removeItem(USER_KEY);
      return null;
    }
  },

  async setSessionUser(user: unknown): Promise<void> {
    await secureStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async clearSession(): Promise<void> {
    await Promise.all([
      secureStorage.removeItem(ACCESS_TOKEN_KEY),
      secureStorage.removeItem(USER_KEY)
    ]);
  }
};
