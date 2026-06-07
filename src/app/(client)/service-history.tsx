import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { Header } from '@/components/common/Header';
import { Loading } from '@/components/common/Loading';
import { Screen } from '@/components/common/Screen';
import { ServiceCard } from '@/components/services/ServiceCard';
import { useServices } from '@/features/services/useServices';
import { spacing } from '@/lib/constants/spacing';

export default function ServiceHistoryScreen() {
  const { history, loadHistory, isLoading } = useServices();

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  if (isLoading && history.length === 0) {
    return <Loading message="Cargando historial..." />;
  }

  return (
    <Screen>
      <Header title="Historial" subtitle="Servicios solicitados anteriormente" showBack />

      {history.length === 0 ? (
        <EmptyState
          title="Sin servicios aun"
          description="Cuando solicites un servicio aparecera aqui."
          actionLabel="Solicitar servicio"
          onActionPress={() => router.push('/(client)/request-service')}
        />
      ) : (
        <View style={styles.list}>
          {history.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() =>
                router.push({
                  pathname: '/(client)/service-detail/[id]',
                  params: {
                    id: service.id
                  }
                })
              }
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  }
});
