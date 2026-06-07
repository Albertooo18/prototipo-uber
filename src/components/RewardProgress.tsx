import { Award } from 'lucide-react';

import { Card } from '@/components/Card';
import { calculateRewards, formatCurrency } from '@/utils';

export function RewardProgress({ totalEarnings }: { totalEarnings: number }) {
  const { rewardsEarned, currentProgress, progressPercent, remaining } = calculateRewards(totalEarnings);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Rewards</p>
          <p className="text-xl font-semibold text-slate-950 dark:text-white">{rewardsEarned} badges earned</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500"><Award size={22} /></div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{formatCurrency(currentProgress)} toward next $100 reward</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-3 rounded-full bg-amber-500" style={{ width: `${progressPercent}%` }} /></div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">Earn {formatCurrency(remaining)} more to unlock the next reward badge.</p>
    </Card>
  );
}
