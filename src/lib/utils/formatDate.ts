export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('es-PA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}
