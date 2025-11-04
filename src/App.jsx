import { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import RegionalSales from './components/RegionalSales';
import ProductPerformance from './components/ProductPerformance';
import CustomerInsights from './components/CustomerInsights';
import RevenueTrends from './components/RevenueTrends';
import SalesTargets from './components/SalesTargets';
import ReportsForecasts from './components/ReportsForecasts';

export default function App() {
  const [active, setActive] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('sidebar') !== 'closed';
  });

  useEffect(() => {
    localStorage.setItem('sidebar', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  const render = () => {
    switch (active) {
      case 'Overview':
        return <Overview />;
      case 'Regional Sales':
        return <RegionalSales />;
      case 'Product Performance':
        return <ProductPerformance />;
      case 'Customer Insights':
        return <CustomerInsights />;
      case 'Revenue Trends':
        return <RevenueTrends />;
      case 'Sales Targets':
        return <SalesTargets />;
      case 'Reports & Forecasts':
        return <ReportsForecasts />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-[#0a0f1f] dark:via-[#0b1227] dark:to-[#0d1430] text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-4 space-y-4">
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <div className="flex gap-4">
          <Sidebar active={active} onSelect={(label) => { setActive(label); window.scrollTo({ top: 0, behavior: 'smooth' }); setSidebarOpen(false); }} open={sidebarOpen} />
          <main className="flex-1 space-y-4" role="main" aria-live="polite">
            {render()}
          </main>
        </div>
      </div>
    </div>
  );
}
