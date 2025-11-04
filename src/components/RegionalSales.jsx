import { BarChart } from './Charts';

export default function RegionalSales() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

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

  const table = [
    { region: 'North', sales: '₹2.4 Cr', growth: '+12%', product: 'Apparel', person: 'Ananya Sharma' },
    { region: 'South', sales: '₹3.1 Cr', growth: '+18%', product: 'Electronics', person: 'Rahul Mehta' },
    { region: 'East', sales: '₹1.9 Cr', growth: '+9%', product: 'Household', person: 'Arjun Patel' },
    { region: 'West', sales: '₹2.7 Cr', growth: '+16%', product: 'FMCG', person: 'Neha Rao' }
  ];

  return (
    <section className="space-y-4">
      <BarChart title="Zone-wise Performance (This Quarter)" labels={zoneLabels} datasets={barDatasets} dark={dark} ariaLabel="Zone-wise revenue bar chart" />

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4 overflow-x-auto">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-3">Regional Performance Table</h3>
        <table className="min-w-full text-sm">
          <thead className="text-left text-zinc-500">
            <tr>
              <th className="py-2 pr-4">Region</th>
              <th className="py-2 pr-4">Total Sales</th>
              <th className="py-2 pr-4">Growth %</th>
              <th className="py-2 pr-4">Top Product</th>
              <th className="py-2 pr-0">Top Salesperson</th>
            </tr>
          </thead>
          <tbody className="text-zinc-800 dark:text-zinc-200">
            {table.map((row) => (
              <tr key={row.region} className="border-t border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                <td className="py-2 pr-4">{row.region}</td>
                <td className="py-2 pr-4">{row.sales}</td>
                <td className="py-2 pr-4">{row.growth}</td>
                <td className="py-2 pr-4">{row.product}</td>
                <td className="py-2 pr-0">{row.person}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          The South Zone outperformed all others this quarter. Focus on expanding East region distribution could increase total sales by ~10% next quarter.
        </p>
      </div>
    </section>
  );
}
