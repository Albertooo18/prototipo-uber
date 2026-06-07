import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import { Header } from '@/components/common/Header';
import { Loading } from '@/components/common/Loading';
import { Screen } from '@/components/common/Screen';
import { usePayments } from '@/features/payments/usePayments';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

export default function PaymentMethodsScreen() {
  const { paymentMethods, isLoading } = usePayments();

  if (isLoading && paymentMethods.length === 0) {
    return <Loading message="Cargando metodos..." />;
  }

  return (
    <Screen>
      <Header title="Metodos de pago" subtitle="Opciones preparadas para Arcami" showBack />
      <View style={styles.list}>
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <View style={styles.row}>
              <View style={styles.copy}>
                <Text style={styles.title}>{method.label}</Text>
                <Text style={styles.description}>{method.description}</Text>
              </View>
              <Text style={[styles.status, method.enabled ? styles.enabled : styles.disabled]}>
                {method.comingSoon ? 'Futuro' : 'Activo'}
              </Text>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '800'
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary
  },
  status: {
    ...typography.caption,
    fontWeight: '800'
  },
  enabled: {
    color: colors.success
  },
  disabled: {
    color: colors.warning
  }
});
