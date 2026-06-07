import { create } from 'zustand';

import { servicesApi } from './services.api';
import type {
  CreateServicePayload,
  EstimateFarePayload,
  FareEstimate,
  ServiceRequest
} from './services.types';

type ServicesState = {
  activeService: ServiceRequest | null;
  selectedService: ServiceRequest | null;
  history: ServiceRequest[];
  fareEstimate: FareEstimate | null;
  isLoading: boolean;
  error: string | null;
  loadHistory: () => Promise<void>;
  estimateFare: (payload: EstimateFarePayload) => Promise<void>;
  clearFareEstimate: () => void;
  createService: (payload: CreateServicePayload) => Promise<ServiceRequest>;
  getServiceDetail: (id: string) => Promise<ServiceRequest | null>;
  cancelActiveService: () => Promise<ServiceRequest | null>;
  simulateStatusProgress: () => Promise<ServiceRequest | null>;
};

function upsertHistory(history: ServiceRequest[], service: ServiceRequest): ServiceRequest[] {
  return [
    service,
    ...history.filter((item) => item.id !== service.id)
  ];
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'No se pudo completar la accion';
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  activeService: null,
  selectedService: null,
  history: [],
  fareEstimate: null,
  isLoading: false,
  error: null,

  async loadHistory() {
    set({ isLoading: true, error: null });

    try {
      const response = await servicesApi.getHistory();
      set({ history: response.data, isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  async estimateFare(payload) {
    set({ error: null });

    try {
      const response = await servicesApi.estimateFare(payload);
      set({ fareEstimate: response.data });
    } catch (error) {
      set({ error: getErrorMessage(error), fareEstimate: null });
    }
  },

  clearFareEstimate() {
    set({ fareEstimate: null });
  },

  async createService(payload) {
    set({ isLoading: true, error: null });

    try {
      const response = await servicesApi.createService(payload);
      set((state) => ({
        activeService: response.data,
        selectedService: response.data,
        history: upsertHistory(state.history, response.data),
        fareEstimate: response.data.fare,
        isLoading: false
      }));

      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  async getServiceDetail(id) {
    set({ isLoading: true, error: null });

    try {
      const response = await servicesApi.getServiceById(id);
      set({ selectedService: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      return null;
    }
  },

  async cancelActiveService() {
    const currentService = get().activeService;

    if (!currentService) {
      return null;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await servicesApi.cancelService(currentService.id);
      set((state) => ({
        activeService: response.data,
        selectedService: response.data,
        history: upsertHistory(state.history, response.data),
        isLoading: false
      }));

      return response.data;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      return null;
    }
  },

  async simulateStatusProgress() {
    const currentService = get().activeService;

    if (!currentService) {
      return null;
    }

    try {
      const response = await servicesApi.advanceServiceStatus(currentService.id);
      set((state) => ({
        activeService: response.data,
        selectedService: response.data,
        history: upsertHistory(state.history, response.data)
      }));

      return response.data;
    } catch (error) {
      set({ error: getErrorMessage(error) });
      return null;
    }
  }
}));
