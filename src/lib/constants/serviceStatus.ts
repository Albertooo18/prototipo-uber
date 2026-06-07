import { colors } from './colors';

export const serviceStatusConfig = {
  solicitado: {
    label: 'Solicitado',
    color: colors.warning,
    backgroundColor: '#FEF3C7'
  },
  aceptado: {
    label: 'Aceptado',
    color: colors.primary,
    backgroundColor: '#E0E7FF'
  },
  en_camino: {
    label: 'En camino',
    color: colors.accent,
    backgroundColor: '#EDE9FE'
  },
  iniciado: {
    label: 'Iniciado',
    color: colors.primary,
    backgroundColor: '#DBEAFE'
  },
  finalizado: {
    label: 'Finalizado',
    color: colors.success,
    backgroundColor: '#DCFCE7'
  },
  cancelado: {
    label: 'Cancelado',
    color: colors.error,
    backgroundColor: '#FEE2E2'
  }
} as const;
