import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

import { loginSchema, type LoginFormValues } from '@/features/auth/auth.validation';

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  isLoading?: boolean;
  error?: string | null;
  onRegisterPress: () => void;
  onForgotPasswordPress: () => void;
};

export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  onRegisterPress,
  onForgotPasswordPress
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="identifier"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email o telefono"
            placeholder="cliente@arcami.com"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.identifier?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Contrasena"
            placeholder="Ingresa tu contrasena"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Iniciar sesion" isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
      <Button title="Olvide mi contrasena" variant="ghost" onPress={onForgotPasswordPress} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Aun no tienes cuenta?</Text>
        <Text accessibilityRole="button" onPress={onRegisterPress} style={styles.footerLink}>
          Crear cuenta
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg
  },
  error: {
    ...typography.caption,
    color: colors.error
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap'
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary
  },
  footerLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700'
  }
});
