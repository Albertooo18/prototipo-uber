export type ThemeMode = 'light' | 'dark';
export type UserRole = 'client' | 'driver';
export type RideStatus = 'searching' | 'accepted' | 'driver-arriving' | 'in-progress' | 'completed';

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
}

export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  car: string;
  plate: string;
  rating: number;
  trips: number;
  badges: string[];
  eta: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  type: 'card' | 'cash' | 'wallet';
  details: string;
  isDefault?: boolean;
}

export interface DriverOffer {
  id: string;
  driverId: string;
  price: number;
  etaMinutes: number;
  note: string;
}

export interface Ride {
  id: string;
  pickup: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
  riderName: string;
  fare: number;
  proposedFare: number;
  status: RideStatus;
  requestedAt: string;
  driverId?: string;
  paymentMethodLabel?: string;
  rating?: number;
}

export interface RideRequestCard {
  id: string;
  clientName: string;
  pickup: string;
  destination: string;
  fareOffer: number;
  distanceKm: number;
  etaMinutes: number;
}

export interface EarningsSummary {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
}

export interface DriverReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  rideDate: string;
}

export interface RideDraft {
  pickup: string;
  destination: string;
  proposedFare: number;
}
