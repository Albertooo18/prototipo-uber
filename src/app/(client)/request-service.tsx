import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Header } from '@/components/common/Header';
import { Screen } from '@/components/common/Screen';
import { FareEstimateCard } from '@/components/services/FareEstimateCard';
import { LocationSearchBox } from '@/components/maps/LocationSearchBox';
import { useCurrentLocation } from '@/features/location/useCurrentLocation';
import { useServices } from '@/features/services/useServices';
import {
  requestServiceSchema,
  type RequestServiceFormValues
} from '@/features/services/services.validation';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

export default function RequestServiceScreen() {
  const { currentLocation, refreshCurrentLocation } = useCurrentLocation();
  const {
    fareEstimate,
    estimateFare,
    clearFareEstimate,
    createService,
    isLoading,
    error
  } = useServices();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RequestServiceFormValues>({
    resolver: zodResolver(requestServiceSchema),
    defaultValues: {
      originLabel: '',
      destinationLabel: ''
    }
  });

  const originLabel = watch('originLabel');
  const destinationLabel = watch('destinationLabel');

  useEffect(() => {
    const canEstimate = originLabel.trim().length >= 3 && destinationLabel.trim().length >= 3;

    if (!canEstimate) {
      clearFareEstimate();
      return;
    }

    const timeout = setTimeout(() => {
      void estimateFare({
        originLabel,
        destinationLabel
      });
    }, 350);

    return () => clearTimeout(timeout);
  }, [clearFareEstimate, destinationLabel, estimateFare, originLabel]);

  const useCurrentAsOrigin = async () => {
    const location = currentLocation ?? (await refreshCurrentLocation());
    setValue('originLabel', location?.address ?? 'Mi ubicacion actual', {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleCreateService = async (values: RequestServiceFormValues) => {
    try {
      await createService({
        ...values,
        paymentMethodId: 'cash'
      });
      router.replace('/(client)/service-tracking');
    } catch {
      // El store expone el error para mantener la pantalla limpia.
    }
  };

  return (
    <Screen>
      <Header title="Solicitar servicio" subtitle="Define origen, destino y confirma la tarifa" showBack />

      <Controller
        control={control}
        name="originLabel"
        render={({ field: { value, onChange } }) => (
          <LocationSearchBox
            label="Origen"
            placeholder="Ej. Costa del Este"
            value={value}
            onChangeText={onChange}
            error={errors.originLabel?.message}
            onUseCurrentLocation={() => void useCurrentAsOrigin()}
          />
        )}
      />

      <Controller
        control={control}
        name="destinationLabel"
        render={({ field: { value, onChange } }) => (
          <LocationSearchBox
            label="Destino"
            placeholder="Ej. Obarrio"
            value={value}
            onChangeText={onChange}
            error={errors.destinationLabel?.message}
          />
        )}
      />

      {fareEstimate ? (
        <FareEstimateCard estimate={fareEstimate} />
      ) : (
        <Card>
          <Text style={styles.placeholderTitle}>Tarifa pendiente</Text>
          <Text style={styles.placeholderText}>Ingresa origen y destino para calcular una tarifa temporal.</Text>
        </Card>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        title="Confirmar solicitud"
        isLoading={isLoading}
        disabled={!fareEstimate}
        onPress={handleSubmit(handleCreateService)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  placeholderTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700'
  },
  placeholderText: {
    ...typography.caption,
    color: colors.textSecondary
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: -spacing.sm
  }
});
