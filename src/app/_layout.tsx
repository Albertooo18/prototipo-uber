import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Loading } from '@/components/common/Loading';
import { useAuth } from '@/features/auth/useAuth';
import { colors } from '@/lib/constants/colors';

export default function RootLayout() {
  const { hydrateSession, isHydrated } = useAuth();

  useEffect(() => {
    void hydrateSession();
  }, [hydrateSession]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        {!isHydrated ? (
          <Loading message="Preparando Arcami..." />
        ) : (
          <>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: colors.background
                }
              }}
            />
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
