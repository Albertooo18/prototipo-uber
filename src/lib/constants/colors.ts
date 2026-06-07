export const colors = {
  primary: '#2D336B',
  accent: '#8B5CF6',
  background: '#F5F4EF',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#F59E0B',
  border: '#E5E7EB',
  muted: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000'
} as const;

export type ColorToken = keyof typeof colors;
