import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';
import { formatCurrency } from '@/utils';

export function ClientHomePage() {
  const navigate = useNavigate();
  const { client, rideDraft, updateRideDraft, requestRide, activeClientRide } = useAppStore();

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-brand-600 to-slate-900 text-white">
        <p className="text-sm text-brand-100">Passenger dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold">Hello, {client.name.split(' ')[0]}</h2>
        <p className="mt-2 text-sm text-slate-200">Book a ride, set your own fare, and compare offers from nearby drivers.</p>
      </Card>
      <MapPlaceholder title="Live service area" subtitle="Styled placeholder for map, routes, and pickup pins." />
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Pickup" value={rideDraft.pickup} onChange={(event) => updateRideDraft({ pickup: event.target.value })} />
          <Input label="Destination" value={rideDraft.destination} onChange={(event) => updateRideDraft({ destination: event.target.value })} />
        </div>
        <Input label="Your fare offer" type="number" min={1} value={rideDraft.proposedFare} onChange={(event) => updateRideDraft({ proposedFare: Number(event.target.value) })} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm text-slate-500 dark:text-slate-400">Suggested market range</p><p className="text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(18)} to {formatCurrency(24)}</p></div>
          <Button onClick={() => { requestRide(); navigate('/client/offers'); }}>Request ride</Button>
        </div>
      </Card>
      {activeClientRide ? <div className="space-y-3"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">Current ride</h3><Button variant="ghost" onClick={() => navigate('/client/ride-status')}>View status</Button></div><RideCard ride={activeClientRide} /></div> : null}
    </div>
  );
}
