import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';

export function DriverHistoryPage() {
  const driverHistory = useAppStore((state) => state.driverHistory);
  return <div className="space-y-4">{driverHistory.map((ride) => <RideCard key={ride.id} ride={ride} />)}</div>;
}
