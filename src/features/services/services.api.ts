import { appConfig } from '@/lib/config/app';
import { calculateDistance } from '@/lib/utils/calculateDistance';
import type { ApiResponse } from '@/types/api';
import type { Coordinates } from '@/types/common';

import type {
  CreateServicePayload,
  Driver,
  EstimateFarePayload,
  FareEstimate,
  ServiceLocation,
  ServiceRequest,
  ServiceStatus
} from './services.types';

const PANAMA_CITY: Coordinates = {
  latitude: 8.9824,
  longitude: -79.5199
};

const statusFlow: ServiceStatus[] = [
  'solicitado',
  'aceptado',
  'en_camino',
  'iniciado',
  'finalizado'
];

const assignedDriver: Driver = {
  id: 'drv_arcami_001',
  fullName: 'Carlos Mendoza',
  phone: '+507 6123-4567',
  vehicle: 'Toyota Corolla gris',
  rating: 4.9,
  location: {
    latitude: 8.9871,
    longitude: -79.525
  }
};

function wait<T>(data: T, ms = 650): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

function seedFromText(value: string): number {
  return value
    .trim()
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function buildMockLocation(address: string, label: string): ServiceLocation {
  const seed = seedFromText(address);
  const latitudeOffset = ((seed % 42) - 21) / 1000;
  const longitudeOffset = (((seed * 3) % 42) - 21) / 1000;

  return {
    label,
    address: address.trim(),
    latitude: PANAMA_CITY.latitude + latitudeOffset,
    longitude: PANAMA_CITY.longitude + longitudeOffset
  };
}

function buildFareEstimate(origin: ServiceLocation, destination: ServiceLocation): FareEstimate {
  const distanceKm = Math.max(2.2, calculateDistance(origin, destination));
  const amount = Number((3.5 + distanceKm * 1.35).toFixed(2));

  return {
    amount,
    currency: appConfig.currency,
    distanceKm: Number(distanceKm.toFixed(1)),
    durationMinutes: Math.max(8, Math.round(distanceKm * 4))
  };
}

function interpolateLocation(origin: ServiceLocation, destination: ServiceLocation, ratio: number): Coordinates {
  return {
    latitude: origin.latitude + (destination.latitude - origin.latitude) * ratio,
    longitude: origin.longitude + (destination.longitude - origin.longitude) * ratio
  };
}

function getDriverForStatus(service: ServiceRequest, status: ServiceStatus): Driver | undefined {
  if (status === 'solicitado' || status === 'cancelado') {
    return service.driver;
  }

  const ratioByStatus: Partial<Record<ServiceStatus, number>> = {
    aceptado: 0.15,
    en_camino: 0.5,
    iniciado: 0.85,
    finalizado: 1
  };

  return {
    ...assignedDriver,
    location: interpolateLocation(service.origin, service.destination, ratioByStatus[status] ?? 0.15)
  };
}

function createMockService(
  id: string,
  originAddress: string,
  destinationAddress: string,
  status: ServiceStatus,
  createdAt: string
): ServiceRequest {
  const origin = buildMockLocation(originAddress, 'Origen');
  const destination = buildMockLocation(destinationAddress, 'Destino');
  const fare = buildFareEstimate(origin, destination);

  const service: ServiceRequest = {
    id,
    origin,
    destination,
    fare,
    status,
    paymentMethodId: 'cash',
    createdAt,
    updatedAt: createdAt
  };

  return {
    ...service,
    driver: getDriverForStatus(service, status)
  };
}

let mockServices: ServiceRequest[] = [
  createMockService(
    'svc_1002',
    'Costa del Este',
    'Obarrio',
    'finalizado',
    new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  ),
  createMockService(
    'svc_1001',
    'Via Argentina',
    'Casco Antiguo',
    'cancelado',
    new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  )
];

function upsertService(service: ServiceRequest): void {
  mockServices = [
    service,
    ...mockServices.filter((item) => item.id !== service.id)
  ];
}

export const servicesApi = {
  async estimateFare(payload: EstimateFarePayload): Promise<ApiResponse<FareEstimate>> {
    const origin = buildMockLocation(payload.originLabel, 'Origen');
    const destination = buildMockLocation(payload.destinationLabel, 'Destino');

    return wait({
      success: true,
      data: buildFareEstimate(origin, destination)
    });
  },

  async createService(payload: CreateServicePayload): Promise<ApiResponse<ServiceRequest>> {
    const origin = buildMockLocation(payload.originLabel, 'Origen');
    const destination = buildMockLocation(payload.destinationLabel, 'Destino');
    const createdAt = new Date().toISOString();

    const service: ServiceRequest = {
      id: `svc_${Date.now()}`,
      origin,
      destination,
      fare: buildFareEstimate(origin, destination),
      status: 'solicitado',
      paymentMethodId: payload.paymentMethodId ?? 'cash',
      createdAt,
      updatedAt: createdAt
    };

    upsertService(service);

    return wait({
      success: true,
      message: 'Servicio solicitado',
      data: service
    });
  },

  async getHistory(): Promise<ApiResponse<ServiceRequest[]>> {
    const sortedServices = [...mockServices].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return wait({
      success: true,
      data: sortedServices
    });
  },

  async getServiceById(id: string): Promise<ApiResponse<ServiceRequest | null>> {
    return wait({
      success: true,
      data: mockServices.find((service) => service.id === id) ?? null
    });
  },

  async cancelService(id: string): Promise<ApiResponse<ServiceRequest>> {
    const service = mockServices.find((item) => item.id === id);

    if (!service) {
      throw new Error('Servicio no encontrado');
    }

    const updatedService: ServiceRequest = {
      ...service,
      status: 'cancelado',
      updatedAt: new Date().toISOString()
    };

    upsertService(updatedService);

    return wait({
      success: true,
      message: 'Servicio cancelado',
      data: updatedService
    });
  },

  async advanceServiceStatus(id: string): Promise<ApiResponse<ServiceRequest>> {
    const service = mockServices.find((item) => item.id === id);

    if (!service) {
      throw new Error('Servicio no encontrado');
    }

    if (service.status === 'cancelado' || service.status === 'finalizado') {
      return wait({
        success: true,
        data: service
      });
    }

    const currentIndex = statusFlow.indexOf(service.status);
    const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)] ?? service.status;
    const updatedService: ServiceRequest = {
      ...service,
      status: nextStatus,
      updatedAt: new Date().toISOString()
    };

    updatedService.driver = getDriverForStatus(updatedService, nextStatus);
    upsertService(updatedService);

    return wait({
      success: true,
      data: updatedService
    }, 450);
  }
};
