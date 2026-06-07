import type { PaymentMethodType } from '../payments/payments.types';
import type { Coordinates } from '@/types/common';

export type ServiceStatus =
  | 'solicitado'
  | 'aceptado'
  | 'en_camino'
  | 'iniciado'
  | 'finalizado'
  | 'cancelado';

export type ServiceLocation = Coordinates & {
  label: string;
  address: string;
};

export type Driver = {
  id: string;
  fullName: string;
  phone: string;
  vehicle: string;
  rating: number;
  location: Coordinates;
};

export type FareEstimate = {
  amount: number;
  currency: string;
  distanceKm: number;
  durationMinutes: number;
};

export type EstimateFarePayload = {
  originLabel: string;
  destinationLabel: string;
};

export type CreateServicePayload = EstimateFarePayload & {
  paymentMethodId?: PaymentMethodType;
};

export type ServiceRequest = {
  id: string;
  origin: ServiceLocation;
  destination: ServiceLocation;
  fare: FareEstimate;
  status: ServiceStatus;
  paymentMethodId: PaymentMethodType;
  driver?: Driver;
  createdAt: string;
  updatedAt: string;
};
