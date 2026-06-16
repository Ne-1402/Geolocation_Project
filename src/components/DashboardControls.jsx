import React from 'react';
import { useJourneyStore } from '../store/useJourneyStore';
import { startGPS, pauseGPS, resumeGPS, resetGPS } from '../services/geolocationService';
import { saveJourney } from '../utils/storage';

export const DashboardControls = () => {
  const store = useJourneyStore();
  const { trackingActive, trackingPaused, trackingLogs, routeCoordinates, elapsedTime, totalDistance, averageSpeed, refreshSavedJourneys } = store;

  const handleSave = () => {
    if (routeCoordinates.length === 0) {
      alert("No coordinates to save!");
      return;
    }
    const name = window.prompt("Enter a name for this journey:");
    if (!name || name.trim() === "") {
      alert("Journey name cannot be empty.");
      return;
    }

    const newJourney = saveJourney({
      name: name.trim(),
      duration: elapsedTime,
      totalDistance,
      averageSpeed,
      routeCoordinates,
      trackingLogs
    });

    if (newJourney) {
      refreshSavedJourneys();
      alert("Journey saved successfully!");
    } else {
      alert("Failed to save journey.");
    }
  };

  return (
    <div className="panel-card controls-area">
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"></path></svg>
        Tracking Controls
      </h2>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-success"
          onClick={startGPS}
          disabled={trackingActive && !trackingPaused}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Start
        </button>
        <button 
          className="btn btn-warning"
          onClick={pauseGPS}
          disabled={!trackingActive || trackingPaused}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          Pause
        </button>
        <button 
          className="btn btn-success"
          onClick={resumeGPS}
          disabled={!trackingActive || !trackingPaused}
        >
          Resume
        </button>
        <button 
          className="btn btn-danger"
          onClick={resetGPS}
          disabled={!trackingActive && !trackingPaused && trackingLogs.length === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
          Reset
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSave}
          disabled={trackingLogs.length === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Save Journey
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
        <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Engine Status:</span> 
        <span style={{ 
          padding: '0.25rem 0.5rem', 
          borderRadius: '9999px', 
          backgroundColor: !trackingActive ? 'var(--bg-color)' : trackingPaused ? '#FEF3C7' : '#D1FAE5',
          color: !trackingActive ? 'var(--text-muted)' : trackingPaused ? '#92400E' : '#065F46',
          fontWeight: '500',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {!trackingActive ? 'Inactive' : trackingPaused ? 'Paused' : 'Active'}
        </span>
      </div>
    </div>
  );
};
