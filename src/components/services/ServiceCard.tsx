import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import type { ServiceRequest } from '@/features/services/services.types';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { formatDate } from '@/lib/utils/formatDate';

import { ServiceStatusBadge } from './ServiceStatusBadge';

type ServiceCardProps = {
  service: ServiceRequest;
  onPress?: () => void;
};

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Card onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.route}>
          <Text style={styles.title}>{service.origin.address}</Text>
          <Text style={styles.subtitle}>a {service.destination.address}</Text>
        </View>
        <Text style={styles.amount}>{formatCurrency(service.fare.amount, service.fare.currency)}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(service.createdAt)}</Text>
        <ServiceStatusBadge status={service.status} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md
  },
  route: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700'
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary
  },
  amount: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '800'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1
  }
});
