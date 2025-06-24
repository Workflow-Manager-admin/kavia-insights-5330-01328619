import React from 'react';
import DataTable from './DataTable';
import './Dashboard.css';
import MetricChart from './MetricChart';

// PUBLIC_INTERFACE
/**
 * Dashboard for Kavia Metrics.
 * Shows all metrics as a table with optional simple chart if helpful.
 */
function Dashboard({ metrics }) {
  if (!metrics.length) {
    return (
      <div className="dashboard">
        <div>No metric data available</div>
      </div>
    );
  }

  // Determine if chart is useful: use 'elapsed_time' over date as line plot.
  const showChart = metrics.length > 1;
  let chartSection = null;

  if (showChart) {
    const dates = metrics.map((m) => m.date.split(" ")[0]);
    const elapsed = metrics.map((m) => m.elapsed_time);
    chartSection = (
      <div className="charts-row" style={{ marginBottom: 16 }}>
        <MetricChart
          labels={dates}
          data={elapsed}
          title={"Elapsed Time Over Runs"}
          strokeColor={"var(--primary)"}
          fillColor={"rgba(255,149,0,0.09)"}
          minTicks={4}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      {chartSection}
      <div>
        <DataTable data={metrics} />
      </div>
    </div>
  );
}

export default Dashboard;
