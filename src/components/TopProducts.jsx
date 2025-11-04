import React from 'react';

export default function TopProducts({ products }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-white font-medium">Top Products</div>
        <div className="text-xs text-white/60">Realtime</div>
      </div>
      <div className="divide-y divide-white/10">
        {products.map((p) => {
          const pct = Math.min(100, Math.round((p.revenue / (products[0]?.revenue || 1)) * 100));
          return (
            <div key={p.id} className="py-3 flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 text-white/80 font-semibold">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">{p.name}</div>
                  <div className="text-sm text-white/80">${p.revenue.toLocaleString()}</div>
                </div>
                <div className="mt-2 h-2 w-full rounded bg-white/10">
                  <div className="h-2 rounded bg-emerald-400/70" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
