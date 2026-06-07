import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, type Region } from 'react-native-maps';

import type { CurrentLocation } from '@/features/location/location.types';
import type { Driver, ServiceLocation } from '@/features/services/services.types';
import { colors } from '@/lib/constants/colors';
import { radius } from '@/lib/constants/spacing';
import type { Coordinates } from '@/types/common';

import { DriverMarker } from './DriverMarker';

const DEFAULT_REGION: Region = {
  latitude: 8.9824,
  longitude: -79.5199,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08
};

type UserMapProps = {
  currentLocation?: CurrentLocation | null;
  origin?: ServiceLocation | null;
  destination?: ServiceLocation | null;
  driver?: Driver | null;
  height?: number;
};

function toCoordinate(location?: ServiceLocation | null): Coordinates | null {
  if (!location) {
    return null;
  }

  return {
    latitude: location.latitude,
    longitude: location.longitude
  };
}

export function UserMap({
  currentLocation,
  origin,
  destination,
  driver,
  height = 240
}: UserMapProps) {
  const originCoordinate = toCoordinate(origin);
  const destinationCoordinate = toCoordinate(destination);
  const currentCoordinate = currentLocation?.coords;
  const center = originCoordinate ?? currentCoordinate ?? DEFAULT_REGION;
  const routeCoordinates =
    originCoordinate && destinationCoordinate ? [originCoordinate, destinationCoordinate] : [];

  const initialRegion: Region = {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={initialRegion}>
        {currentCoordinate ? (
          <Marker coordinate={currentCoordinate} title="Tu ubicacion" pinColor={colors.primary} />
        ) : null}
        {originCoordinate ? (
          <Marker coordinate={originCoordinate} title={origin?.address ?? 'Origen'} pinColor={colors.primary} />
        ) : null}
        {destinationCoordinate ? (
          <Marker
            coordinate={destinationCoordinate}
            title={destination?.address ?? 'Destino'}
            pinColor={colors.error}
          />
        ) : null}
        {routeCoordinates.length === 2 ? (
          <Polyline coordinates={routeCoordinates} strokeColor={colors.accent} strokeWidth={4} />
        ) : null}
        {driver?.location ? <DriverMarker coordinate={driver.location} title={driver.fullName} /> : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.muted
  }
});
