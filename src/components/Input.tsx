import type { InputHTMLAttributes } from 'react';

import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      <input className={cn('w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white', className)} {...props} />
    </label>
  );
}
