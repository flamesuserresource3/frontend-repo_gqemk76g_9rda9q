import { LineChart, BarChart, DonutChart } from './Charts';

function Stat({ label, value, delta, positive = true }) {
  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-4">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
        <div className={`text-xs ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{delta}</div>
      </div>
    </div>
  );
}

export default function Overview() {
  // Sample data for Jan–Oct 2025
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const sales = [8.2, 8.9, 9.4, 9.9, 10.6, 10.9, 11.7, 12.1, 12.5, 12.8]; // in Cr
  const orders = [3.1, 3.8, 3.9, 4.2, 4.4, 4.7, 4.9, 5.1, 5.3, 5.5]; // x10k

  const zones = ['North', 'South', 'East', 'West'];
  const zoneRevenue = [2.4, 3.1, 1.9, 2.7];

  const categories = [
    { label: 'Electronics', value: 40, color: '#22c55e' },
    { label: 'Fashion', value: 22, color: '#10b981' },
    { label: 'FMCG', value: 28, color: '#06b6d4' },
    { label: 'Household', value: 10, color: '#0ea5e9' },
  ];

  return (
    <section className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Revenue" value="₹12.8 Cr" delta="(+18%)" positive />
        <Stat label="Total Orders" value="42,600" delta="(+12%)" positive />
        <Stat label="New Customers" value="3,240" delta="(+9%)" positive />
        <Stat label="Conversion Rate" value="7.4%" delta="(+1.1%)" positive />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LineChart title="Monthly Sales Growth (Jan–Oct 2025)" data={sales} labels={months} color="#22c55e" />
        </div>
        <div>
          <BarChart title="Regional Revenue Comparison" data={zoneRevenue} categories={zones} color="#0ea5e9" />
        </div>
        <div className="lg:col-span-1">
          <DonutChart title="Category Contribution" segments={categories} />
        </div>
        <div className="lg:col-span-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-4">
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Sales revenue increased by 18% compared to last quarter. The South Zone contributed 40% of total revenue, led by strong performance in Electronics and FMCG categories.
          </p>
        </div>
      </div>
    </section>
  );
}
