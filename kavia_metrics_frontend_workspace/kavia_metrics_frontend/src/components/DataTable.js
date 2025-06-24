import React from 'react';
import './DataTable.css';

// PUBLIC_INTERFACE
function DataTable({ data }) {
  return (
    <div className="data-table-card">
      <div className="data-table-title">Metric Data Table</div>
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ minWidth: 90 }}>Date</th>
              <th style={{ minWidth: 130 }}>Application</th>
              <th style={{ minWidth: 90 }}>Requests</th>
              <th>Cost ($)</th>
              <th>Error %</th>
              <th>Latency (ms)</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((m) => (
                <tr key={`${m.application}-${m.date}`}>
                  <td>{m.date}</td>
                  <td>{m.application}</td>
                  <td>{m.metrics.requests}</td>
                  <td>{m.metrics.cost}</td>
                  <td>{(Math.round(m.metrics.errorRate * 1000) / 10).toFixed(1)}</td>
                  <td>{m.metrics.latency}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="center">No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
