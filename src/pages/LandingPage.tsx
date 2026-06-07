import { ArrowRight, CarFront, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-brand-700 to-slate-900 p-8 text-white shadow-soft sm:p-10">
          <p className="mb-3 text-sm text-slate-200">Production-style demo frontend</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">RideFlow for client bookings and driver operations.</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">React + TypeScript + Tailwind CSS MVP inspired by Uber and InDrive, with fare negotiation, trip status tracking, earnings, rewards, and responsive dark mode.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white"><UserRound size={24} /></div>
            <div><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Passenger app</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Login, request rides, propose fares, review driver offers, track rides, manage payments, and rate completed trips.</p></div>
            <Link to="/auth/client/login"><Button fullWidth>Enter passenger flow <ArrowRight size={16} className="ml-2" /></Button></Link>
          </Card>
          <Card className="space-y-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white"><CarFront size={24} /></div>
            <div><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Driver app</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Go online, review incoming requests, manage active trips, track earnings, monitor reward progress, and read ratings.</p></div>
            <Link to="/auth/driver/login"><Button fullWidth variant="secondary">Enter driver flow <ArrowRight size={16} className="ml-2" /></Button></Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
