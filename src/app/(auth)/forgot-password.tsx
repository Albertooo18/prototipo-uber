import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { Screen } from '@/components/common/Screen';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

export default function ForgotPasswordScreen() {
  const [identifier, setIdentifier] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Screen>
      <Header title="Recuperar acceso" showBack />
      <Text style={styles.description}>
        Ingresa tu email o telefono y enviaremos las instrucciones cuando el backend este conectado.
      </Text>
      <Input
        label="Email o telefono"
        placeholder="cliente@arcami.com"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      {sent ? <Text style={styles.success}>Solicitud simulada. Revisa tu canal de contacto.</Text> : null}
      <Button title="Enviar instrucciones" onPress={() => setSent(true)} disabled={identifier.trim().length < 3} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    color: colors.textSecondary
  },
  success: {
    ...typography.caption,
    color: colors.success,
    marginTop: -spacing.sm
  }
});
