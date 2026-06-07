import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';

export function DriverActiveTripPage() {
  const navigate = useNavigate();
  const { activeDriverTrip, advanceDriverTripStatus, completeDriverTrip } = useAppStore();

  if (!activeDriverTrip) {
    return <Card className="space-y-4 text-center"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No active trip</h2><Button onClick={() => navigate('/driver/dashboard')}>Back to dashboard</Button></Card>;
  }

  return (
    <div className="space-y-6">
      <RideCard ride={activeDriverTrip} />
      <Card className="space-y-4"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">Driver trip actions</h2><p className="text-sm text-slate-600 dark:text-slate-300">Simulate arrival, start the ride, and complete the trip from this demo screen.</p><div className="flex flex-col gap-3 sm:flex-row">{activeDriverTrip.status !== 'completed' ? <Button onClick={advanceDriverTripStatus}>Advance trip state</Button> : null}<Button variant="secondary" onClick={() => { completeDriverTrip(); navigate('/driver/earnings'); }}>Complete trip</Button></div></Card>
    </div>
  );
}
