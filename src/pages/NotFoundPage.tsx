import { Link } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export function NotFoundPage() {
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950"><Card className="space-y-4 text-center"><h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Page not found</h1><Link to="/"><Button>Return home</Button></Link></Card></div>;
}
