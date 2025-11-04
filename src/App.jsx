import React, { useEffect, useMemo, useState } from 'react';
import KPIs from './components/KPIs.jsx';
import SalesOverview from './components/SalesOverview.jsx';
import TopProducts from './components/TopProducts.jsx';
import LiveFeed from './components/LiveFeed.jsx';

function currency(n) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function seedProducts() {
  return [
    { id: 'p1', name: 'Aurora Lamp', revenue: 48200 },
    { id: 'p2', name: 'Nimbus Headphones', revenue: 42100 },
    { id: 'p3', name: 'Pulse Smartwatch', revenue: 36500 },
    { id: 'p4', name: 'Volt Charger', revenue: 29600 },
    { id: 'p5', name: 'Echo Speaker', revenue: 25400 },
  ];
}

function randomOrder(products) {
  const p = products[Math.floor(Math.random() * products.length)];
  const amount = Math.round(50 + Math.random() * 450);
  const items = 1 + Math.floor(Math.random() * 3);
  const channels = ['Web', 'iOS', 'Android', 'POS'];
  const customers = ['Jordan', 'Riley', 'Taylor', 'Avery', 'Casey', 'Kai', 'Quinn'];
  return {
    id: crypto.randomUUID(),
    orderId: Math.floor(100000 + Math.random() * 900000),
    customer: customers[Math.floor(Math.random() * customers.length)],
    items,
    channel: channels[Math.floor(Math.random() * channels.length)],
    amount: amount * items,
    productId: p.id,
    time: new Date(),
  };
}

export default function App() {
  const [series, setSeries] = useState(() => {
    const now = Date.now();
    const base = 400 + Math.random() * 200;
    return Array.from({ length: 60 }, (_, i) => ({ x: now - (59 - i) * 60000, y: base + Math.sin(i / 5) * 40 + Math.random() * 25 }));
  });
  const [products, setProducts] = useState(seedProducts);
  const [events, setEvents] = useState([]);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    aov: 0,
    conversion: 2.34,
    revenueChange: 0,
    ordersChange: 0,
    aovChange: 0,
    conversionChange: 0,
  });

  useEffect(() => {
    // initialize totals based on products
    const initialRevenue = products.reduce((s, p) => s + p.revenue, 0);
    setMetrics((m) => ({
      ...m,
      revenue: initialRevenue,
      orders: 1200 + Math.floor(Math.random() * 400),
      aov: initialRevenue / (1000 + Math.random() * 500),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // push a new datapoint
      setSeries((prev) => {
        const nextY = Math.max(50, prev[prev.length - 1].y + (Math.random() - 0.4) * 30);
        const next = [...prev.slice(1), { x: Date.now(), y: nextY }];
        return next;
      });

      // simulate orders coming in (0-3 per tick)
      const orderCount = Math.random() < 0.75 ? 1 + Math.floor(Math.random() * 2) : 0;
      const newOrders = [];
      for (let i = 0; i < orderCount; i++) {
        newOrders.push(randomOrder(products));
      }

      if (newOrders.length) {
        setEvents((prev) => {
          const merged = [...newOrders, ...prev].slice(0, 20);
          return merged;
        });

        // update product revenue
        setProducts((prev) => {
          const copy = prev.map((p) => ({ ...p }));
          for (const o of newOrders) {
            const idx = copy.findIndex((p) => p.id === o.productId);
            if (idx >= 0) copy[idx].revenue += o.amount;
          }
          // sort by revenue desc
          copy.sort((a, b) => b.revenue - a.revenue);
          return copy;
        });

        // update metrics
        setMetrics((m) => {
          const addedRevenue = newOrders.reduce((s, o) => s + o.amount, 0);
          const newRevenue = m.revenue + addedRevenue;
          const newOrdersCount = m.orders + newOrders.length;
          const newAov = newRevenue / Math.max(1, newOrdersCount);

          return {
            revenue: newRevenue,
            orders: newOrdersCount,
            aov: newAov,
            conversion: Math.max(1.2, Math.min(6, m.conversion + (Math.random() - 0.5) * 0.1)),
            revenueChange: ((addedRevenue) / Math.max(1, m.revenue)) * 100,
            ordersChange: (newOrders.length / Math.max(1, m.orders)) * 100,
            aovChange: ((newAov - m.aov) / Math.max(1, m.aov)) * 100,
            conversionChange: (Math.random() - 0.5) * 2,
            revenueFormatted: currency(newRevenue),
            aovFormatted: currency(newAov),
          };
        });
      } else {
        // drift small changes when no new orders
        setMetrics((m) => ({
          ...m,
          conversion: Math.max(1.2, Math.min(6, m.conversion + (Math.random() - 0.5) * 0.05)),
          revenueFormatted: currency(m.revenue),
          aovFormatted: currency(m.aov),
          revenueChange: (Math.random() - 0.5) * 0.1,
          ordersChange: (Math.random() - 0.5) * 0.1,
          aovChange: (Math.random() - 0.5) * 0.1,
          conversionChange: (Math.random() - 0.5) * 0.2,
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [products]);

  const metricsWithFormat = useMemo(() => ({
    ...metrics,
    revenueFormatted: currency(metrics.revenue),
    aovFormatted: currency(metrics.aov),
  }), [metrics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Realtime Sales Dashboard</h1>
            <p className="text-white/60 text-sm">Live KPIs, revenue trends, and order feed updating every few seconds.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-sm text-white/70">Connected</span>
          </div>
        </div>

        <div className="space-y-6">
          <KPIs metrics={metricsWithFormat} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SalesOverview series={series} />
            </div>
            <TopProducts products={products} />
          </div>

          <LiveFeed events={events} />
        </div>
      </div>
    </div>
  );
}
