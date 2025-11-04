import { LineChart, BarChart } from './Charts';

export default function ReportsForecasts() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
  const actual = [1.0,1.05,1.12,1.18,1.24,1.28,1.34,1.38,1.43,1.5];
  const predicted = [0.98,1.06,1.1,1.2,1.22,1.3,1.33,1.4,1.45,1.48];

  const lineDatasets = [
    { label: 'Actual (Cr)', data: actual, borderColor: '#14b8a6', backgroundColor: 'transparent', tension: 0.35 },
    { label: 'Predicted (Cr)', data: predicted, borderColor: '#f59e0b', backgroundColor: 'transparent', borderDash: [6,6], tension: 0.35 }
  ];

  // Simple heatmap using bar chart representation
  const heatLabels = months;
  const heatValues = [85,90,88,92,89,91,93,94,95,95];
  const heatDatasets = [{ label: 'Target Achievement %', data: heatValues, backgroundColor: heatValues.map(v => `rgba(34,197,94,${(v-70)/40})`), borderRadius: 4 }];

  return (
    <section className="space-y-4">
      <LineChart title="Predicted vs Actual Sales" labels={months} datasets={lineDatasets} dark={dark} ariaLabel="Predicted vs Actual line chart" />

      <BarChart title="Monthly Target Achievement Heatmap" labels={heatLabels} datasets={heatDatasets} dark={dark} ariaLabel="Monthly target achievement heatmap" />

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Forecast accuracy improved by 6% this quarter. The AI-based predictive model anticipates a 10–12% increase in December sales.
        </p>
      </div>
    </section>
  );
}
