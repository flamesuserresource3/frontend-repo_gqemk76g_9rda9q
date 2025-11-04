import { LineChart, BarChart } from './Charts';

export default function RevenueTrends() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const revenue = [1.0,1.1,1.15,1.22,1.28,1.32,1.38,1.42,1.47,1.5,1.52,1.55];
  const expenses = [0.6,0.62,0.64,0.67,0.7,0.72,0.76,0.78,0.81,0.83,0.85,0.87];

  const areaDatasets = [
    { label: 'Revenue (Cr)', data: revenue, borderColor: '#14b8a6', backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0,0,0,240); g.addColorStop(0,'rgba(20,184,166,0.35)'); g.addColorStop(1,'rgba(0,0,0,0)'); return g; }, fill: true, tension: 0.35 },
    { label: 'Expenses (Cr)', data: expenses, borderColor: '#ef4444', backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0,0,0,240); g.addColorStop(0,'rgba(239,68,68,0.25)'); g.addColorStop(1,'rgba(0,0,0,0)'); return g; }, fill: true, tension: 0.35 }
  ];

  const barDatasets = [
    { label: 'Monthly Revenue (Cr)', data: revenue, backgroundColor: dark ? '#9333ea' : '#3b82f6', borderRadius: 8 }
  ];

  const forecast = [1.6,1.7,1.8];
  const forecastDatasets = [
    { label: 'Actual (Cr)', data: revenue.slice(-3), borderColor: '#14b8a6', backgroundColor: 'transparent', tension: 0.35 },
    { label: 'Forecast (Cr)', data: forecast, borderColor: '#f59e0b', backgroundColor: 'transparent', borderDash: [6,6], tension: 0.35 }
  ];

  return (
    <section className="space-y-4">
      <LineChart title="Revenue vs Expenses" labels={months} datasets={areaDatasets} dark={dark} ariaLabel="Revenue vs Expenses area chart" />
      <BarChart title="Monthly Revenue (Last 12 Months)" labels={months} datasets={barDatasets} dark={dark} ariaLabel="Monthly revenue column chart" />
      <LineChart title="Forecast for Next Quarter" labels={['Oct','Nov','Dec']} datasets={forecastDatasets} dark={dark} ariaLabel="Forecast line chart" />
      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Projected revenue for Q4 2025: ₹4.5 Cr, with steady growth in Electronics and FMCG.
        </p>
      </div>
    </section>
  );
}
