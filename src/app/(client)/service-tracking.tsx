import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { Header } from '@/components/common/Header';
import { Screen } from '@/components/common/Screen';
import { UserMap } from '@/components/maps/UserMap';
import { ServiceStatusBadge } from '@/components/services/ServiceStatusBadge';
import { useServices } from '@/features/services/useServices';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';
import { formatCurrency } from '@/lib/utils/formatCurrency';

const blockedCancelStatuses = ['iniciado', 'finalizado', 'cancelado'];
const terminalStatuses = ['finalizado', 'cancelado'];

export default function ServiceTrackingScreen() {
  const {
    activeService,
    simulateStatusProgress,
    cancelActiveService,
    isLoading
  } = useServices();

  useEffect(() => {
    if (!activeService || terminalStatuses.includes(activeService.status)) {
      return;
    }

    const interval = setInterval(() => {
      void simulateStatusProgress();
    }, 6500);

    return () => clearInterval(interval);
  }, [activeService, simulateStatusProgress]);

  if (!activeService) {
    return (
      <Screen>
        <Header title="Seguimiento" showBack />
        <EmptyState
          title="No hay servicio activo"
          description="Solicita un servicio para ver su seguimiento en tiempo real."
          actionLabel="Ir al inicio"
          onActionPress={() => router.replace('/(client)/home')}
        />
      </Screen>
    );
  }

  const canCancel = !blockedCancelStatuses.includes(activeService.status);

  const confirmCancel = () => {
    Alert.alert('Cancelar servicio', 'Deseas cancelar este servicio?', [
      {
        text: 'Mantener',
        style: 'cancel'
      },
      {
        text: 'Cancelar',
        style: 'destructive',
        onPress: () => {
          void cancelActiveService();
        }
      }
    ]);
  };

  return (
    <Screen>
      <Header title="Seguimiento" subtitle={`Servicio ${activeService.id}`} showBack />
      <UserMap
        origin={activeService.origin}
        destination={activeService.destination}
        driver={activeService.driver}
        height={280}
      />

      <Card>
        <View style={styles.statusRow}>
          <View style={styles.statusCopy}>
            <Text style={styles.label}>Estado actual</Text>
            <Text style={styles.title}>{activeService.origin.address}</Text>
            <Text style={styles.subtitle}>Destino: {activeService.destination.address}</Text>
          </View>
          <ServiceStatusBadge status={activeService.status} />
        </View>
        <Text style={styles.amount}>
          {formatCurrency(activeService.fare.amount, activeService.fare.currency)}
        </Text>
      </Card>

      {activeService.driver ? (
        <Card>
          <Text style={styles.label}>Proveedor asignado</Text>
          <Text style={styles.title}>{activeService.driver.fullName}</Text>
          <Text style={styles.subtitle}>{activeService.driver.vehicle}</Text>
          <Text style={styles.subtitle}>
            {activeService.driver.phone} - Rating {activeService.driver.rating}
          </Text>
        </Card>
      ) : (
        <Card>
          <Text style={styles.title}>Buscando proveedor</Text>
          <Text style={styles.subtitle}>Te avisaremos cuando alguien acepte tu solicitud.</Text>
        </Card>
      )}

      {activeService.status === 'finalizado' ? (
        <Button title="Ver historial" onPress={() => router.replace('/(client)/service-history')} />
      ) : null}

      {canCancel ? (
        <Button title="Cancelar servicio" variant="danger" isLoading={isLoading} onPress={confirmCancel} />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md
  },
  statusCopy: {
    flex: 1,
    gap: spacing.xs
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
