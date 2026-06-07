import { appConfig } from '../config/app';

export function formatCurrency(value: number, currency = appConfig.currency): string {
  return new Intl.NumberFormat('es-PA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(value);
}
