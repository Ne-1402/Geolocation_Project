import React from 'react';
import { useJourneyStore } from '../store/useJourneyStore';

export const OdometerScoreboard = () => {
  const { 
    totalDistance, 
    currentSpeed, 
    averageSpeed, 
    elapsedTime, 
    currentPosition,
    currentBearing, 
    signalStrength,
    achievedMilestones
  } = useJourneyStore();

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Total Distance</span>
          <div className="metric-value">
            {totalDistance.toFixed(2)}<span className="metric-unit">km</span>
          </div>
        </div>
        
        <div className="metric-card">
          <span className="metric-label">Current Speed</span>
          <div className="metric-value">
            {currentSpeed.toFixed(1)}<span className="metric-unit">km/h</span>
          </div>
        </div>
        
        <div className="metric-card">
          <span className="metric-label">Avg Speed</span>
          <div className="metric-value">
            {averageSpeed.toFixed(1)}<span className="metric-unit">km/h</span>
          </div>
        </div>
        
        <div className="metric-card">
          <span className="metric-label">Elapsed Time</span>
          <div className="metric-value" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>
            {formatTime(elapsedTime)}
          </div>
        </div>
        
        <div className="metric-card">
          <span className="metric-label">Direction</span>
          <div className="metric-value" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            {currentBearing}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ({currentPosition ? `${currentPosition.lat.toFixed(3)}, ${currentPosition.lng.toFixed(3)}` : 'No Signal'})
            </span>
          </div>
        </div>
        
        <div className="metric-card">
          <span className="metric-label">Signal</span>
          <div className="metric-value" style={{ fontSize: '1.25rem', color: signalStrength === 'Strong' ? 'var(--success-color)' : signalStrength === 'Unknown' ? 'var(--text-muted)' : 'var(--warning-color)' }}>
            {signalStrength}
          </div>
        </div>
      </div>

      {achievedMilestones && achievedMilestones.length > 0 && (
        <div style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--success-color)', color: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>Distance Milestones Achieved!</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
              Successfully travelled: {achievedMilestones.map(m => `${m}km`).join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
