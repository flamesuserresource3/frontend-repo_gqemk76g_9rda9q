import { BarChart, DonutChart, LineChart } from './Charts';

export default function ProductPerformance() {
  const dark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const products = [
    { name: 'Smartwatch X5', cat: 'Electronics', revenue: 0.96 },
    { name: 'EcoBottle 2.0', cat: 'FMCG', revenue: 0.74 },
    { name: 'Classic Denim', cat: 'Fashion', revenue: 0.63 }
  ];

  const topLabels = products.map(p => p.name);
  const topDataset = [{ label: 'Revenue (Cr)', data: products.map(p => p.revenue), backgroundColor: dark ? '#14b8a6' : '#3b82f6', borderRadius: 8 }];

  const catLabels = ['Electronics','Fashion','FMCG','Household'];
  const catValues = [40,25,20,15];
  const catColors = ['#22c55e','#ef4444','#eab308','#14b8a6'];

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const smartwatch = [5,6,6.5,7,7.8,8.2,8.8,9.3,9.6,9.8,10,10];
  const lineDatasets = [
    { label: 'Smartwatch X5', data: smartwatch, borderColor: dark ? '#9333ea' : '#3b82f6', backgroundColor: 'transparent', tension: 0.35 }
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BarChart title="Top Products by Revenue" labels={topLabels} datasets={topDataset} dark={dark} ariaLabel="Top products bar chart" />
        </div>
        <div>
          <DonutChart title="Category Contribution" labels={catLabels} values={catValues} colors={catColors} ariaLabel="Category contribution pie chart" />
        </div>
      </div>

      <LineChart title="Product Sales Trend (Smartwatch X5)" labels={months} datasets={lineDatasets} dark={dark} ariaLabel="Product sales trend line chart" />

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4 overflow-x-auto">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-3">Products Table</h3>
        <table className="min-w-full text-sm">
          <thead className="text-left text-zinc-500">
            <tr>
              <th className="py-2 pr-4">Product Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Units Sold</th>
              <th className="py-2 pr-4">Revenue</th>
              <th className="py-2 pr-0">Growth %</th>
            </tr>
          </thead>
          <tbody className="text-zinc-800 dark:text-zinc-200">
            <tr className="border-t border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
              <td className="py-2 pr-4">Smartwatch X5</td>
              <td className="py-2 pr-4">Electronics</td>
              <td className="py-2 pr-4">4,800</td>
              <td className="py-2 pr-4">₹96L</td>
              <td className="py-2 pr-0">+22%</td>
            </tr>
            <tr className="border-t border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
              <td className="py-2 pr-4">EcoBottle 2.0</td>
              <td className="py-2 pr-4">FMCG</td>
              <td className="py-2 pr-4">6,100</td>
              <td className="py-2 pr-4">₹74L</td>
              <td className="py-2 pr-0">+14%</td>
            </tr>
            <tr className="border-t border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
              <td className="py-2 pr-4">Classic Denim</td>
              <td className="py-2 pr-4">Fashion</td>
              <td className="py-2 pr-4">5,200</td>
              <td className="py-2 pr-4">₹63L</td>
              <td className="py-2 pr-0">+18%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Insights</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Smartwatch X5 and EcoBottle 2.0 remain top sellers. Introducing new SKUs in these categories may boost Q4 profits.
        </p>
      </div>
    </section>
  );
}
