import { Card } from '@/components/Card';
import { useAppStore } from '@/store/appStore';

export function DriverReviewsPage() {
  const reviews = useAppStore((state) => state.reviews);

  return <div className="space-y-4">{reviews.map((review) => <Card key={review.id} className="space-y-3"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold text-slate-950 dark:text-white">{review.author}</p><p className="text-sm text-slate-500 dark:text-slate-400">{review.rideDate}</p></div><p className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-500">{review.rating} / 5</p></div><p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p></Card>)}</div>;
}
