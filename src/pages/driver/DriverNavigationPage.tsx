import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { useAppStore } from '@/store/appStore';

export function DriverNavigationPage() {
  const navigate = useNavigate();
  const activeDriverTrip = useAppStore((state) => state.activeDriverTrip);

  if (!activeDriverTrip) {
    return <Card className="space-y-4 text-center"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No accepted request yet</h2><Button onClick={() => navigate('/driver/dashboard')}>Back to dashboard</Button></Card>;
  }

  return (
    <div className="space-y-6">
      <MapPlaceholder title="Navigation preview" subtitle="Future backend integration can connect maps, ETA, and turn-by-turn directions." />
      <Card className="space-y-3"><p className="text-sm text-slate-500 dark:text-slate-400">Client details</p><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{activeDriverTrip.riderName}</h2><p className="text-sm text-slate-600 dark:text-slate-300">Pickup: {activeDriverTrip.pickup}</p><p className="text-sm text-slate-600 dark:text-slate-300">Destination: {activeDriverTrip.destination}</p><Button onClick={() => navigate('/driver/active-trip')}>Open active trip screen</Button></Card>
    </div>
  );
}
