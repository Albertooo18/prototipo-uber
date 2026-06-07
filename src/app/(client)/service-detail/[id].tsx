import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { Header } from '@/components/common/Header';
import { Loading } from '@/components/common/Loading';
import { Screen } from '@/components/common/Screen';
import { UserMap } from '@/components/maps/UserMap';
import { ServiceStatusBadge } from '@/components/services/ServiceStatusBadge';
import { useServices } from '@/features/services/useServices';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { formatDate } from '@/lib/utils/formatDate';

export default function ServiceDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { selectedService, getServiceDetail, isLoading } = useServices();

  useEffect(() => {
    if (serviceId) {
      void getServiceDetail(serviceId);
    }
  }, [getServiceDetail, serviceId]);

  if (isLoading && !selectedService) {
    return <Loading message="Cargando servicio..." />;
  }

  if (!selectedService || selectedService.id !== serviceId) {
    return (
      <Screen>
        <Header title="Detalle" showBack />
        <EmptyState title="Servicio no encontrado" description="No encontramos el servicio solicitado." />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Detalle de servicio" subtitle={selectedService.id} showBack />
      <UserMap
        origin={selectedService.origin}
        destination={selectedService.destination}
        driver={selectedService.driver}
        height={260}
      />

      <Card>
        <View style={styles.row}>
          <Text style={styles.label}>Estado</Text>
          <ServiceStatusBadge status={selectedService.status} />
        </View>
        <View style={styles.divider} />
        <Text style={styles.title}>{selectedService.origin.address}</Text>
        <Text style={styles.subtitle}>Destino: {selectedService.destination.address}</Text>
        <Text style={styles.subtitle}>Fecha: {formatDate(selectedService.createdAt)}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Resumen de tarifa</Text>
        <Text style={styles.amount}>
          {formatCurrency(selectedService.fare.amount, selectedService.fare.currency)}
        </Text>
        <Text style={styles.subtitle}>
          {selectedService.fare.distanceKm} km - {selectedService.fare.durationMinutes} min aprox.
        </Text>
      </Card>

      {selectedService.driver ? (
        <Card>
          <Text style={styles.label}>Proveedor</Text>
          <Text style={styles.title}>{selectedService.driver.fullName}</Text>
          <Text style={styles.subtitle}>{selectedService.driver.vehicle}</Text>
          <Text style={styles.subtitle}>{selectedService.driver.phone}</Text>
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md
  },
  divider: {
    height: 1,
    backgroundColor: colors.border
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '800'
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary
  },
  amount: {
    ...typography.subtitle,
    color: colors.primary
  }
});
