import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';

export function ClientHistoryPage() {
  const history = useAppStore((state) => state.clientHistory);
  return <div className="space-y-4">{history.map((ride) => <RideCard key={ride.id} ride={ride} />)}</div>;
}
