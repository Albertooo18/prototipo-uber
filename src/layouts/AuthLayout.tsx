import type { PropsWithChildren } from 'react';

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="mb-8 rounded-[2rem] bg-gradient-to-br from-brand-600 via-slate-900 to-slate-950 p-8 text-white shadow-soft lg:mb-0">
          <div className="max-w-md space-y-5">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium">RideFlow MVP</span>
            <h1 className="text-4xl font-semibold tracking-tight">Ride-hailing frontend for passengers and drivers.</h1>
            <p className="text-sm text-slate-200">Demo-ready flows for ride booking, fare offers, driver dispatch, trip tracking, earnings, rewards, and ratings.</p>
          </div>
        </div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
