import React from 'react';
import './SideNav.css';

// PUBLIC_INTERFACE
/**
 * SideNav presents application info and sort/order controls for the main data table.
 * Users can select a column to sort by, and choose ascending/descending order.
 */
function SideNav({
  application,
  applications,
  allMetricDates,
  // Dynamic sorting controls
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  sortFields
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Application</div>
        <div
          className="sidebar-select"
          tabIndex={-1}
          style={{ background: '#f3f3f3', color: '#aaa', cursor: 'not-allowed' }}
        >
          {application}
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Date</div>
        <div
          className="sidebar-select"
          tabIndex={-1}
          style={{ background: '#f3f3f3', color: '#aaa', cursor: 'not-allowed' }}
        >
          {allMetricDates && allMetricDates.length > 0 ? allMetricDates[0] : '-'}
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Sort Table By</div>
        <select
          className="sidebar-select"
          aria-label="Sort field"
          value={sortField}
          onChange={e => setSortField(e.target.value)}
        >
          {sortFields && sortFields.map(sf => (
            <option key={sf.value} value={sf.value}>{sf.label}</option>
          ))}
        </select>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Order</div>
        <select
          className="sidebar-select"
          aria-label="Sort order"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </aside>
  );
}

export default SideNav;
