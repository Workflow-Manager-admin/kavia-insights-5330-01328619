import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import SideNav from './components/SideNav';
import Dashboard from './components/Dashboard';

const DUMMY_METRICS = [
  {
    id: 1,
    application: 'AI Pipeline',
    date: '2024-06-01',
    metrics: { requests: 1400, errorRate: 0.06, cost: 28.7, latency: 410 },
  },
  {
    id: 2,
    application: 'AI Pipeline',
    date: '2024-06-02',
    metrics: { requests: 1550, errorRate: 0.05, cost: 30.1, latency: 415 },
  },
  {
    id: 3,
    application: 'Data Cleaner',
    date: '2024-06-01',
    metrics: { requests: 2100, errorRate: 0.03, cost: 17.2, latency: 260 },
  },
  {
    id: 4,
    application: 'Data Cleaner',
    date: '2024-06-02',
    metrics: { requests: 2010, errorRate: 0.025, cost: 16.7, latency: 240 },
  },
  {
    id: 5,
    application: 'Model Trainer',
    date: '2024-06-01',
    metrics: { requests: 620, errorRate: 0.09, cost: 110.5, latency: 720 },
  },
  {
    id: 6,
    application: 'Model Trainer',
    date: '2024-06-02',
    metrics: { requests: 670, errorRate: 0.08, cost: 111.7, latency: 715 },
  },
];

function getUniqueApplications(metrics) {
  const set = new Set();
  metrics.forEach((m) => set.add(m.application));
  return Array.from(set);
}

function getMetricDates(metrics) {
  const set = new Set();
  metrics.forEach((m) => set.add(m.date));
  return Array.from(set).sort();
}

function App() {
  // State for selected application and date range
  const [application, setApplication] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [metrics, setMetrics] = useState([]);
  const [live, setLive] = useState(true);

  // Simulate fetching data & periodic updates
  useEffect(() => {
    setMetrics(DUMMY_METRICS);

    if (!live) return;
    const interval = setInterval(() => {
      // For demo: simulate a small random change to today's metrics
      setMetrics((metrics) =>
        metrics.map((m) =>
          m.date === '2024-06-02'
            ? {
                ...m,
                metrics: {
                  ...m.metrics,
                  requests:
                    m.metrics.requests +
                    Math.round((Math.random() - 0.5) * 10),
                  cost:
                    Math.round(
                      (m.metrics.cost + (Math.random() - 0.5) * 0.5) * 100
                    ) / 100,
                },
              }
            : m
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [live]);

  // Filter applications
  const applications = useMemo(
    () => ['All', ...getUniqueApplications(DUMMY_METRICS)],
    []
  );

  // Apply filters
  const filteredMetrics = useMemo(() => {
    let data = metrics;
    if (application !== 'All')
      data = data.filter((m) => m.application === application);

    if (dateRange.start)
      data = data.filter((m) => m.date >= dateRange.start);
    if (dateRange.end) data = data.filter((m) => m.date <= dateRange.end);

    return data;
  }, [metrics, application, dateRange]);

  // For date shortcut buttons
  const allMetricDates = useMemo(() => getMetricDates(DUMMY_METRICS), []);

  return (
    <div className="app-root light-theme">
      <nav className="navbar">
        <span className="logo">
          <span className="logo-symbol" style={{ color: 'var(--primary)' }}>*</span>
          <span className="bold" style={{ color: 'var(--primary)' }}>KAVIA</span>
          <span>Metrics</span>
        </span>
        <span className="nav-actions">
          <button
            className={`btn btn-small ${live ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setLive((l) => !l)}
            tabIndex={0}
          >
            {live ? 'Live' : 'Pause'}
          </button>
        </span>
      </nav>
      <div className="main-content">
        <SideNav
          application={application}
          setApplication={setApplication}
          applications={applications}
          dateRange={dateRange}
          setDateRange={setDateRange}
          allMetricDates={allMetricDates}
        />
        <Dashboard metrics={filteredMetrics} />
      </div>
      <footer className="footer">
        <span>Kavia Metrics &copy; 2024</span>
      </footer>
    </div>
  );
}

export default App;
