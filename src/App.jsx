import React, { useState, useEffect, Component } from 'react';
import { DashboardControls } from './components/DashboardControls';
import { SimulationControlPanel } from './components/SimulationControlPanel';
import { RouteReplayPanel } from './components/RouteReplayPanel';
import { OdometerScoreboard } from './components/OdometerScoreboard';
import { DiagnosticsDashboard } from './components/DiagnosticsDashboard';
import { SpatialMapCanvas } from './components/SpatialMapCanvas';
import { JourneyTelemetryLog } from './components/JourneyTelemetryLog';
import { ImportExportPanel } from './components/ImportExportPanel';
import { JourneyHistoryPanel } from './components/JourneyHistoryPanel';
import { LandingPage } from './components/LandingPage';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red', background: '#fff' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info && this.state.info.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('geolocation_theme') === 'dark';
  });

  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('geolocation_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('geolocation_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ErrorBoundary>
      {!showDashboard ? (
        <LandingPage onLaunch={() => setShowDashboard(true)} />
      ) : (
        <div className="app-container">
          <header className="app-header">
            <div className="brand-section">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h1 className="app-title">GeoAnalytics Platform</h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></span>
                System Online
              </span>
              <button 
                className="btn btn-secondary"
                onClick={toggleTheme} 
                aria-label="Toggle Dark Mode"
                tabIndex={0}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </header>
          
          <main className="dashboard-main">
            {/* Top Row: KPIs */}
            <OdometerScoreboard />
            
            {/* Middle Row: Map & Controls */}
            <div className="map-controls-layout">
              <SpatialMapCanvas />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SimulationControlPanel />
                <RouteReplayPanel />
                <DashboardControls />
              </div>
            </div>
            
            {/* Bottom Row: Logs, Diagnostics, History */}
            <DiagnosticsDashboard />
            <div className="logs-data-grid">
              <JourneyTelemetryLog />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ImportExportPanel />
                <JourneyHistoryPanel />
              </div>
            </div>
          </main>
        </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
