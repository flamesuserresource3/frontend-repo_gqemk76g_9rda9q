import React, { useMemo } from 'react';

function buildPath(data, width, height, padding = 8) {
  if (!data.length) return '';
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const xScale = (x) => {
    if (maxX === minX) return padding;
    return padding + ((x - minX) / (maxX - minX)) * (width - padding * 2);
  };
  const yScale = (y) => {
    if (maxY === minY) return height - padding;
    // Invert y for SVG
    return height - padding - ((y - minY) / (maxY - minY)) * (height - padding * 2);
  };

  let d = `M ${xScale(data[0].x)} ${yScale(data[0].y)}`;
  for (let i = 1; i < data.length; i++) {
    const x = xScale(data[i].x);
    const y = yScale(data[i].y);
    d += ` L ${x} ${y}`;
  }
  return d;
}

export default function SalesOverview({ series, title = 'Sales (last 60 min)' }) {
  const width = 900;
  const height = 220;
  const path = useMemo(() => buildPath(series, width, height), [series]);

  const last = series[series.length - 1]?.y ?? 0;
  const first = series[0]?.y ?? 0;
  const change = first ? ((last - first) / first) * 100 : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-white font-medium">{title}</div>
          <div className={`text-xs ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{change >= 0 ? '+' : ''}{change.toFixed(1)}% vs start</div>
        </div>
        <div className="text-xs text-white/60">Live</div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-white/5 to-white/0">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
