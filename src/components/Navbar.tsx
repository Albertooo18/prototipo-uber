import { LogOut, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/Button';
import { useAppStore } from '@/store/appStore';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const { theme, toggleTheme, logout } = useAppStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{title}</p>
          {subtitle ? <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="ghost" onClick={logout} aria-label="Logout">
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
