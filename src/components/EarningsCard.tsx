import { Card } from '@/components/Card';
import { formatCurrency } from '@/utils';

export function EarningsCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="space-y-2">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-slate-950 dark:text-white">{formatCurrency(value)}</p>
    </Card>
  );
}
