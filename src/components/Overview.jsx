import { DonutChart, LineChart, BarChart } from './Charts';
import { motion } from 'framer-motion';

function Stat({ label, value, delta, positive = true, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] p-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
      aria-label={`Show details for ${label}`}
    >
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
        <div className={`text-xs ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{delta}</div>
      </div>
    </motion.button>
  );
}

export default function Overview() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
  const sales = [1.0,1.1,1.15,1.22,1.28,1.32,1.38,1.42,1.47,1.5];

  const lineDatasets = [
    {
      label: 'All Regions',
      data: sales,
      borderColor: dark ? '#14b8a6' : '#3b82f6',
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 240);
        gradient.addColorStop(0, (dark ? 'rgba(20,184,166,0.35)' : 'rgba(59,130,246,0.35)'));
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        return gradient;
      },
      fill: true,
      tension: 0.35,
      pointRadius: 2
    }
  ];

  const zoneLabels = ['North','South','East','West'];
  const zoneRevenue = [2.4,3.1,1.9,2.7];
  const barDatasets = [
    {
      label: 'Revenue (Cr)',
      data: zoneRevenue,
      backgroundColor: dark ? '#9333ea' : '#3b82f6',
      borderRadius: 8
    }
  ];

  const categoryLabels = ['Electronics','Fashion','FMCG','Household'];
  const categoryValues = [40,25,20,15];
  const categoryColors = ['#22c55e','#ef4444','#eab308','#14b8a6'];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Revenue" value="₹12.8 Cr" delta="(+18%)" positive onClick={() => alert('Showing detailed stats for Total Revenue.')} />
        <Stat label="Total Orders" value="42,600" delta="(+12%)" positive onClick={() => alert('Showing detailed stats for Total Orders.')} />
        <Stat label="New Customers" value="3,240" delta="(+9%)" positive onClick={() => alert('Showing detailed stats for New Customers.')} />
        <Stat label="Conversion Rate" value="7.4%" delta="(+1.1%)" positive onClick={() => alert('Showing detailed stats for Conversion Rate.')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LineChart title="Monthly Sales Growth (Jan–Oct 2025)" labels={months} datasets={lineDatasets} dark={dark} ariaLabel="Monthly Sales Growth line chart" />
        </div>
        <div>
          <BarChart title="Regional Revenue Comparison" labels={zoneLabels} datasets={barDatasets} dark={dark} ariaLabel="Regional Revenue bar chart" />
        </div>
        <div className="lg:col-span-1">
          <DonutChart title="Product Category Contribution" labels={categoryLabels} values={categoryValues} colors={categoryColors} ariaLabel="Category contribution donut chart" />
        </div>
        <motion.div layout className="lg:col-span-2 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Sales revenue increased by 18% compared to last quarter. The South Zone contributed 40% of total revenue, led by strong performance in Electronics and FMCG categories.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
