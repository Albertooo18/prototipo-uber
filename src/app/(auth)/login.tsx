import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LoginForm } from '@/components/auth/LoginForm';
import { Screen } from '@/components/common/Screen';
import { useAuth } from '@/features/auth/useAuth';
import type { LoginFormValues } from '@/features/auth/auth.validation';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

export default function LoginScreen() {
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(client)/home');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login({
        identifier: values.identifier,
        password: values.password
      });
      router.replace('/(client)/home');
    } catch {
      // El store deja el mensaje listo para la UI.
    }
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.brand}>Arcami</Text>
        <Text style={styles.title}>Servicios bajo demanda, simples y confiables</Text>
        <Text style={styles.subtitle}>Ingresa para solicitar, seguir y gestionar tus servicios.</Text>
      </View>
      <LoginForm
        isLoading={isLoading}
        error={error}
        onSubmit={handleLogin}
        onForgotPasswordPress={() => router.push('/(auth)/forgot-password')}
        onRegisterPress={() => router.push('/(auth)/register')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.xxl
  },
  hero: {
    gap: spacing.md
  },
  brand: {
    ...typography.subtitle,
    color: colors.accent,
    letterSpacing: 0
  },
  title: {
    ...typography.title,
    color: colors.text
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary
  }
});
