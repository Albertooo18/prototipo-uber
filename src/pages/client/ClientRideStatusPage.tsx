import { CheckCircle2, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DriverCard } from '@/components/DriverCard';
import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';
import { getDriverById, rideStatusFlow } from '@/utils';

export function ClientRideStatusPage() {
  const navigate = useNavigate();
  const { activeClientRide, completedRideToRate, drivers, driverOffers, advanceClientRideStatus } = useAppStore();
  const ride = activeClientRide ?? completedRideToRate;

  if (!ride) {
    return <Card className="space-y-4 text-center"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No ride in progress</h2><Button onClick={() => navigate('/client/home')}>Back to home</Button></Card>;
  }

  const selectedDriver = getDriverById(drivers, ride.driverId);
  const selectedOffer = driverOffers.find((offer) => offer.driverId === ride.driverId);
  const currentIndex = rideStatusFlow.indexOf(ride.status);

  return (
    <div className="space-y-6">
      <RideCard ride={ride} />
      <Card className="space-y-4">
        <div><p className="text-sm text-slate-500 dark:text-slate-400">Ride progress</p><h2 className="text-xl font-semibold text-slate-950 dark:text-white">Track each state of the trip.</h2></div>
        <div className="grid gap-3 md:grid-cols-5">
          {rideStatusFlow.map((status, index) => {
            const isDone = index <= currentIndex;
            return <div key={status} className="flex items-center gap-3 rounded-2xl bg-slate-100 px-3 py-3 dark:bg-white/5">{isDone ? <CheckCircle2 size={18} className="text-emerald-500" /> : <CircleDot size={18} className="text-slate-400" />}<span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">{status.replace('-', ' ')}</span></div>;
          })}
        </div>
        {ride.status !== 'completed' ? <Button onClick={advanceClientRideStatus}>Advance demo ride state</Button> : null}
        {ride.status === 'completed' ? <Button onClick={() => navigate('/client/rating')}>Continue to rating</Button> : null}
      </Card>
      {selectedDriver && selectedOffer ? <div className="space-y-3"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">Driver preview</h3><DriverCard driver={selectedDriver} offer={selectedOffer} /></div> : null}
    </div>
  );
}
