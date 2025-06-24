import React, { useMemo } from 'react';
import MetricCard from './MetricCard';
import MetricChart from './MetricChart';
import DataTable from './DataTable';
import './Dashboard.css';

// PUBLIC_INTERFACE
function Dashboard({ metrics }) {
  // Extract summary for top metric cards (current period)
  const summary = useMemo(() => {
    if (!metrics.length) return null;
    // Most recent date in filtered
    const latestDate = metrics.reduce((max, m) => (m.date > max ? m.date : max), metrics[0].date);
    const latest = metrics.filter(m => m.date === latestDate);

    // Reduce to sums/averages
    const sum = (arr, key) => arr.reduce((acc, m) => acc + (m.metrics[key] ?? 0), 0);
    const avg = (arr, key) => (arr.length ? sum(arr, key) / arr.length : 0);

    return {
      requests: sum(latest, 'requests'),
      cost: Math.round(sum(latest, 'cost') * 100) / 100,
      errorRate: Math.round(avg(latest, 'errorRate') * 1000) / 10,
      latency: Math.round(avg(latest, 'latency')),
      date: latestDate,
      apps: latest.map(m => m.application).join(', ')
    };
  }, [metrics]);

  // Historical for chart and table
  const historical = useMemo(() => {
    // {labels: [date1, date2,...], series: [{ label, data: [...] }]}
    const byDate = {};
    metrics.forEach(m => {
      if (!byDate[m.date]) byDate[m.date] = [];
      byDate[m.date].push(m.metrics);
    });
    const labels = Object.keys(byDate).sort();
    // If multiple apps per date (e.g. in ALL view), sum requests/cost
    function aggForDate(date, key) {
      const arr = byDate[date] || [];
      if (key === 'errorRate' || key === 'latency')
        return Math.round(arr.reduce((a,b) => a + b[key], 0) * 10 / arr.length) / 10;
      return Math.round(arr.reduce((a,b) => a + b[key], 0));
    }
    return {
      labels,
      requests: labels.map(d => aggForDate(d, 'requests')),
      cost: labels.map(d => aggForDate(d, 'cost')),
      errorRate: labels.map(d => aggForDate(d, 'errorRate')),
      latency: labels.map(d => aggForDate(d, 'latency')),
    };
  }, [metrics]);

  return (
    <div className="dashboard">
      <div className="cards-row">
        <MetricCard
          title="Total Requests"
          value={summary ? summary.requests : '--'}
          subtitle={summary ? summary.apps : ''}
          icon="▲"
          color="var(--primary)"
        />
        <MetricCard
          title="Cost"
          value={summary ? `$${summary.cost}` : '--'}
          subtitle={summary ? `on ${summary.date}` : ''}
          icon="💰"
          color="var(--secondary)"
        />
        <MetricCard
          title="Error Rate"
          value={summary ? `${summary.errorRate}%` : '--'}
          subtitle=""
          icon="⚠️"
          color="#e03419"
        />
        <MetricCard
          title="Avg Latency"
          value={summary ? `${summary.latency}ms` : '--'}
          subtitle=""
          icon="⏱️"
          color="#41a8e8"
        />
      </div>
      <div className="charts-row">
        <MetricChart
          title="Requests Over Time"
          labels={historical.labels}
          data={historical.requests}
          strokeColor="var(--primary)"
          fillColor="rgba(255,149,0,0.08)"
        />
        <MetricChart
          title="Cost Over Time"
          labels={historical.labels}
          data={historical.cost}
          strokeColor="var(--secondary)"
          fillColor="rgba(0,17,255,0.04)"
        />
      </div>
      <div className="charts-row">
        <MetricChart
          title="Error Rate (%)"
          labels={historical.labels}
          data={historical.errorRate}
          yMax={15}
          minTicks={3}
          strokeColor="#e03419"
          fillColor="rgba(224,52,25,0.09)"
        />
        <MetricChart
          title="Avg Latency (ms)"
          labels={historical.labels}
          data={historical.latency}
          strokeColor="#41a8e8"
          fillColor="rgba(65,168,232,0.065)"
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <DataTable data={metrics} />
      </div>
    </div>
  );
}
export default Dashboard;
