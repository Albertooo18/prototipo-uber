import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/utils';

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/90', className)} {...props}>
      {children}
    </div>
  );
}
