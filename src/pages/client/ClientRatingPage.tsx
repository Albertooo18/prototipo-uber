import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useAppStore } from '@/store/appStore';

export function ClientRatingPage() {
  const navigate = useNavigate();
  const { completedRideToRate, submitRideRating } = useAppStore();

  if (!completedRideToRate) {
    return <Card className="space-y-4 text-center"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No ride waiting for rating</h2><Button onClick={() => navigate('/client/history')}>View trip history</Button></Card>;
  }

  return (
    <Card className="mx-auto max-w-2xl space-y-6 text-center">
      <div><p className="text-sm text-slate-500 dark:text-slate-400">Ride completed</p><h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">How was your trip?</h2></div>
      <div className="flex flex-wrap justify-center gap-3">{[1, 2, 3, 4, 5].map((rating) => <Button key={rating} variant={rating >= 4 ? 'primary' : 'secondary'} onClick={() => { submitRideRating(rating); navigate('/client/history'); }}>{rating} star{rating > 1 ? 's' : ''}</Button>)}</div>
    </Card>
  );
}
