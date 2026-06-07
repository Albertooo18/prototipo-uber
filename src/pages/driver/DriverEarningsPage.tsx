import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { EarningsCard } from '@/components/EarningsCard';
import { RewardProgress } from '@/components/RewardProgress';
import { RideCard } from '@/components/RideCard';
import { useAppStore } from '@/store/appStore';

export function DriverEarningsPage() {
  const navigate = useNavigate();
  const { earnings, driverHistory } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><EarningsCard label="Daily" value={earnings.daily} /><EarningsCard label="Weekly" value={earnings.weekly} /><EarningsCard label="Monthly" value={earnings.monthly} /><EarningsCard label="Total" value={earnings.total} /></div>
      <RewardProgress totalEarnings={earnings.weekly} />
      <div className="space-y-4"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">Trips contributing to earnings</h3><Button variant="ghost" onClick={() => navigate('/driver/history')}>View full history</Button></div>{driverHistory.slice(0, 3).map((ride) => <RideCard key={ride.id} ride={ride} />)}</div>
    </div>
  );
}
