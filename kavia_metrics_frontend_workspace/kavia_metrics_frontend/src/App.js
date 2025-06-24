import React from 'react';
import './App.css';
import SideNav from './components/SideNav';
import Dashboard from './components/Dashboard';

// PUBLIC_INTERFACE
/**
 * The core app shell for Kavia Metrics.
 * Consumes the standardized metrics structure and passes it to the dashboard.
 */
function App() {
  // Specified sample data structure
  const metric = {
    app_name: "CRMDashboardApp",
    elapsed_time: 1108.2730150222778,
    total_cost: 2.0609832999999997,
    date: "2025-06-20 15:11:12",
    project_link: "//https: www.example.com",
    cga_version: "0.0.316",
    model: "gpt-4.1",
    streaming: false
  };

  // Allow extension for historical data (for now use singleton array)
  const metrics = [metric];

  // SideNav fields - disable filters, as not applicable for single object
  const applications = [metric.app_name];

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
          application={metric.app_name}
          setApplication={() => {}}
          applications={applications}
          dateRange={{ start: "", end: "" }}
          setDateRange={() => {}}
          allMetricDates={[metric.date.split(" ")[0]]}
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
