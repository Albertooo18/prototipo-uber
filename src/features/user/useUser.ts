import { useUserStore } from './user.store';

export function useUser() {
  return useUserStore();
}
