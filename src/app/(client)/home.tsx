import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Header } from '@/components/common/Header';
import { Screen } from '@/components/common/Screen';
import { UserMap } from '@/components/maps/UserMap';
import { useAuth } from '@/features/auth/useAuth';
import { useCurrentLocation } from '@/features/location/useCurrentLocation';
import { usePushNotifications } from '@/features/notifications/usePushNotifications';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type QuickActionProps = {
  title: string;
  description: string;
  onPress: () => void;
};

function QuickAction({ title, description, onPress }: QuickActionProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.quickAction}>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickDescription}>{description}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { currentLocation, isLoading, error, refreshCurrentLocation } = useCurrentLocation();
  usePushNotifications();

  useEffect(() => {
    void refreshCurrentLocation();
  }, [refreshCurrentLocation]);

  const firstName = user?.fullName.split(' ')[0] ?? 'cliente';

  return (
    <Screen>
      <Header
        title={`Hola, ${firstName}`}
        subtitle="Listo para ayudarte con tu proximo servicio"
        rightElement={
          <Pressable accessibilityRole="button" onPress={() => router.push('/(client)/profile')} style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName.slice(0, 1).toUpperCase()}</Text>
          </Pressable>
        }
      />

      <UserMap currentLocation={currentLocation} height={260} />

      <Card>
        <Text style={styles.cardLabel}>Ubicacion actual</Text>
        <Text style={styles.locationText}>
          {currentLocation?.address ??
            (isLoading ? 'Detectando ubicacion...' : 'Ubicacion pendiente de permiso')}
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Actualizar ubicacion" variant="outline" onPress={() => void refreshCurrentLocation()} />
      </Card>

      <Button title="Solicitar servicio" onPress={() => router.push('/(client)/request-service')} />

      <View style={styles.quickGrid}>
        <QuickAction
          title="Historial"
          description="Servicios anteriores"
          onPress={() => router.push('/(client)/service-history')}
        />
        <QuickAction
          title="Pagos"
          description="Metodos disponibles"
          onPress={() => router.push('/(client)/payment-methods')}
        />
        <QuickAction
          title="Soporte"
          description="Contactar ayuda"
          onPress={() => router.push('/(client)/support')}
        />
        <QuickAction
          title="Perfil"
          description="Datos de cuenta"
          onPress={() => router.push('/(client)/profile')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.white,
    fontWeight: '800'
  },
  cardLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  locationText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700'
  },
  error: {
    ...typography.caption,
    color: colors.warning
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  },
  quickAction: {
    width: '47%',
    minHeight: 96,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xs,
    justifyContent: 'center'
  },
  quickTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '800'
  },
  quickDescription: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
