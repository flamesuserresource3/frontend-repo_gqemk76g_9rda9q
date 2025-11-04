export default function SalesTargets() {
  const rows = [
    { team: 'North', target: 2.5, achieved: 2.1 },
    { team: 'South', target: 3.0, achieved: 3.2 },
    { team: 'East', target: 1.8, achieved: 1.5 },
    { team: 'West', target: 2.2, achieved: 2.4 }
  ];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-800/60 p-4 overflow-x-auto">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-3">Team Targets</h3>
        <table className="min-w-full text-sm">
          <thead className="text-left text-zinc-500">
            <tr>
              <th className="py-2 pr-4">Team</th>
              <th className="py-2 pr-4">Target (₹ Cr)</th>
              <th className="py-2 pr-4">Achieved (₹ Cr)</th>
              <th className="py-2 pr-0">Achievement %</th>
            </tr>
          </thead>
          <tbody className="text-zinc-800 dark:text-zinc-200">
            {rows.map((r) => {
              const pct = Math.round((r.achieved / r.target) * 100);
              const good = pct >= 100 || pct >= 80;
              return (
                <tr key={r.team} className="border-t border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="py-2 pr-4">{r.team}</td>
                  <td className="py-2 pr-4">{r.target.toFixed(1)}</td>
                  <td className="py-2 pr-4">{r.achieved.toFixed(1)}</td>
                  <td className="py-2 pr-0">
                    <div className="w-48 sm:w-64 md:w-72">
                      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div className={`h-2 rounded-full ${good ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">{pct}%</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
