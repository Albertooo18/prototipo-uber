import { Redirect } from 'expo-router';

import { Loading } from '@/components/common/Loading';
import { useAuth } from '@/features/auth/useAuth';

export default function IndexScreen() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) {
    return <Loading message="Validando sesion..." />;
  }

  return <Redirect href={isAuthenticated ? '/(client)/home' : '/(auth)/login'} />;
}
