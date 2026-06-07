import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DriverCard } from '@/components/DriverCard';
import { useAppStore } from '@/store/appStore';
import { getDriverById } from '@/utils';

export function ClientOffersPage() {
  const navigate = useNavigate();
  const { driverOffers, drivers, activeClientRide, acceptDriverOffer } = useAppStore();

  if (!activeClientRide) {
    return <Card className="space-y-4 text-center"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No active ride request</h2><p className="text-sm text-slate-500 dark:text-slate-400">Create a ride request first to see driver offers.</p><Button onClick={() => navigate('/client/home')}>Go to passenger home</Button></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-2"><p className="text-sm text-slate-500 dark:text-slate-400">Fare offer sent</p><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Drivers are responding to your proposed price.</h2><p className="text-sm text-slate-600 dark:text-slate-300">Compare ETA, ratings, and notes before accepting an offer.</p></Card>
      <div className="grid gap-4 xl:grid-cols-2">
        {driverOffers.map((offer) => {
          const driver = getDriverById(drivers, offer.driverId);
          if (!driver) return null;
          return <DriverCard key={offer.id} driver={driver} offer={offer} onAccept={() => { acceptDriverOffer(offer.id); navigate('/client/ride-status'); }} />;
        })}
      </div>
    </div>
  );
}
