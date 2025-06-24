import React from 'react';
import MetricCard from './MetricCard';
import DataTable from './DataTable';
import './Dashboard.css';

// PUBLIC_INTERFACE
/**
 * Dashboard for Kavia Metrics using the exact required data structure.
 * Displays each metric field as a summary card or visualization where appropriate.
 */
function Dashboard({ metrics }) {
  if (!metrics.length) {
    return (
      <div className="dashboard">
        <div>No metric data available</div>
      </div>
    );
  }

  // Since only one, just use first object
  const m = metrics[0];

  return (
    <div className="dashboard">
      <div className="cards-row">
        <MetricCard
          title="Application Name"
          value={m.app_name}
          subtitle=""
          icon="🖥️"
          color="var(--primary)"
        />
        <MetricCard
          title="Total Elapsed Time"
          value={`${m.elapsed_time.toFixed(2)} s`}
          subtitle="Total time for run"
          icon="⏱️"
          color="var(--secondary)"
        />
        <MetricCard
          title="Total Cost"
          value={`$${m.total_cost.toFixed(2)}`}
          subtitle="Cost for this execution"
          icon="💰"
          color="#41a8e8"
        />
        <MetricCard
          title="Date"
          value={m.date}
          subtitle=""
          icon="📅"
          color="#E87A41"
        />
      </div>
      <div className="cards-row">
        <MetricCard
          title="CGA Version"
          value={m.cga_version}
          subtitle=""
          icon="🔢"
          color="#82D400"
        />
        <MetricCard
          title="Model"
          value={m.model}
          subtitle=""
          icon="🤖"
          color="#00B2EE"
        />
        <MetricCard
          title="Streaming"
          value={m.streaming ? "Enabled" : "Disabled"}
          subtitle=""
          icon={m.streaming ? "📡" : "⛔"}
          color={m.streaming ? "#FF9500" : "#888"}
        />
        <MetricCard
          title="Project Link"
          value={
            <a href={/^https?:\/\//.test(m.project_link) ? m.project_link : `https://${m.project_link.replace(/^\/\//, '')}`} 
               target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary)", wordBreak: "break-all" }}>
              {m.project_link.replace(/^\/\//, '')}
            </a>
          }
          subtitle=""
          icon="🔗"
          color="#1A1A1A"
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <DataTable data={metrics} />
      </div>
    </div>
  );
}
export default Dashboard;
