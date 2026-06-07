import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RegisterForm } from '@/components/auth/RegisterForm';
import { Header } from '@/components/common/Header';
import { Screen } from '@/components/common/Screen';
import { useAuth } from '@/features/auth/useAuth';
import type { RegisterFormValues } from '@/features/auth/auth.validation';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

export default function RegisterScreen() {
  const { register, isLoading, error, isAuthenticated, clearError } = useAuth();

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

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await register({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        password: values.password
      });
      router.replace('/(client)/home');
    } catch {
      // El store deja el mensaje listo para la UI.
    }
  };

  return (
    <Screen>
      <Header title="Crear cuenta" showBack />
      <View style={styles.intro}>
        <Text style={styles.title}>Bienvenido a Arcami</Text>
        <Text style={styles.subtitle}>Crea tu perfil para solicitar servicios y dar seguimiento en tiempo real.</Text>
      </View>
      <RegisterForm
        isLoading={isLoading}
        error={error}
        onSubmit={handleRegister}
        onLoginPress={() => router.replace('/(auth)/login')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: spacing.sm
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
