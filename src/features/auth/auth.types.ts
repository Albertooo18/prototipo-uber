import type { User } from '../user/user.types';

export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export type AuthSession = {
  token: string;
  user: User;
};
