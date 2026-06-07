export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function isValidPhone(value: string): boolean {
  return /^\+?\d{7,15}$/.test(normalizePhone(value));
}
