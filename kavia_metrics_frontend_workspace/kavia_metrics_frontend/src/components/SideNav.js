import React from 'react';
import './SideNav.css';

// PUBLIC_INTERFACE
function SideNav({
  application,
  setApplication,
  applications,
  dateRange,
  setDateRange,
  allMetricDates,
}) {
  // Handler for quick date range (day pick)
  function handleQuickDate(date) {
    setDateRange({ start: date, end: date });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Application</div>
        <select
          className="sidebar-select"
          value={application}
          onChange={e => setApplication(e.target.value)}
        >
          {applications.map(app => (
            <option key={app} value={app}>{app}</option>
          ))}
        </select>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Date filter</div>
        <input
          className="sidebar-date"
          type="date"
          value={dateRange.start}
          onChange={e =>
            setDateRange(r => ({ ...r, start: e.target.value }))
          }
          max={dateRange.end || ''}
        />
        <input
          className="sidebar-date"
          type="date"
          value={dateRange.end}
          onChange={e =>
            setDateRange(r => ({ ...r, end: e.target.value }))
          }
          min={dateRange.start || ''}
        />
        <div style={{marginTop: '8px', display: 'flex', gap: 2, flexWrap: 'wrap'}}>
          {allMetricDates.map(date => (
            <button
              key={date}
              className="btn btn-mini btn-outline"
              onClick={() => handleQuickDate(date)}
              style={{marginRight: 2, marginBottom: 2}}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
