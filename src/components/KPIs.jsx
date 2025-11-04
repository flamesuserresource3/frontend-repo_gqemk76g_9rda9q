import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function StatCard({ label, value, change }) {
  const positive = change >= 0;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-sm">
      <div className="text-sm text-white/70">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
          positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
        }`}>
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

export default function KPIs({ metrics }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Revenue" value={metrics.revenueFormatted} change={metrics.revenueChange} />
      <StatCard label="Orders" value={metrics.orders.toLocaleString()} change={metrics.ordersChange} />
      <StatCard label="Avg. Order Value" value={metrics.aovFormatted} change={metrics.aovChange} />
      <StatCard label="Conversion Rate" value={`${metrics.conversion.toFixed(2)}%`} change={metrics.conversionChange} />
    </div>
  );
}
