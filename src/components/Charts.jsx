import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

export function LineChart({ title, labels, datasets, dark = false, ariaLabel }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: true, labels: { color: dark ? '#e5e7eb' : '#111827' } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: dark ? '#d1d5db' : '#374151' }, grid: { color: dark ? '#262626' : '#e5e7eb' } },
      y: { ticks: { color: dark ? '#d1d5db' : '#374151' }, grid: { color: dark ? '#262626' : '#e5e7eb' } }
    }
  };

  const data = { labels, datasets };

  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4" aria-label={ariaLabel}>
      {title && <h3 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>}
      <div className="h-64">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export function BarChart({ title, labels, datasets, dark = false, ariaLabel }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: dark ? '#e5e7eb' : '#111827' } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: dark ? '#d1d5db' : '#374151' }, grid: { color: dark ? '#262626' : '#e5e7eb' } },
      y: { ticks: { color: dark ? '#d1d5db' : '#374151' }, grid: { color: dark ? '#262626' : '#e5e7eb' } }
    }
  };

  const data = { labels, datasets };

  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4" aria-label={ariaLabel}>
      {title && <h3 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>}
      <div className="h-64">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export function DonutChart({ title, labels, values, colors, ariaLabel }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }
    },
    cutout: '60%'
  };

  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4" aria-label={ariaLabel}>
      {title && <h3 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>}
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
