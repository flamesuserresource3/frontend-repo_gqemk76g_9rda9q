import { DonutChart, BarChart, LineChart } from './Charts';

export default function CustomerInsights() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const donutLabels = ['New','Returning'];
  const donutValues = [43,57];
  const donutColors = ['#22c55e','#3b82f6'];

  const ageLabels = ['18–24','25–34','35–44','45+'];
  const ageDataset = [{ label: 'Share %', data: [35,40,15,10], backgroundColor: dark ? '#9333ea' : '#3b82f6', borderRadius: 8 }];

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
  const retention = [65,68,69,70,71,72,73,74,74,75];
  const lineDatasets = [
    { label: 'Retention %', data: retention, borderColor: dark ? '#14b8a6' : '#3b82f6', backgroundColor: 'transparent', tension: 0.35 }
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DonutChart title="Customer Type" labels={donutLabels} values={donutValues} colors={donutColors} ariaLabel="Customer type donut chart" />
        <BarChart title="Age Group Distribution" labels={ageLabels} datasets={ageDataset} dark={dark} ariaLabel="Age distribution bar chart" />
        <LineChart title="Retention Rate by Month" labels={months} datasets={lineDatasets} dark={dark} ariaLabel="Retention rate line chart" />
      </div>

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Returning customers account for 57% of total sales. Loyalty program participation increased retention by 12%.
        </p>
      </div>
    </section>
  );
}
