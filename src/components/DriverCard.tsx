import { CarFront, ShieldCheck, Star } from 'lucide-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import type { DriverOffer, DriverProfile } from '@/types';
import { formatCurrency } from '@/utils';

interface DriverCardProps {
  driver: DriverProfile;
  offer: DriverOffer;
  onAccept?: () => void;
}

export function DriverCard({ driver, offer, onAccept }: DriverCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-sm font-semibold text-white">{driver.avatar}</div>
          <div>
            <p className="font-semibold text-slate-950 dark:text-white">{driver.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{driver.car}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(offer.price)}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{offer.etaMinutes} min away</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5"><Star size={14} />{driver.rating}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5"><CarFront size={14} />{driver.plate}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5"><ShieldCheck size={14} />{driver.trips} trips</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{offer.note}</p>
      {onAccept ? <Button fullWidth onClick={onAccept}>Accept offer</Button> : null}
    </Card>
  );
}
