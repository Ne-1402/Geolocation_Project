import React, { useMemo } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';

export const DiagnosticsDashboard = () => {
  const { trackingLogs } = useJourneyStore();

  const metrics = useMemo(() => {
    let accepted = 0;
    let rejected = 0;
    let sumAccuracy = 0;
    let bestAccuracy = Infinity;
    let worstAccuracy = 0;
    let strong = 0;
    let moderate = 0;
    let weak = 0;

    trackingLogs.forEach(log => {
      if (log.message.includes('Accepted')) {
        accepted++;
        const acc = Number(log.accuracy) || 0;
        sumAccuracy += acc;
        if (acc < bestAccuracy) bestAccuracy = acc;
        if (acc > worstAccuracy) worstAccuracy = acc;

        if (acc <= 10) strong++;
        else if (acc <= 20) moderate++;
        else weak++;
      } else if (log.message.includes('Rejected')) {
        rejected++;
      }
    });

    const avgAccuracy = accepted > 0 ? (sumAccuracy / accepted) : 0;
    const totalSignals = strong + moderate + weak + rejected;

    return {
      accepted,
      rejected,
      avgAccuracy: avgAccuracy === 0 ? 'N/A' : avgAccuracy.toFixed(1) + ' m',
      bestAccuracy: bestAccuracy === Infinity ? 'N/A' : bestAccuracy + ' m',
      worstAccuracy: worstAccuracy === 0 ? 'N/A' : worstAccuracy + ' m',
      strong,
      moderate,
      weak,
      totalSignals
    };
  }, [trackingLogs]);

  if (trackingLogs.length === 0) return null;

  return (
    <div className="panel-card diagnostics-area" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        GPS Diagnostics Dashboard
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        <div className="metric-card" style={{ padding: '1rem', borderLeft: '4px solid var(--success-color)' }}>
          <span className="metric-label">Accepted</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{metrics.accepted}</div>
        </div>
        <div className="metric-card" style={{ padding: '1rem', borderLeft: '4px solid var(--danger-color)' }}>
          <span className="metric-label">Rejected</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{metrics.rejected}</div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Average</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{metrics.avgAccuracy}</div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Best</span>
          <div className="metric-value" style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}>{metrics.bestAccuracy}</div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Worst</span>
          <div className="metric-value" style={{ fontSize: '1.5rem', color: 'var(--warning-color)' }}>{metrics.worstAccuracy}</div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>Signal Quality Distribution</span>
          <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>{metrics.totalSignals} points</span>
        </h3>
        
        {metrics.totalSignals === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Not enough data to display distribution.</p>
        ) : (
          <div style={{ width: '100%', height: '24px', display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
            {metrics.strong > 0 && (
              <div style={{ width: `${(metrics.strong / metrics.totalSignals) * 100}%`, backgroundColor: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }} title={`Strong: ${metrics.strong}`}>
                {((metrics.strong / metrics.totalSignals) * 100).toFixed(0)}%
              </div>
            )}
            {metrics.moderate > 0 && (
              <div style={{ width: `${(metrics.moderate / metrics.totalSignals) * 100}%`, backgroundColor: 'var(--warning-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }} title={`Moderate: ${metrics.moderate}`}>
                {((metrics.moderate / metrics.totalSignals) * 100).toFixed(0)}%
              </div>
            )}
            {metrics.weak > 0 && (
              <div style={{ width: `${(metrics.weak / metrics.totalSignals) * 100}%`, backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }} title={`Weak: ${metrics.weak}`}>
                {((metrics.weak / metrics.totalSignals) * 100).toFixed(0)}%
              </div>
            )}
            {metrics.rejected > 0 && (
              <div style={{ width: `${(metrics.rejected / metrics.totalSignals) * 100}%`, backgroundColor: 'var(--danger-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }} title={`Rejected: ${metrics.rejected}`}>
                {((metrics.rejected / metrics.totalSignals) * 100).toFixed(0)}%
              </div>
            )}
          </div>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-secondary)', flexWrap: 'wrap', fontWeight: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></span>Strong (≤10m)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning-color)' }}></span>Moderate (≤20m)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F97316' }}></span>Weak (≤30m)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger-color)' }}></span>Rejected (&gt;30m)</div>
        </div>
      </div>
    </div>
  );
};
