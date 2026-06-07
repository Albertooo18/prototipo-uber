import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import type { FareEstimate } from '@/features/services/services.types';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';
import { formatCurrency } from '@/lib/utils/formatCurrency';

type FareEstimateCardProps = {
  estimate: FareEstimate;
};

export function FareEstimateCard({ estimate }: FareEstimateCardProps) {
  return (
    <Card>
      <Text style={styles.label}>Tarifa estimada</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>{formatCurrency(estimate.amount, estimate.currency)}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{estimate.distanceKm} km</Text>
          <Text style={styles.metaText}>{estimate.durationMinutes} min aprox.</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md
  },
  amount: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: '800'
  },
  meta: {
    alignItems: 'flex-end',
    gap: spacing.xs
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
