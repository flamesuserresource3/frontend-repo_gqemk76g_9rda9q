import { useEffect, useState } from 'react';
import { Home, BarChart3, ShoppingBag, Users, LineChart, Target, FileText } from 'lucide-react';

const nav = [
  { label: 'Overview', icon: Home },
  { label: 'Regional Sales', icon: BarChart3 },
  { label: 'Product Performance', icon: ShoppingBag },
  { label: 'Customer Insights', icon: Users },
  { label: 'Revenue Trends', icon: LineChart },
  { label: 'Sales Targets', icon: Target },
  { label: 'Reports & Forecasts', icon: FileText },
];

export default function Sidebar({ active = 'Overview', onSelect, open }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar');
    if (saved === 'closed') setIsOpen(false);
  }, []);

  useEffect(() => {
    if (typeof open === 'boolean') setIsOpen(open);
  }, [open]);

  useEffect(() => {
    localStorage.setItem('sidebar', isOpen ? 'open' : 'closed');
  }, [isOpen]);

  return (
    <aside className={`${isOpen ? 'block' : 'hidden'} sm:block h-full w-full sm:w-64 shrink-0`} aria-label="Sidebar navigation">
      <div className="sticky top-0 rounded-2xl border border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur p-3 sm:p-4 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sales Analytics</h2>
        </div>
        <nav className="space-y-1">
          {nav.map(({ label, icon: Icon }) => {
            const selected = active === label;
            return (
              <button
                key={label}
                onClick={() => onSelect?.(label)}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  selected
                    ? 'bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-zinc-900 dark:text-zinc-100 underline decoration-2 decoration-teal-500'
                    : 'text-zinc-600 dark:text-zinc-300'
                }`}
                aria-current={selected ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
