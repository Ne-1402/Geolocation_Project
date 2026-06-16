import React, { useEffect, useRef, useState } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';

export const RouteReplayPanel = () => {
  const store = useJourneyStore();
  const { 
    routeCoordinates, 
    replayActive, 
    replayPaused, 
    replayIndex, 
    updateState,
    trackingActive
  } = store;

  const [replaySpeed, setReplaySpeed] = useState(1);
  const timerRef = useRef(null);

  const totalPoints = routeCoordinates.length;

  useEffect(() => {
    if (replayActive && !replayPaused && replayIndex < totalPoints) {
      const intervalDelay = 1000 / replaySpeed;
      timerRef.current = setInterval(() => {
        useJourneyStore.getState().updateState({
          replayIndex: useJourneyStore.getState().replayIndex + 1
        });
      }, intervalDelay);
    }

    if (replayIndex >= totalPoints && replayActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      updateState({ replayPaused: true });
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [replayActive, replayPaused, replaySpeed, replayIndex, totalPoints, updateState]);

  const handleStart = () => {
    if (totalPoints === 0) return;
    updateState({ replayActive: true, replayPaused: false, replayIndex: 1 });
  };

  const handlePause = () => updateState({ replayPaused: true });
  
  const handleResume = () => {
    if (replayIndex >= totalPoints) {
      updateState({ replayIndex: 1, replayPaused: false });
    } else {
      updateState({ replayPaused: false });
    }
  };

  const handleStop = () => {
    updateState({ replayActive: false, replayPaused: false, replayIndex: 0 });
  };

  if (trackingActive || totalPoints === 0) return null;

  return (
    <div className="panel-card replay-area">
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Route Replay Animation
      </h2>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {!replayActive ? (
          <button className="btn btn-primary" onClick={handleStart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Play Route
          </button>
        ) : (
          <>
            {replayPaused ? (
              <button className="btn btn-success" onClick={handleResume}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Resume
              </button>
            ) : (
              <button className="btn btn-warning" onClick={handlePause}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                Pause
              </button>
            )}
            <button className="btn btn-danger" onClick={handleStop}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              Stop
            </button>
          </>
        )}

        <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Speed:</label>
          <select 
            value={replaySpeed} 
            onChange={(e) => setReplaySpeed(Number(e.target.value))}
            style={{ padding: '0.5rem 1rem', fontFamily: 'inherit', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
            disabled={!replayActive}
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>
        </div>

      </div>
      
      {replayActive && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                backgroundColor: 'var(--accent-color)', 
                width: `${(replayIndex / totalPoints) * 100}%`,
                transition: 'width 0.1s linear'
              }} 
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.5rem', fontWeight: 500 }}>
            Point {replayIndex} of {totalPoints}
          </p>
        </div>
      )}
    </div>
  );
};
