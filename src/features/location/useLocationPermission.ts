import { useCallback } from 'react';
import * as Location from 'expo-location';

import { useLocationStore } from './location.store';
import type { LocationPermissionStatus } from './location.types';

export function useLocationPermission() {
  const permissionStatus = useLocationStore((state) => state.permissionStatus);
  const setPermissionStatus = useLocationStore((state) => state.setPermissionStatus);

  const requestPermission = useCallback(async (): Promise<LocationPermissionStatus> => {
    const response = await Location.requestForegroundPermissionsAsync();
    const status = response.status as LocationPermissionStatus;
    setPermissionStatus(status);
    return status;
  }, [setPermissionStatus]);

  return {
    permissionStatus,
    requestPermission
  };
}
