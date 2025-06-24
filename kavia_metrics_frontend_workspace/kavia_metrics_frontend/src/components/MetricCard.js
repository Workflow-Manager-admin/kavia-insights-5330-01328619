import React from 'react';
import './MetricCard.css';

// PUBLIC_INTERFACE
function MetricCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="metric-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="metric-icon" style={{ background: color }}>
        {icon}
      </div>
      <div>
        <div className="metric-title">{title}</div>
        <div className="metric-value">{value}</div>
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
export default MetricCard;
