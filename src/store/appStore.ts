import { create } from 'zustand';

import { clientRideHistory, driverReviews, driverTripHistory, earningsSummary, incomingRequests, mockDrivers, mockOffers, paymentMethods, sampleClient, sampleDriver } from '@/data/mockData';
import type { ClientProfile, DriverOffer, DriverProfile, DriverReview, EarningsSummary, PaymentMethod, Ride, RideDraft, RideRequestCard, RideStatus, ThemeMode, UserRole } from '@/types';
import { rideStatusFlow } from '@/utils';

interface AppState {
  theme: ThemeMode;
  authRole: UserRole | null;
  isAuthenticated: boolean;
  client: ClientProfile;
  driver: DriverProfile;
  drivers: DriverProfile[];
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string;
  rideDraft: RideDraft;
  driverOffers: DriverOffer[];
  activeClientRide: Ride | null;
  clientHistory: Ride[];
  completedRideToRate: Ride | null;
  driverOnline: boolean;
  incomingRequests: RideRequestCard[];
  activeDriverTrip: Ride | null;
  driverHistory: Ride[];
  earnings: EarningsSummary;
  reviews: DriverReview[];
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  setPaymentMethod: (paymentMethodId: string) => void;
  updateRideDraft: (payload: Partial<RideDraft>) => void;
  requestRide: () => void;
  acceptDriverOffer: (offerId: string) => void;
  advanceClientRideStatus: () => void;
  submitRideRating: (rating: number) => void;
  toggleDriverOnline: () => void;
  acceptIncomingRequest: (requestId: string) => void;
  rejectIncomingRequest: (requestId: string) => void;
  advanceDriverTripStatus: () => void;
  completeDriverTrip: () => void;
}

const getNextStatus = (status: RideStatus) => {
  const index = rideStatusFlow.indexOf(status);
  return rideStatusFlow[Math.min(index + 1, rideStatusFlow.length - 1)];
};

export const useAppStore = create<AppState>((set, get) => ({
  theme: 'dark',
  authRole: null,
  isAuthenticated: false,
  client: sampleClient,
  driver: sampleDriver,
  drivers: mockDrivers,
  paymentMethods,
  selectedPaymentMethodId: paymentMethods.find((method) => method.isDefault)?.id ?? paymentMethods[0].id,
  rideDraft: { pickup: 'Brickell City Centre', destination: 'Miami International Airport', proposedFare: 16 },
  driverOffers: mockOffers,
  activeClientRide: null,
  clientHistory: clientRideHistory,
  completedRideToRate: null,
  driverOnline: true,
  incomingRequests,
  activeDriverTrip: null,
  driverHistory: driverTripHistory,
  earnings: earningsSummary,
  reviews: driverReviews,
  login: (role, name) => set((state) => ({ authRole: role, isAuthenticated: true, client: role === 'client' && name ? { ...state.client, name } : state.client, driver: role === 'driver' && name ? { ...state.driver, name } : state.driver })),
  logout: () => set({ authRole: null, isAuthenticated: false }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setPaymentMethod: (paymentMethodId) => set({ selectedPaymentMethodId: paymentMethodId }),
  updateRideDraft: (payload) => set((state) => ({ rideDraft: { ...state.rideDraft, ...payload } })),
  requestRide: () => set((state) => {
    const selectedPayment = state.paymentMethods.find((method) => method.id === state.selectedPaymentMethodId);
    // Backend integration: replace this local ride creation with a POST /rides request.
    return {
      activeClientRide: {
        id: `ride-${Date.now()}`,
        pickup: state.rideDraft.pickup,
        destination: state.rideDraft.destination,
        distanceKm: 11.7,
        durationMinutes: 22,
        riderName: state.client.name,
        fare: state.rideDraft.proposedFare + 2,
        proposedFare: state.rideDraft.proposedFare,
        status: 'searching',
        requestedAt: 'Just now',
        paymentMethodLabel: selectedPayment?.label,
      },
    };
  }),
  acceptDriverOffer: (offerId) => set((state) => {
    const offer = state.driverOffers.find((item) => item.id === offerId);
    if (!state.activeClientRide || !offer) return state;
    return { activeClientRide: { ...state.activeClientRide, driverId: offer.driverId, fare: offer.price, status: 'accepted' } };
  }),
  advanceClientRideStatus: () => set((state) => {
    if (!state.activeClientRide) return state;
    const nextStatus = getNextStatus(state.activeClientRide.status);
    const completedRide = nextStatus === 'completed' ? { ...state.activeClientRide, status: nextStatus } : null;
    return { activeClientRide: completedRide ?? { ...state.activeClientRide, status: nextStatus }, completedRideToRate: completedRide };
  }),
  submitRideRating: (rating) => set((state) => {
    if (!state.completedRideToRate) return state;
    const ratedRide = { ...state.completedRideToRate, rating };
    return { clientHistory: [ratedRide, ...state.clientHistory], completedRideToRate: null, activeClientRide: null };
  }),
  toggleDriverOnline: () => set((state) => ({ driverOnline: !state.driverOnline })),
  acceptIncomingRequest: (requestId) => set((state) => {
    const request = state.incomingRequests.find((item) => item.id === requestId);
    if (!request) return state;
    return {
      incomingRequests: state.incomingRequests.filter((item) => item.id !== requestId),
      activeDriverTrip: {
        id: `trip-${Date.now()}`,
        pickup: request.pickup,
        destination: request.destination,
        distanceKm: request.distanceKm,
        durationMinutes: 20,
        riderName: request.clientName,
        fare: request.fareOffer,
        proposedFare: request.fareOffer,
        status: 'accepted',
        requestedAt: 'Just now',
        paymentMethodLabel: 'Visa',
      },
    };
  }),
  rejectIncomingRequest: (requestId) => set((state) => ({ incomingRequests: state.incomingRequests.filter((item) => item.id !== requestId) })),
  advanceDriverTripStatus: () => set((state) => {
    if (!state.activeDriverTrip) return state;
    return { activeDriverTrip: { ...state.activeDriverTrip, status: getNextStatus(state.activeDriverTrip.status) } };
  }),
  completeDriverTrip: () => set((state) => {
    if (!state.activeDriverTrip) return state;
    const completedTrip = { ...state.activeDriverTrip, status: 'completed' as const };
    // Backend integration: replace this with PATCH /trips/:id/complete and earnings refresh.
    return {
      activeDriverTrip: null,
      driverHistory: [completedTrip, ...state.driverHistory],
      earnings: {
        daily: state.earnings.daily + completedTrip.fare,
        weekly: state.earnings.weekly + completedTrip.fare,
        monthly: state.earnings.monthly + completedTrip.fare,
        total: state.earnings.total + completedTrip.fare,
      },
    };
  }),
}));
