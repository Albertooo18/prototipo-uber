import { Clock3, MapPin, Wallet } from 'lucide-react';

import { Card } from '@/components/Card';
import type { Ride } from '@/types';
import { formatCurrency, getStatusMeta } from '@/utils';

export function RideCard({ ride }: { ride: Ride }) {
  const status = getStatusMeta(ride.status);

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{ride.requestedAt}</p>
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(ride.fare)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</span>
      </div>
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-accent" /><div><p className="font-medium text-slate-900 dark:text-white">{ride.pickup}</p><p>Pickup</p></div></div>
        <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-rose-500" /><div><p className="font-medium text-slate-900 dark:text-white">{ride.destination}</p><p>Destination</p></div></div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5"><Clock3 size={14} />{ride.durationMinutes} min</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5"><Wallet size={14} />{ride.paymentMethodLabel ?? 'Payment pending'}</span>
      </div>
    </Card>
  );
}
