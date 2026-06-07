import { Outlet } from 'react-router-dom';

import { BottomTab } from '@/components/BottomTab';
import { Navbar } from '@/components/Navbar';
import type { UserRole } from '@/types';

interface AppLayoutProps {
  role: UserRole;
  title: string;
  subtitle?: string;
}

export function AppLayout({ role, title, subtitle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar title={title} subtitle={subtitle} />
      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6"><Outlet /></main>
      <BottomTab role={role} />
    </div>
  );
}
