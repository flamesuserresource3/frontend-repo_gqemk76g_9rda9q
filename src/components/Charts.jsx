import { useMemo } from 'react';

export function LineChart({ title, data, labels, color = '#22c55e' }) {
  const path = useMemo(() => {
    if (!data || data.length === 0) return '';
    const w = 560;
    const h = 160;
    const max = Math.max(...data) || 1;
    const min = Math.min(...data) || 0;
    const range = Math.max(max - min, 1);
    const dx = w / Math.max(data.length - 1, 1);
    const points = data.map((v, i) => {
      const x = i * dx;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    });
    return `M ${points[0]} L ${points.slice(1).join(' ')}`;
  }, [data]);

  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>
        {labels && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{labels.join(' · ')}</div>
        )}
      </div>
      <svg viewBox="0 0 560 200" className="w-full h-48">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
}

export function BarChart({ title, data, categories, color = '#0ea5e9' }) {
  const max = Math.max(...data, 1);
  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex h-28 items-end">
              <div
                className="w-8 rounded-t-md"
                style={{ height: `${(v / max) * 100}%`, background: color }}
              />
            </div>
            <div className="mt-2 text-xs text-center text-zinc-600 dark:text-zinc-300">
              {categories[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({ title, segments }) {
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  let offset = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>
      <div className="flex items-center gap-6">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <g transform="rotate(-90 80 80)">
            {segments.map((s, i) => {
              const frac = s.value / total;
              const dash = frac * circumference;
              const dashArray = `${dash} ${circumference - dash}`;
              const circle = (
                <circle
                  key={i}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={s.color}
                  strokeWidth="20"
                  strokeDasharray={dashArray}
                  strokeDashoffset={offset}
                />
              );
              offset -= dash;
              return circle;
            })}
          </g>
        </svg>
        <div className="space-y-2">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
              <span className="font-medium text-zinc-800 dark:text-zinc-100">{s.label}</span>
              <span className="text-zinc-500 dark:text-zinc-400">{Math.round((s.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
