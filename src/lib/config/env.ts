export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.arcami.local/api',
  googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
} as const;
