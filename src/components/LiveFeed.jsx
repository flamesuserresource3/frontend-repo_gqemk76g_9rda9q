import React from 'react';
import { Clock } from 'lucide-react';

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function LiveFeed({ events }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-white font-medium">Live Orders</div>
        <div className="text-xs text-white/60 flex items-center gap-1"><Clock size={14} /> Streaming</div>
      </div>
      <div className="space-y-3 max-h-72 overflow-auto pr-1">
        {events.map((e) => (
          <div key={e.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div>
              <div className="text-sm text-white">Order #{e.orderId} • {e.customer}</div>
              <div className="text-xs text-white/60">{e.items} item{e.items > 1 ? 's' : ''} • {e.channel}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-emerald-400">${e.amount.toLocaleString()}</div>
              <div className="text-xs text-white/50">{timeAgo(e.time)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
