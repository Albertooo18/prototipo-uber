import type { Coordinates } from '@/types/common';

export type LocationPermissionStatus = 'undetermined' | 'granted' | 'denied';

export type CurrentLocation = {
  coords: Coordinates;
  address?: string;
  timestamp: number;
};
