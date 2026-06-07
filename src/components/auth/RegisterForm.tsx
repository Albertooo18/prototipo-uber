import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

import { registerSchema, type RegisterFormValues } from '@/features/auth/auth.validation';

type RegisterFormProps = {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  isLoading?: boolean;
  error?: string | null;
  onLoginPress: () => void;
};

export function RegisterForm({
  onSubmit,
  isLoading = false,
  error,
  onLoginPress
}: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nombre completo"
            placeholder="Nombre y apellido"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.fullName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Telefono"
            placeholder="+507 6000-0000"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="phone-pad"
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="cliente@arcami.com"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Contrasena"
            placeholder="Minimo 6 caracteres"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirmar contrasena"
            placeholder="Repite tu contrasena"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        )}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Crear cuenta" isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
      <Button title="Ya tengo cuenta" variant="ghost" onPress={onLoginPress} />
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
  }
});
