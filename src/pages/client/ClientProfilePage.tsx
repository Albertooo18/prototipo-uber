import { Bell, MoonStar, Shield } from 'lucide-react';

import { Card } from '@/components/Card';
import { useAppStore } from '@/store/appStore';
import { formatStars } from '@/utils';

export function ClientProfilePage() {
  const { client, theme } = useAppStore();

  return (
    <div className="space-y-4">
      <Card className="space-y-4"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-600 text-lg font-semibold text-white">{client.avatar}</div><div><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{client.name}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{client.email}</p><p className="text-sm text-slate-500 dark:text-slate-400">Passenger rating: {formatStars(client.rating)}</p></div></div></Card>
      <Card className="space-y-4">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200"><Bell size={18} /> Trip alerts enabled</div>
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200"><MoonStar size={18} /> Theme: {theme}</div>
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200"><Shield size={18} /> Emergency contacts ready for future backend sync</div>
      </Card>
    </div>
  );
}
