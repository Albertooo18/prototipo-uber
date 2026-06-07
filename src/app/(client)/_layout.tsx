import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/features/auth/useAuth';
import { colors } from '@/lib/constants/colors';

export default function ClientLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background
        }
      }}
    />
  );
}
