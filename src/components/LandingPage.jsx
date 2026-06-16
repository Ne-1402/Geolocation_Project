import React, { useEffect } from 'react';
import './LandingPage.css';

export const LandingPage = ({ onLaunch }) => {
  // Simple scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* HEADER */}
      <header className="landing-header">
        <div className="brand-section">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h1 className="app-title" style={{ margin: 0 }}>GeoAnalytics Platform</h1>
        </div>
        <nav className="landing-nav">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="landing-nav-link">Features</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="landing-nav-link">How It Works</a>
          <a href="#technology" onClick={(e) => { e.preventDefault(); scrollToSection('technology'); }} className="landing-nav-link">Technology</a>
          <a href="#applications" onClick={(e) => { e.preventDefault(); scrollToSection('applications'); }} className="landing-nav-link">Applications</a>
          <button className="btn btn-primary" onClick={onLaunch}>
            Launch Dashboard
          </button>
        </nav>
      </header>

      <main>
        {/* SECTION 1: HERO */}
        <section className="landing-section">
          <div className="hero-layout">
            <div className="hero-content">
              <h1 className="hero-headline">Track Every Journey.<br/>Analyze Every Meter.</h1>
              <p className="hero-subheadline">
                A browser-based geolocation analytics platform that measures distance, speed, direction, route history, and travel performance in real time.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }} onClick={onLaunch}>
                  Launch Dashboard
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }} onClick={() => scrollToSection('features')}>
                  Explore Features
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <svg width="100%" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Decorative Grid */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-color)" strokeWidth="1"/>
                </pattern>
                <rect width="400" height="300" fill="url(#grid)" rx="12" />
                
                {/* Route Path */}
                <path d="M50 250 L150 180 L200 210 L300 100 L350 120" stroke="var(--accent-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Distance/Direction Indicators */}
                <path d="M200 210 L300 100" stroke="var(--success-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,5"/>
                
                {/* Start Marker */}
                <circle cx="50" cy="250" r="8" fill="var(--card-bg)" stroke="var(--accent-color)" strokeWidth="3"/>
                <text x="50" y="270" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontWeight="bold">START</text>
                
                {/* Mid Markers */}
                <circle cx="150" cy="180" r="5" fill="var(--accent-color)" />
                <circle cx="200" cy="210" r="5" fill="var(--accent-color)" />
                <circle cx="300" cy="100" r="5" fill="var(--accent-color)" />
                
                {/* Current Marker */}
                <circle cx="350" cy="120" r="10" fill="var(--danger-color)" opacity="0.2"/>
                <circle cx="350" cy="120" r="6" fill="var(--danger-color)"/>
                
                {/* Floating Metric Card */}
                <g transform="translate(180, 50)">
                  <rect width="140" height="50" rx="6" fill="var(--card-bg)" stroke="var(--border-color)" strokeWidth="1" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.05))"/>
                  <text x="15" y="20" fill="var(--text-muted)" fontSize="10" fontWeight="600">DISTANCE</text>
                  <text x="15" y="38" fill="var(--accent-color)" fontSize="16" fontWeight="bold">12.4 km</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 2: KEY FEATURES */}
        <section id="features" className="landing-section landing-section-alt">
          <h2 className="section-title">Platform Capabilities</h2>
          <p className="section-subtitle">Everything you need to track, measure, and analyze geolocation data offline.</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"></circle><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
              </div>
              <h3 className="feature-title">Real-Time GPS Tracking</h3>
              <p className="feature-desc">Utilizes the browser's Geolocation API to precisely track movement coordinates in real-time.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h3 className="feature-title">Travel Distance Analytics</h3>
              <p className="feature-desc">Computes accurate distance metrics continuously using the mathematical Haversine formula.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="feature-title">Speed Monitoring</h3>
              <p className="feature-desc">Dynamically calculates velocity between points, color-coding routes based on traversal speed.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              </div>
              <h3 className="feature-title">Direction Detection</h3>
              <p className="feature-desc">Generates precise compass bearing calculations (North, East, South, West) as you move.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              </div>
              <h3 className="feature-title">Route Visualization</h3>
              <p className="feature-desc">Maps out your journey continuously on a custom spatial canvas without external map providers.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <h3 className="feature-title">JSON / GPX / CSV Export</h3>
              <p className="feature-desc">Full data portability. Export standard format tracking logs to use in professional GIS tools.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section id="how-it-works" className="landing-section">
          <h2 className="section-title">How The Engine Works</h2>
          <p className="section-subtitle">A highly optimized data pipeline executing on every geolocation tick.</p>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Acquire GPS Coordinates</h3>
                <p>The platform listens to the device's hardware, requesting High Accuracy coordinate payloads via the `watchPosition` API.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Validate Accuracy</h3>
                <p>Raw points are filtered. Any coordinate with an accuracy radius greater than 30 meters is immediately rejected to prevent route spikes.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Calculate Distance & Metrics</h3>
                <p>The Haversine engine compares the new point against the previous point, summing total distance, computing speed, and determining the bearing.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Visualize and Store Journeys</h3>
                <p>The spatial canvas plots the new segment, the state store triggers an update, and upon completion, the entire journey persists to LocalStorage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ANALYTICS SHOWCASE */}
        <section className="landing-section landing-section-alt">
          <h2 className="section-title">Dashboard Preview</h2>
          <p className="section-subtitle">A glimpse into the real-time telemetry metrics.</p>
          
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className="metric-card" style={{ padding: '1rem' }}>
                <span className="metric-label">Total Distance</span>
                <div className="metric-value">4.25 <span className="metric-unit">km</span></div>
              </div>
              <div className="metric-card" style={{ padding: '1rem' }}>
                <span className="metric-label">Current Speed</span>
                <div className="metric-value" style={{ color: 'var(--success-color)' }}>12.4 <span className="metric-unit">km/h</span></div>
              </div>
              <div className="metric-card" style={{ padding: '1rem' }}>
                <span className="metric-label">Avg Accuracy</span>
                <div className="metric-value" style={{ color: 'var(--accent-color)' }}>8.2 <span className="metric-unit">m</span></div>
              </div>
            </div>
            
            <div style={{ height: '200px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              {/* Fake Map Background */}
              <svg width="100%" height="100%" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice">
                <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-color)" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-small)" />
                <path d="M100 100 L300 50 L500 120 L700 80" stroke="var(--accent-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100" cy="100" r="6" fill="var(--card-bg)" stroke="var(--accent-color)" strokeWidth="3" />
                <circle cx="700" cy="80" r="8" fill="var(--danger-color)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: TECHNOLOGY STACK */}
        <section id="technology" className="landing-section">
          <h2 className="section-title">Built With Modern Standards</h2>
          <p className="section-subtitle">Powered by cutting-edge web technologies, functioning entirely offline.</p>
          
          <div className="tech-flex">
            <div className="tech-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse></svg>
              <strong style={{ fontSize: '1.1rem' }}>React JS</strong>
            </div>
            <div className="tech-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              <strong style={{ fontSize: '1.1rem' }}>Zustand</strong>
            </div>
            <div className="tech-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
              <strong style={{ fontSize: '1.1rem' }}>Geolocation API</strong>
            </div>
            <div className="tech-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
              <strong style={{ fontSize: '1.1rem' }}>Local Storage</strong>
            </div>
            <div className="tech-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <strong style={{ fontSize: '1.1rem' }}>Haversine Math</strong>
            </div>
          </div>
        </section>

        {/* SECTION 6: DEVELOPER SIMULATION MODE */}
        <section className="landing-section landing-section-alt">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent-color)', color: '#fff', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
              PRO FEATURE
            </span>
            <h2 className="section-title">Developer Simulation Mode</h2>
            <p className="section-subtitle">Testing an app without moving? We've got you covered. The platform includes a dedicated simulation engine capable of generating artificial movement.</p>
            
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', flex: '1 1 200px' }}>
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ marginBottom: '1rem' }}>
                  <rect x="20" y="20" width="60" height="60" stroke="var(--accent-color)" strokeWidth="4" />
                  <circle cx="20" cy="20" r="6" fill="var(--danger-color)" />
                </svg>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Square Route</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Perfect 4-corner generation for rigid testing.</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', flex: '1 1 200px' }}>
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ marginBottom: '1rem' }}>
                  <circle cx="50" cy="50" r="30" stroke="var(--accent-color)" strokeWidth="4" />
                  <circle cx="50" cy="20" r="6" fill="var(--danger-color)" />
                </svg>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Circular Route</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Continuous orbital generation using trigonometry.</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', flex: '1 1 200px' }}>
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ marginBottom: '1rem' }}>
                  <path d="M20 80 L50 20 L80 80" stroke="var(--accent-color)" strokeWidth="4" strokeLinejoin="round" />
                  <circle cx="80" cy="80" r="6" fill="var(--danger-color)" />
                </svg>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Zig-Zag Route</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complex multi-directional path testing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: REAL-WORLD APPLICATIONS */}
        <section id="applications" className="landing-section">
          <h2 className="section-title">Real-World Applications</h2>
          <p className="section-subtitle">Designed for a variety of geospatial analysis needs.</p>
          
          <div className="feature-grid">
            <div className="feature-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Fitness Route Analysis</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Track runs, cycles, or hikes, measuring exactly how far and how fast you moved.</p>
            </div>
            <div className="feature-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Field Survey Tracking</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Export high-accuracy GPX routes for topographical surveys and map generation.</p>
            </div>
            <div className="feature-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Delivery Route Monitoring</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Log delivery segments and measure driver speeds and signal dead zones.</p>
            </div>
            <div className="feature-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Academic Research</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Utilize raw CSV output to run complex data models on human movement patterns.</p>
            </div>
          </div>
        </section>

        {/* SECTION 8: PROJECT STATISTICS */}
        <section className="landing-section landing-section-alt">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>100%</div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offline Capability</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>30m</div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accuracy Filter Threshold</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>3</div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Export Formats</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>0</div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Server Dependencies</div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA */}
        <section className="landing-section" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ready to Start Tracking?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Launch the dashboard now and begin your journey. No sign-up required. Everything runs locally in your browser.
          </p>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: '8px' }}
            onClick={onLaunch}
          >
            Launch Tracking Dashboard
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span style={{ fontWeight: 600 }}>Geolocation Travel Distance Tracking Playground</span>
        </div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Powered by React JS & Zustand</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Academic Case Study Notice: This application is built for demonstrational GPS tracking.</p>
      </footer>
    </div>
  );
};
