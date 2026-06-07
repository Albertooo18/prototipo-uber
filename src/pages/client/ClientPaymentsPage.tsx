import { Check } from 'lucide-react';

import { Card } from '@/components/Card';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/utils';

export function ClientPaymentsPage() {
  const { paymentMethods, selectedPaymentMethodId, setPaymentMethod } = useAppStore();

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => {
        const selected = method.id === selectedPaymentMethodId;
        return <button key={method.id} onClick={() => setPaymentMethod(method.id)} className="w-full text-left"><Card className={cn('transition', selected && 'border-brand-500 ring-2 ring-brand-500/20')}><div className="flex items-center justify-between gap-4"><div><p className="font-semibold text-slate-950 dark:text-white">{method.label}</p><p className="text-sm text-slate-500 dark:text-slate-400">{method.details}</p></div>{selected ? <Check className="text-brand-600" /> : null}</div></Card></button>;
      })}
    </div>
  );
}
