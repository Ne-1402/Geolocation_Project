import React from 'react';
import { useJourneyStore } from '../store/useJourneyStore';
import { startSimulation, pauseSimulation, resumeSimulation, resetSimulation } from '../utils/simulator';

export const SimulationControlPanel = () => {
  const store = useJourneyStore();
  const { 
    isDeveloperMode, 
    simulationMode, 
    simulationStatus, 
    simulationIndex, 
    simulationTotal,
    trackingActive,
    trackingPaused,
    updateState
  } = store;

  const handleToggleDevMode = () => {
    // Prevent toggling if actively tracking
    if (trackingActive && !trackingPaused) {
      alert("Please pause or reset current tracking before changing developer mode.");
      return;
    }
    updateState({ isDeveloperMode: !isDeveloperMode });
  };

  const completionPercentage = simulationTotal > 0 
    ? ((simulationIndex / simulationTotal) * 100).toFixed(0) 
    : 0;

  return (
    <div className="panel-card controls-area" style={{ border: isDeveloperMode ? '1px solid #8e44ad' : '' }}>
      <h2 className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          Simulation Control Panel
        </span>
        <button 
          className={isDeveloperMode ? "btn btn-primary" : "btn btn-secondary"}
          onClick={handleToggleDevMode}
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: isDeveloperMode ? '#8e44ad' : '' }}
        >
          {isDeveloperMode ? 'Developer Mode: ON' : 'Developer Mode: OFF'}
        </button>
      </h2>

      {isDeveloperMode ? (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Route</label>
              <select 
                value={simulationMode} 
                onChange={(e) => updateState({ simulationMode: e.target.value, simulationIndex: 0 })}
                disabled={trackingActive && !trackingPaused}
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
              >
                <option value="Square">Square Route</option>
                <option value="Circular">Circular Route</option>
                <option value="Zig-Zag">Zig-Zag Route</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button 
              className="btn btn-success"
              onClick={startSimulation}
              disabled={simulationStatus === 'Simulation Active' || simulationStatus === 'Simulation Complete'}
            >
              Start Simulation
            </button>
            <button 
              className="btn btn-warning"
              onClick={pauseSimulation}
              disabled={simulationStatus !== 'Simulation Active'}
            >
              Pause
            </button>
            <button 
              className="btn btn-success"
              onClick={resumeSimulation}
              disabled={simulationStatus !== 'Simulation Paused'}
            >
              Resume
            </button>
            <button 
              className="btn btn-danger"
              onClick={resetSimulation}
              disabled={simulationStatus === 'Waiting To Start'}
            >
              Reset
            </button>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Simulation Metadata</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</strong>
                <span style={{ fontWeight: 500 }}>{simulationStatus}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Route Type</strong>
                <span style={{ fontWeight: 500 }}>{simulationMode}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Points Generated</strong>
                <span style={{ fontWeight: 500 }}>{simulationIndex} / {simulationTotal || '?'}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Completion</strong>
                <span style={{ fontWeight: 500 }}>{completionPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px dashed var(--border-color)', marginTop: '1rem' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" style={{ marginBottom: '1rem' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 500 }}>Developer Simulation Mode is Disabled</p>
          <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Enable developer mode to generate artificial GPS routes for testing without physical movement.</p>
        </div>
      )}
    </div>
  );
};
