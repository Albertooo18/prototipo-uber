import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { AuthPage } from '@/pages/auth/AuthPage';
import { ClientHistoryPage } from '@/pages/client/ClientHistoryPage';
import { ClientHomePage } from '@/pages/client/ClientHomePage';
import { ClientOffersPage } from '@/pages/client/ClientOffersPage';
import { ClientPaymentsPage } from '@/pages/client/ClientPaymentsPage';
import { ClientProfilePage } from '@/pages/client/ClientProfilePage';
import { ClientRatingPage } from '@/pages/client/ClientRatingPage';
import { ClientRideStatusPage } from '@/pages/client/ClientRideStatusPage';
import { DriverActiveTripPage } from '@/pages/driver/DriverActiveTripPage';
import { DriverDashboardPage } from '@/pages/driver/DriverDashboardPage';
import { DriverEarningsPage } from '@/pages/driver/DriverEarningsPage';
import { DriverHistoryPage } from '@/pages/driver/DriverHistoryPage';
import { DriverNavigationPage } from '@/pages/driver/DriverNavigationPage';
import { DriverProfilePage } from '@/pages/driver/DriverProfilePage';
import { DriverReviewsPage } from '@/pages/driver/DriverReviewsPage';
import { LandingPage } from '@/pages/LandingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useAppStore } from '@/store/appStore';
import type { UserRole } from '@/types';

function ProtectedRoute({ role }: { role: UserRole }) {
  const authRole = useAppStore((state) => state.authRole);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  if (!isAuthenticated || authRole !== role) return <Navigate to={`/auth/${role}/login`} replace />;
  return <Outlet />;
}

export default function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/:role/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/:role/register" element={<AuthPage mode="register" />} />
      <Route element={<ProtectedRoute role="client" />}>
        <Route path="/client" element={<AppLayout role="client" title="Passenger App" subtitle="Book, compare, and track rides" />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<ClientHomePage />} />
          <Route path="offers" element={<ClientOffersPage />} />
          <Route path="ride-status" element={<ClientRideStatusPage />} />
          <Route path="history" element={<ClientHistoryPage />} />
          <Route path="payments" element={<ClientPaymentsPage />} />
          <Route path="profile" element={<ClientProfilePage />} />
          <Route path="rating" element={<ClientRatingPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="driver" />}>
        <Route path="/driver" element={<AppLayout role="driver" title="Driver App" subtitle="Dispatch, trips, earnings, and rewards" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DriverDashboardPage />} />
          <Route path="navigation" element={<DriverNavigationPage />} />
          <Route path="active-trip" element={<DriverActiveTripPage />} />
          <Route path="earnings" element={<DriverEarningsPage />} />
          <Route path="history" element={<DriverHistoryPage />} />
          <Route path="reviews" element={<DriverReviewsPage />} />
          <Route path="profile" element={<DriverProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
