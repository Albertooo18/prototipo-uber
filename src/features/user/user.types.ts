export type User = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  defaultAddress?: string;
  createdAt: string;
};

export type UpdateUserPayload = Partial<
  Pick<User, 'fullName' | 'phone' | 'email' | 'defaultAddress' | 'avatarUrl'>
>;
