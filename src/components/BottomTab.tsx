import { Car, CircleDollarSign, History, Home, MapPinned, Settings, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import type { UserRole } from '@/types';
import { cn } from '@/utils';

const tabsByRole: Record<UserRole, Array<{ label: string; to: string; icon: typeof Home }>> = {
  client: [
    { label: 'Home', to: '/client/home', icon: Home },
    { label: 'Offers', to: '/client/offers', icon: Car },
    { label: 'History', to: '/client/history', icon: History },
    { label: 'Payments', to: '/client/payments', icon: CircleDollarSign },
    { label: 'Profile', to: '/client/profile', icon: Settings },
  ],
  driver: [
    { label: 'Dashboard', to: '/driver/dashboard', icon: Home },
    { label: 'Trip', to: '/driver/active-trip', icon: MapPinned },
    { label: 'Earnings', to: '/driver/earnings', icon: CircleDollarSign },
    { label: 'Reviews', to: '/driver/reviews', icon: Star },
    { label: 'Profile', to: '/driver/profile', icon: Settings },
  ],
};

export function BottomTab({ role }: { role: UserRole }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200/70 bg-white/95 px-2 py-2 backdrop-blur dark:border-white/10 dark:bg-slate-950/95">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {tabsByRole[role].map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('flex flex-col items-center rounded-2xl px-2 py-3 text-xs font-medium transition', isActive ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10')}>
              <Icon size={18} />
              <span className="mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
