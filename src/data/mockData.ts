import type {
  ClientProfile,
  DriverOffer,
  DriverProfile,
  DriverReview,
  EarningsSummary,
  PaymentMethod,
  Ride,
  RideRequestCard,
} from '@/types';

export const sampleClient: ClientProfile = {
  id: 'client-1',
  name: 'Maya Johnson',
  email: 'maya@example.com',
  phone: '+1 (305) 555-0134',
  avatar: 'MJ',
  rating: 4.9,
};

export const sampleDriver: DriverProfile = {
  id: 'driver-1',
  name: 'Daniel Brooks',
  email: 'daniel@example.com',
  phone: '+1 (786) 555-0178',
  avatar: 'DB',
  car: 'Toyota Corolla 2023',
  plate: 'ARC-2481',
  rating: 4.95,
  trips: 1428,
  badges: ['Safe Driver', 'Top Rated', 'Punctual'],
  eta: '4 min away',
};

export const mockDrivers: DriverProfile[] = [
  sampleDriver,
  {
    id: 'driver-2',
    name: 'Sofia Ramirez',
    email: 'sofia@example.com',
    phone: '+1 (305) 555-0181',
    avatar: 'SR',
    car: 'Hyundai Elantra 2022',
    plate: 'DRV-6821',
    rating: 4.88,
    trips: 962,
    badges: ['Friendly', 'Clean Car'],
    eta: '6 min away',
  },
  {
    id: 'driver-3',
    name: 'Marcus Lee',
    email: 'marcus@example.com',
    phone: '+1 (954) 555-0112',
    avatar: 'ML',
    car: 'Kia K5 2024',
    plate: 'MVP-9210',
    rating: 4.92,
    trips: 1204,
    badges: ['Fast Arrival', '5-Star Streak'],
    eta: '3 min away',
  },
  {
    id: 'driver-4',
    name: 'Olivia Chen',
    email: 'olivia@example.com',
    phone: '+1 (407) 555-0109',
    avatar: 'OC',
    car: 'Nissan Sentra 2021',
    plate: 'RDE-4438',
    rating: 4.8,
    trips: 704,
    badges: ['New Favorite'],
    eta: '8 min away',
  },
];

export const mockOffers: DriverOffer[] = [
  {
    id: 'offer-1',
    driverId: 'driver-1',
    price: 18,
    etaMinutes: 4,
    note: 'I can be there quickly and take the highway route.',
  },
  {
    id: 'offer-2',
    driverId: 'driver-3',
    price: 17,
    etaMinutes: 3,
    note: 'Closest driver to your pickup point right now.',
  },
  {
    id: 'offer-3',
    driverId: 'driver-2',
    price: 19,
    etaMinutes: 6,
    note: 'Comfort ride with extra luggage space.',
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'pm-1', label: 'Visa ending in 4821', type: 'card', details: 'Default card', isDefault: true },
  { id: 'pm-2', label: 'Cash', type: 'cash', details: 'Pay directly to driver' },
  { id: 'pm-3', label: 'RideFlow Wallet', type: 'wallet', details: 'Balance: $32.40' },
];

export const clientRideHistory: Ride[] = [
  {
    id: 'ride-101',
    pickup: 'Brickell City Centre',
    destination: 'Miami Airport Terminal D',
    distanceKm: 12.3,
    durationMinutes: 24,
    riderName: 'Maya Johnson',
    fare: 24,
    proposedFare: 22,
    status: 'completed',
    requestedAt: 'Today, 8:30 AM',
    driverId: 'driver-2',
    paymentMethodLabel: 'Visa ending in 4821',
    rating: 5,
  },
  {
    id: 'ride-102',
    pickup: 'Wynwood Walls',
    destination: 'Downtown Miami',
    distanceKm: 6.8,
    durationMinutes: 16,
    riderName: 'Maya Johnson',
    fare: 14,
    proposedFare: 13,
    status: 'completed',
    requestedAt: 'Yesterday, 7:10 PM',
    driverId: 'driver-3',
    paymentMethodLabel: 'Cash',
    rating: 4,
  },
  {
    id: 'ride-103',
    pickup: 'Bayside Marketplace',
    destination: 'South Beach',
    distanceKm: 9.1,
    durationMinutes: 19,
    riderName: 'Maya Johnson',
    fare: 20,
    proposedFare: 18,
    status: 'completed',
    requestedAt: 'Mon, 1:45 PM',
    driverId: 'driver-1',
    paymentMethodLabel: 'RideFlow Wallet',
    rating: 5,
  },
];

export const driverTripHistory: Ride[] = [
  {
    id: 'trip-201',
    pickup: 'Coconut Grove',
    destination: 'Coral Gables',
    distanceKm: 7.2,
    durationMinutes: 17,
    riderName: 'Amelia Carter',
    fare: 16,
    proposedFare: 15,
    status: 'completed',
    requestedAt: 'Today, 9:15 AM',
    paymentMethodLabel: 'Visa',
    rating: 5,
  },
  {
    id: 'trip-202',
    pickup: 'Little Havana',
    destination: 'Brickell',
    distanceKm: 5.9,
    durationMinutes: 15,
    riderName: 'Noah Flores',
    fare: 13,
    proposedFare: 12,
    status: 'completed',
    requestedAt: 'Yesterday, 5:40 PM',
    paymentMethodLabel: 'Cash',
    rating: 4,
  },
  {
    id: 'trip-203',
    pickup: 'Miami Design District',
    destination: 'Aventura Mall',
    distanceKm: 18.4,
    durationMinutes: 31,
    riderName: 'Emma Scott',
    fare: 32,
    proposedFare: 29,
    status: 'completed',
    requestedAt: 'Sun, 11:05 AM',
    paymentMethodLabel: 'Wallet',
    rating: 5,
  },
];

export const incomingRequests: RideRequestCard[] = [
  { id: 'request-1', clientName: 'Lucas Reed', pickup: 'Port of Miami', destination: 'Midtown Miami', fareOffer: 21, distanceKm: 10.5, etaMinutes: 5 },
  { id: 'request-2', clientName: 'Ava Thompson', pickup: 'South Pointe Park', destination: 'Brickell Key', fareOffer: 18, distanceKm: 8.1, etaMinutes: 4 },
  { id: 'request-3', clientName: 'James Walker', pickup: 'Miami Beach Convention Center', destination: 'Edgewater', fareOffer: 23, distanceKm: 11.2, etaMinutes: 7 },
];

export const earningsSummary: EarningsSummary = { daily: 75, weekly: 220, monthly: 1840, total: 1840 };

export const driverReviews: DriverReview[] = [
  { id: 'review-1', author: 'Liam Peterson', rating: 5, comment: 'Smooth ride, very professional, and arrived early.', rideDate: 'Today' },
  { id: 'review-2', author: 'Sophia Green', rating: 4, comment: 'Great communication and a clean car.', rideDate: 'Yesterday' },
  { id: 'review-3', author: 'Mason Wright', rating: 5, comment: 'Fast pickup and safe driving the entire trip.', rideDate: 'Mon' },
];
