import React, { useMemo } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';
import { normalizeCoordinates } from '../utils/mapScaler';

export const SpatialMapCanvas = () => {
  const { routeCoordinates, trackingLogs, currentBearing, replayActive, replayIndex } = useJourneyStore();

  const activeCoordinates = useMemo(() => {
    return replayActive ? routeCoordinates.slice(0, replayIndex) : routeCoordinates;
  }, [routeCoordinates, replayActive, replayIndex]);

  // Extract accepted logs to get speeds for the segments.
  const acceptedLogs = useMemo(() => {
    const logs = trackingLogs.filter(log => log.message === 'Coordinate Accepted').reverse();
    return replayActive ? logs.slice(0, replayIndex) : logs;
  }, [trackingLogs, replayActive, replayIndex]);

  const { scaledPoints, minLat, maxLat, minLng, maxLng } = useMemo(() => {
    return normalizeCoordinates(activeCoordinates, 800, 400, 30);
  }, [activeCoordinates]);

  // Statistics calculations
  const longestSegment = acceptedLogs.length > 0 
    ? Math.max(...acceptedLogs.map(l => Number(l.segmentDistance) || 0)) 
    : 0;
  
  const distances = acceptedLogs.map(l => Number(l.segmentDistance) || 0).filter(d => d > 0);
  const shortestSegment = distances.length > 0 ? Math.min(...distances) : 0;

  const getSpeedColor = (index) => {
    if (index === 0) return 'red';
    // Match the speed from the accepted logs at the current index.
    // If mismatch occurs, fallback to 0.
    const speed = acceptedLogs[index] ? Number(acceptedLogs[index].currentSpeed) : 0;
    
    if (speed > 50) return '#27ae60'; // Fast (Green)
    if (speed > 15) return '#f39c12'; // Moderate (Yellowish orange for visibility)
    return '#e74c3c'; // Slow (Red)
  };

  const renderGrid = () => {
    const lines = [];
    for (let x = 0; x <= 800; x += 50) {
      lines.push(<line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={400} stroke="#f0f0f0" strokeWidth="1" />);
    }
    for (let y = 0; y <= 400; y += 50) {
      lines.push(<line key={`hy-${y}`} x1={0} y1={y} x2={800} y2={y} stroke="#f0f0f0" strokeWidth="1" />);
    }
    return <g>{lines}</g>;
  };

  const renderPath = () => {
    if (scaledPoints.length < 2) return null;
    const paths = [];
    for (let i = 1; i < scaledPoints.length; i++) {
      const p1 = scaledPoints[i - 1];
      const p2 = scaledPoints[i];
      paths.push(
        <line 
          key={`segment-${i}`} 
          x1={p1.x} 
          y1={p1.y} 
          x2={p2.x} 
          y2={p2.y} 
          stroke={getSpeedColor(i)} 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      );
    }
    return <g>{paths}</g>;
  };

  if (routeCoordinates.length === 0) {
    return (
      <div className="panel-card map-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <h2 className="panel-title" style={{ alignSelf: 'flex-start', width: '100%' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
          Spatial Map Canvas
        </h2>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: '1rem', opacity: 0.5 }}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <p style={{ fontSize: '1rem', fontWeight: 500 }}>Start tracking to visualize your journey.</p>
        </div>
      </div>
    );
  }

  const startPoint = scaledPoints[0];
  const currentPoint = scaledPoints[scaledPoints.length - 1];

  return (
    <div className="panel-card map-area" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
        Spatial Map Canvas
      </h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', flex: 1 }}>
        
        {/* SVG Container */}
        <div style={{ flex: '3 1 500px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
            {/* 1. Grid Overlay */}
            {renderGrid()}
            
            {/* 2. Route Path */}
            {renderPath()}
            
            {/* 3. Start Marker */}
            {startPoint && (
              <g transform={`translate(${startPoint.x}, ${startPoint.y})`}>
                <circle cx="0" cy="0" r="5" fill="var(--card-bg)" stroke="var(--accent-color)" strokeWidth="3" />
                <rect x="-25" y="-28" width="50" height="18" rx="4" fill="var(--accent-color)" />
                <text x="0" y="-15" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">START</text>
              </g>
            )}

            {/* 4. Current Marker */}
            {currentPoint && scaledPoints.length > 1 && (
              <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
                <circle cx="0" cy="0" r="7" fill="var(--danger-color)">
                  <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="3" fill="var(--card-bg)" />
                <rect x="-35" y="14" width="70" height="18" rx="4" fill="var(--danger-color)" />
                <text x="0" y="27" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">CURRENT</text>
              </g>
            )}
          </svg>
          
          {/* Legend Overlay */}
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: 'var(--card-bg)', padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', gap: '1rem', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--success-color)', borderRadius: '2px' }}></div> Fast
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--warning-color)', borderRadius: '2px' }}></div> Moderate
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--danger-color)', borderRadius: '2px' }}></div> Slow
            </div>
          </div>
        </div>

        {/* Route Statistics Panel */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="metric-card" style={{ padding: '1rem' }}>
            <span className="metric-label">Total Points</span>
            <div className="metric-value" style={{ fontSize: '1.25rem' }}>{activeCoordinates.length}</div>
          </div>
          
          <div className="metric-card" style={{ padding: '1rem' }}>
            <span className="metric-label">Route Bounds</span>
            <div className="metric-value" style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>
              Lat: {minLat?.toFixed(4)} to {maxLat?.toFixed(4)}<br/>
              Lng: {minLng?.toFixed(4)} to {maxLng?.toFixed(4)}
            </div>
          </div>
          
          <div className="metric-card" style={{ padding: '1rem' }}>
            <span className="metric-label">Longest Segment</span>
            <div className="metric-value" style={{ fontSize: '1.25rem' }}>{longestSegment.toFixed(3)} <span className="metric-unit">km</span></div>
          </div>
          
          <div className="metric-card" style={{ padding: '1rem' }}>
            <span className="metric-label">Shortest Segment</span>
            <div className="metric-value" style={{ fontSize: '1.25rem' }}>{shortestSegment.toFixed(3)} <span className="metric-unit">km</span></div>
          </div>
          
          <div className="metric-card" style={{ padding: '1rem' }}>
            <span className="metric-label">Current Direction</span>
            <div className="metric-value" style={{ fontSize: '1.25rem' }}>{currentBearing}</div>
          </div>

        </div>

      </div>
    </div>
  );
};
