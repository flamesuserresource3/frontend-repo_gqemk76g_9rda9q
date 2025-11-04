import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';

export default function App() {
  const [active, setActive] = useState('Overview');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-4 space-y-4">
        <Header />
        <div className="flex gap-4">
          <Sidebar active={active} onSelect={setActive} />
          <main className="flex-1 space-y-4">
            {active === 'Overview' && <Overview />}
            {active !== 'Overview' && (
              <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-8 text-sm text-zinc-600 dark:text-zinc-300">
                This section ("{active}") is coming next. Let me know if you want me to build it now — including maps, detailed tables, forecasts, and targets with progress bars.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
