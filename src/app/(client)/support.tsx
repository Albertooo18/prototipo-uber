import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, StyleSheet, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { Screen } from '@/components/common/Screen';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

const supportSchema = z.object({
  category: z.string().trim().min(3, 'Indica una categoria'),
  message: z.string().trim().min(10, 'Cuentanos un poco mas del problema')
});

type SupportFormValues = z.infer<typeof supportSchema>;

export default function SupportScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      category: '',
      message: ''
    }
  });

  const handleSend = async (values: SupportFormValues) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    Alert.alert('Mensaje enviado', `Categoria: ${values.category}`);
    reset();
  };

  return (
    <Screen>
      <Header title="Soporte" subtitle="Estamos para ayudarte" showBack />
      <Text style={styles.description}>Describe tu caso y el equipo de Arcami lo recibira cuando el backend se conecte.</Text>

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Categoria"
            placeholder="Ej. Pago, conductor, servicio"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="message"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Mensaje"
            placeholder="Escribe tu mensaje"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            error={errors.message?.message}
          />
        )}
      />

      <Button title="Enviar mensaje" isLoading={isSubmitting} onPress={handleSubmit(handleSend)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: -spacing.sm
  }
});
