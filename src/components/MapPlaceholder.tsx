import { MapPinned, Navigation } from 'lucide-react';

import { Card } from '@/components/Card';

export function MapPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card className="relative overflow-hidden p-0">
      <div className="h-64 bg-slate-100 bg-grid bg-[size:22px_22px] dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-accent/20" />
        <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft dark:bg-slate-800 dark:text-brand-300">
            <MapPinned size={28} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">{title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-medium text-white dark:bg-white dark:text-slate-950">
            <Navigation size={14} />
            Map API placeholder
          </div>
        </div>
      </div>
    </Card>
  );
}
