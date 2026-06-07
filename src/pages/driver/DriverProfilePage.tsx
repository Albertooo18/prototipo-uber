import { CarFront, ShieldCheck, Star } from 'lucide-react';

import { Card } from '@/components/Card';
import { useAppStore } from '@/store/appStore';
import { formatStars } from '@/utils';

export function DriverProfilePage() {
  const driver = useAppStore((state) => state.driver);

  return (
    <div className="space-y-4">
      <Card className="space-y-4"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-lg font-semibold text-white">{driver.avatar}</div><div><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{driver.name}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{driver.email}</p><p className="text-sm text-slate-500 dark:text-slate-400">{driver.car}</p></div></div></Card>
      <Card className="space-y-4 text-sm text-slate-600 dark:text-slate-300"><div className="flex items-center gap-3"><Star size={16} /> Rating: {formatStars(driver.rating)}</div><div className="flex items-center gap-3"><CarFront size={16} /> Plate: {driver.plate}</div><div className="flex items-center gap-3"><ShieldCheck size={16} /> Badges: {driver.badges.join(', ')}</div></Card>
    </div>
  );
}
