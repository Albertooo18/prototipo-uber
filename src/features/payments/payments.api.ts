import type { ApiResponse } from '@/types/api';

import type { PaymentMethod } from './payments.types';

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    label: 'Efectivo',
    description: 'Paga directamente al proveedor al finalizar el servicio.',
    enabled: true
  },
  {
    id: 'yappy',
    label: 'Yappy',
    description: 'Preparado para pagos moviles con Yappy.',
    enabled: true
  },
  {
    id: 'bank_transfer',
    label: 'Transferencia',
    description: 'Disponible para pagos coordinados por soporte.',
    enabled: true
  },
  {
    id: 'future_card',
    label: 'Tarjeta',
    description: 'Integracion futura con pasarela de pagos.',
    enabled: false,
    comingSoon: true
  }
];

export const paymentsApi = {
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return {
      success: true,
      data: mockPaymentMethods
    };
  }
};
