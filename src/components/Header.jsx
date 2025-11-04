import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Bell, Calendar, User, Sun, Moon, Menu } from 'lucide-react';

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, setDark];
}

export default function Header({ onToggleSidebar }) {
  const [dark, setDark] = useDarkMode();
  const [dateRange] = useState('Jan 2025 – Oct 2025');

  return (
    <header className="relative w-full overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900">
      {/* Spline Hero Background */}
      <div className="absolute inset-0 h-64">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay (non-interactive) */}
      <div className="pointer-events-none absolute inset-0 h-64 bg-gradient-to-b from-black/20 via-black/30 to-white/90 dark:to-zinc-900/95" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-zinc-100">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="sm:hidden inline-flex items-center justify-center rounded-md bg-white/80 dark:bg-zinc-900/80 p-2 text-zinc-900 dark:text-zinc-100 border border-white/30 dark:border-zinc-800/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Calendar className="h-4 w-4" />
          <span className="sr-only">Selected date range</span>
          <span aria-live="polite">{dateRange}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 backdrop-blur hover:bg-white dark:hover:bg-zinc-900"
            aria-label="3 New Leads Added"
            title="3 New Leads Added"
          >
            <Bell className="h-4 w-4 text-rose-500" />
            <span className="hidden sm:inline">3 New Leads Added</span>
          </button>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-2 text-zinc-700 dark:text-zinc-200 backdrop-blur hover:bg-white dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 backdrop-blur">
            <User className="h-4 w-4" />
            <span>Sales Manager</span>
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="relative z-10 px-4 sm:px-6 pt-6 pb-6 sm:pb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow">
          India Sales Performance Dashboard – 2025
        </h1>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-zinc-100/90">
          Tracking sales growth, revenue performance, and customer metrics in real-time across all regions of India.
        </p>
      </div>
    </header>
  );
}
