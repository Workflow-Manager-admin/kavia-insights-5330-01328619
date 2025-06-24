import React from 'react';
import './App.css';
import SideNav from './components/SideNav';
import Dashboard from './components/Dashboard';

// PUBLIC_INTERFACE
/**
 * The core app shell for Kavia Metrics.
 * Maintains several mock records in the metrics array.
 */
function App() {
  // Multi-record mock data
  const metrics = [
    {
      app_name: "CRM Dashboard",
      elapsed_time: 1108.27,
      total_cost: 2.06,
      date: "2025-06-20 15:11:12",
      project_link: "https://crm.acme.com",
      cga_version: "0.0.316",
      model: "gpt-4.1",
      streaming: false
    },
    {
      app_name: "Support Bot",
      elapsed_time: 897.13,
      total_cost: 1.44,
      date: "2025-06-21 09:25:37",
      project_link: "https://support.acme.com",
      cga_version: "0.0.315",
      model: "gpt-4.0",
      streaming: true
    },
    {
      app_name: "InvoiceApp",
      elapsed_time: 2340.00,
      total_cost: 4.79,
      date: "2025-06-22 13:02:01",
      project_link: "invoice.acme.com",
      cga_version: "0.0.316",
      model: "gpt-4.1",
      streaming: false
    },
    {
      app_name: "MarketingPortal",
      elapsed_time: 221.55,
      total_cost: 0.74,
      date: "2025-06-23 08:19:11",
      project_link: "//marketing.acme.com",
      cga_version: "0.0.314",
      model: "gpt-3.5",
      streaming: false
    },
    {
      app_name: "KaviaMetrics",
      elapsed_time: 1280.63,
      total_cost: 2.23,
      date: "2025-06-24 16:50:29",
      project_link: "https://metrics.kavia.ai",
      cga_version: "0.0.320",
      model: "gpt-4.2",
      streaming: true
    },
    {
      app_name: "AnalyticsViewer",
      elapsed_time: 412.05,
      total_cost: 1.05,
      date: "2025-06-25 10:01:00",
      project_link: "//analytics.kavia.ai",
      cga_version: "0.0.317",
      model: "gpt-4.1",
      streaming: false
    }
  ];

  // For SideNav
  const applications = [...new Set(metrics.map(m => m.app_name))];

  return (
    <div className="app-root light-theme">
      <nav className="navbar">
        <span className="logo">
          <span className="logo-symbol" style={{ color: 'var(--primary)' }}>*</span>
          <span className="bold" style={{ color: 'var(--primary)' }}>KAVIA</span>
          <span>Metrics</span>
        </span>
      </nav>
      <div className="main-content">
        <SideNav
          application={metrics[metrics.length - 1].app_name}
          setApplication={() => {}}
          applications={applications}
          dateRange={{ start: "", end: "" }}
          setDateRange={() => {}}
          allMetricDates={metrics.map(m => m.date.split(" ")[0])}
          disabled={true}
        />
        <Dashboard metrics={metrics} />
      </div>
      <footer className="footer">
        <span>Kavia Metrics &copy; 2024</span>
      </footer>
    </div>
  );
}

export default App;
