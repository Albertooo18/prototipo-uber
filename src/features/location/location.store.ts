import { create } from 'zustand';

import type { CurrentLocation, LocationPermissionStatus } from './location.types';

type LocationState = {
  currentLocation: CurrentLocation | null;
  permissionStatus: LocationPermissionStatus;
  isLoading: boolean;
  error: string | null;
  setCurrentLocation: (location: CurrentLocation | null) => void;
  setPermissionStatus: (status: LocationPermissionStatus) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  permissionStatus: 'undetermined',
  isLoading: false,
  error: null,

  setCurrentLocation(location) {
    set({ currentLocation: location });
  },

  setPermissionStatus(status) {
    set({ permissionStatus: status });
  },

  setLoading(isLoading) {
    set({ isLoading });
  },

  setError(error) {
    set({ error });
  }
}));
