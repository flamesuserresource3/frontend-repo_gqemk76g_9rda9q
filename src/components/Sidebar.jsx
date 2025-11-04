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

export default function Sidebar({ active = 'Overview', onSelect }) {
  return (
    <aside className="h-full w-full sm:w-64 shrink-0">
      <div className="sticky top-0 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-3 sm:p-4">
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
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 ${
                  selected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-600 dark:text-zinc-300'
                }`}
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
