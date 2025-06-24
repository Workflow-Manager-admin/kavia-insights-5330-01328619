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

  // Determine if chart is useful for more than one data record
  const showCharts = metrics.length > 1;
  let chartsSection = null;

  if (showCharts) {
    const dates = metrics.map((m) => m.date.split(" ")[0]);
    const elapsed = metrics.map((m) => m.elapsed_time);
    const totalCost = metrics.map((m) => m.total_cost);

    chartsSection = (
      <div className="charts-row" style={{ marginBottom: 16 }}>
        <MetricChart
          labels={dates}
          data={elapsed}
          title="Elapsed Time Over Runs"
          strokeColor="var(--primary)"
          fillColor="rgba(255,149,0,0.09)"
          minTicks={4}
        />
        <MetricChart
          labels={dates}
          data={totalCost}
          title="Total Cost Over Runs"
          strokeColor="var(--secondary)"
          fillColor="rgba(0,17,255,0.07)"
          minTicks={4}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      {chartsSection}
      <div>
        <DataTable data={metrics} />
      </div>
    </div>
  );
}

export default Dashboard;
