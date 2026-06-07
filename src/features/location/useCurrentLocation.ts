import { useCallback } from 'react';
import * as Location from 'expo-location';

import { useLocationStore } from './location.store';
import type { CurrentLocation, LocationPermissionStatus } from './location.types';

function formatAddress(address?: Location.LocationGeocodedAddress): string | undefined {
  if (!address) {
    return undefined;
  }

  return [address.name, address.street, address.city, address.region]
    .filter(Boolean)
    .join(', ');
}

export function useCurrentLocation() {
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const isLoading = useLocationStore((state) => state.isLoading);
  const error = useLocationStore((state) => state.error);
  const setCurrentLocation = useLocationStore((state) => state.setCurrentLocation);
  const setPermissionStatus = useLocationStore((state) => state.setPermissionStatus);
  const setLoading = useLocationStore((state) => state.setLoading);
  const setError = useLocationStore((state) => state.setError);

  const refreshCurrentLocation = useCallback(async (): Promise<CurrentLocation | null> => {
    setLoading(true);
    setError(null);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      const status = permission.status as LocationPermissionStatus;
      setPermissionStatus(status);

      if (status !== 'granted') {
        setError('Activa el permiso de ubicacion para detectar tu punto de partida.');
        setLoading(false);
        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });

      let address: string | undefined;

      try {
        const [reverseGeocode] = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        address = formatAddress(reverseGeocode);
      } catch {
        address = undefined;
      }

      const location: CurrentLocation = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        address,
        timestamp: position.timestamp
      };

      setCurrentLocation(location);
      setLoading(false);
      return location;
    } catch (locationError) {
      setError(locationError instanceof Error ? locationError.message : 'No se pudo obtener la ubicacion');
      setLoading(false);
      return null;
    }
  }, [setCurrentLocation, setError, setLoading, setPermissionStatus]);

  return {
    currentLocation,
    isLoading,
    error,
    refreshCurrentLocation
  };
}
