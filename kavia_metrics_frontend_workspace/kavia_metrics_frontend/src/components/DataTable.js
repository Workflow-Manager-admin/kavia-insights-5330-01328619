import React from 'react';
import './DataTable.css';

// PUBLIC_INTERFACE
/**
 * DataTable for Kavia Metrics displays the current metric object's relevant fields.
 * Only shows fields: app_name, elapsed_time, total_cost, date, project_link, cga_version, model, streaming.
 */
function DataTable({ data }) {
  return (
    <div className="data-table-card">
      <div className="data-table-title">Metric Data</div>
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Application</th>
              <th>Elapsed Time (s)</th>
              <th>Total Cost ($)</th>
              <th>Date</th>
              <th>Project Link</th>
              <th>CGA Version</th>
              <th>Model</th>
              <th>Streaming</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((m, idx) => (
                <tr key={`${m.app_name}-${m.date}-${idx}`}>
                  <td>{m.app_name}</td>
                  <td>{m.elapsed_time.toFixed(2)}</td>
                  <td>{m.total_cost.toFixed(2)}</td>
                  <td>{m.date}</td>
                  <td>
                    <a href={/^https?:\/\//.test(m.project_link) ? m.project_link : `https://${m.project_link.replace(/^\/\//, '')}`} 
                       target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", wordBreak: "break-all" }}>
                      {m.project_link.replace(/^\/\//, '')}
                    </a>
                  </td>
                  <td>{m.cga_version}</td>
                  <td>{m.model}</td>
                  <td>{m.streaming ? "Enabled" : "Disabled"}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={8} className="center">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
