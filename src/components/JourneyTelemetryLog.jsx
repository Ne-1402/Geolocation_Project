import React, { memo } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';

const LogRow = memo(({ log }) => {
  const isRejected = log.message.includes('Rejected');
  return (
    <tr style={{ 
      color: isRejected ? 'var(--danger-color)' : 'inherit', 
      backgroundColor: isRejected ? 'var(--bg-color)' : 'inherit',
      opacity: isRejected ? 0.7 : 1
    }}>
      <td>{log.timestamp}</td>
      <td>{log.latitude || '-'}</td>
      <td>{log.longitude || '-'}</td>
      <td>{log.accuracy ? `${log.accuracy}m` : '-'}</td>
      <td>{log.currentSpeed ? `${log.currentSpeed} km/h` : '-'}</td>
      <td>
        <span style={{ 
          padding: '0.15rem 0.5rem', 
          borderRadius: '4px', 
          fontSize: '0.75rem', 
          backgroundColor: isRejected ? 'rgba(220, 38, 38, 0.1)' : 'rgba(5, 150, 105, 0.1)',
          color: isRejected ? 'var(--danger-color)' : 'var(--success-color)'
        }}>
          {log.message}
        </span>
      </td>
    </tr>
  );
});

export const JourneyTelemetryLog = () => {
  const { trackingLogs } = useJourneyStore();

  return (
    <div className="panel-card log-area">
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        Journey Telemetry Logs
      </h2>
      
      {trackingLogs.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" style={{ marginBottom: '1rem', opacity: 0.5 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>No telemetry data collected</p>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>Start tracking or load a journey to view logs.</p>
        </div>
      ) : (
        <div className="saas-table-container" style={{ maxHeight: '350px' }}>
          <table className="saas-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Accuracy</th>
                <th>Speed</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {trackingLogs.slice().reverse().map((log, index) => (
                <LogRow key={index} log={log} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
