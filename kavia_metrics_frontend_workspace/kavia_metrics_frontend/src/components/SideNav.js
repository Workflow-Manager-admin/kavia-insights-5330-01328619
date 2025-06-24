import React from 'react';
import './SideNav.css';

// PUBLIC_INTERFACE
/**
 * SideNav appears as a static block for informational purposes, with no filters.
 * Shows the app name and single available date.
 */
function SideNav({
  application,
  applications,
  allMetricDates,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Application</div>
        <div className="sidebar-select" tabIndex={-1} style={{ background: '#f3f3f3', color: '#aaa', cursor: 'not-allowed' }}>
          {application}
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Date</div>
        <div className="sidebar-select" tabIndex={-1} style={{ background: '#f3f3f3', color: '#aaa', cursor: 'not-allowed' }}>
          {allMetricDates && allMetricDates.length > 0 ? allMetricDates[0] : '-'}
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
