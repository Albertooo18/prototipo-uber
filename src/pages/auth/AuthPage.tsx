import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAppStore } from '@/store/appStore';
import type { UserRole } from '@/types';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { role = 'client' } = useParams();
  const typedRole = role as UserRole;
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(typedRole === 'driver' ? 'daniel@example.com' : 'maya@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = () => {
    // Backend integration: submit auth form to API and store the returned session token.
    login(typedRole, mode === 'register' ? name : undefined);
    navigate(typedRole === 'client' ? '/client/home' : '/driver/dashboard');
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-lg space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">{typedRole}</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{mode === 'login' ? `Sign in to continue as a ${typedRole}.` : `Create a new ${typedRole} account for the demo.`}</p>
        </div>
        <div className="space-y-4">
          {mode === 'register' ? <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" /> : null}
          <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
        </div>
        <Button fullWidth onClick={handleSubmit}>{mode === 'login' ? 'Sign in' : 'Create account'}</Button>
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <Link to={mode === 'login' ? `/auth/${typedRole}/register` : `/auth/${typedRole}/login`} className="text-brand-600">{mode === 'login' ? 'Create a new account' : 'Already have an account? Sign in'}</Link>
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white">Back home</Link>
        </div>
      </Card>
    </AuthLayout>
  );
}
