import { StyleSheet, Text, View } from 'react-native';

import type { ServiceStatus } from '@/features/services/services.types';
import { serviceStatusConfig } from '@/lib/constants/serviceStatus';
import { radius, spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type ServiceStatusBadgeProps = {
  status: ServiceStatus;
};

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  const config = serviceStatusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  text: {
    ...typography.caption,
    fontWeight: '700'
  }
});
