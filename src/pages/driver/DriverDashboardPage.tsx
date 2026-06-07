import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { useAppStore } from '@/store/appStore';
import { formatCurrency } from '@/utils';

export function DriverDashboardPage() {
  const navigate = useNavigate();
  const { driver, driverOnline, toggleDriverOnline, incomingRequests, acceptIncomingRequest, rejectIncomingRequest, activeDriverTrip } = useAppStore();

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-500 to-slate-900 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-emerald-100">Driver dashboard</p><h2 className="mt-2 text-2xl font-semibold">Ready to drive, {driver.name.split(' ')[0]}?</h2><p className="mt-2 text-sm text-slate-200">Manage ride requests, active trips, earnings, and rewards from one place.</p></div><Button variant={driverOnline ? 'secondary' : 'primary'} onClick={toggleDriverOnline}>{driverOnline ? 'Go offline' : 'Go online'}</Button></div>
      </Card>
      <MapPlaceholder title="Driver navigation zone" subtitle="Placeholder for live demand heatmap and route directions." />
      {activeDriverTrip ? <Card className="space-y-3"><p className="text-sm text-slate-500 dark:text-slate-400">Active trip</p><h3 className="text-xl font-semibold text-slate-950 dark:text-white">{activeDriverTrip.riderName} is waiting</h3><p className="text-sm text-slate-600 dark:text-slate-300">{activeDriverTrip.pickup} to {activeDriverTrip.destination}</p><Button onClick={() => navigate('/driver/active-trip')}>Open active trip</Button></Card> : null}
      <div className="space-y-4">
        <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">Incoming ride requests</h3><p className="text-sm text-slate-500 dark:text-slate-400">{incomingRequests.length} waiting</p></div>
        <div className="grid gap-4 xl:grid-cols-2">
          {incomingRequests.map((request) => <Card key={request.id} className="space-y-4"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-slate-950 dark:text-white">{request.clientName}</p><p className="text-sm text-slate-500 dark:text-slate-400">{request.pickup}</p><p className="text-sm text-slate-500 dark:text-slate-400">to {request.destination}</p></div><div className="text-right"><p className="text-xl font-semibold text-slate-950 dark:text-white">{formatCurrency(request.fareOffer)}</p><p className="text-sm text-slate-500 dark:text-slate-400">{request.etaMinutes} min pickup</p></div></div><div className="flex gap-3"><Button fullWidth onClick={() => { acceptIncomingRequest(request.id); navigate('/driver/navigation'); }}>Accept</Button><Button fullWidth variant="ghost" onClick={() => rejectIncomingRequest(request.id)}>Reject</Button></div></Card>)}
        </div>
      </div>
    </div>
  );
}
