import type { DriverProfile, RideStatus } from '@/types';

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const formatStars = (rating: number) => `${rating.toFixed(1)} / 5`;

export const getDriverById = (drivers: DriverProfile[], driverId?: string) => drivers.find((driver) => driver.id === driverId);

export const getStatusMeta = (status: RideStatus) => {
  const map: Record<RideStatus, { label: string; tone: string }> = {
    searching: { label: 'Searching', tone: 'bg-amber-500/15 text-amber-600 dark:text-amber-300' },
    accepted: { label: 'Accepted', tone: 'bg-sky-500/15 text-sky-600 dark:text-sky-300' },
    'driver-arriving': { label: 'Driver Arriving', tone: 'bg-violet-500/15 text-violet-600 dark:text-violet-300' },
    'in-progress': { label: 'In Progress', tone: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' },
    completed: { label: 'Completed', tone: 'bg-slate-900/10 text-slate-700 dark:bg-white/10 dark:text-slate-200' },
  };

  return map[status];
};

export const calculateRewards = (totalEarnings: number) => {
  const rewardsEarned = Math.floor(totalEarnings / 100);
  const currentProgress = totalEarnings % 100;
  const progressPercent = currentProgress;

  return { rewardsEarned, currentProgress, progressPercent, remaining: 100 - currentProgress };
};

export const rideStatusFlow: RideStatus[] = ['searching', 'accepted', 'driver-arriving', 'in-progress', 'completed'];
