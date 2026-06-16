import React, { useState, useMemo } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';
import { deleteJourney, clearAllJourneys } from '../utils/storage';
import { exportJSON } from '../utils/exportJSON';
import { exportGPX } from '../utils/exportGPX';
import { exportCSV } from '../utils/exportCSV';

export const JourneyHistoryPanel = () => {
  const store = useJourneyStore();
  const { savedJourneys, trackingActive, trackingPaused, loadJourney, refreshSavedJourneys } = store;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Newest First');

  // Computed Summaries
  const totalJourneys = savedJourneys.length;
  const longestJourney = totalJourneys > 0 ? Math.max(...savedJourneys.map(j => j.totalDistance || 0)) : 0;
  const totalDistanceAll = savedJourneys.reduce((sum, j) => sum + (j.totalDistance || 0), 0);
  const avgDistance = totalJourneys > 0 ? totalDistanceAll / totalJourneys : 0;

  // Search & Sort
  const filteredAndSorted = useMemo(() => {
    let result = [...savedJourneys];

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(j => 
        (j.name && j.name.toLowerCase().includes(lowerSearch)) ||
        (new Date(j.createdAt).toLocaleDateString().includes(lowerSearch))
      );
    }

    switch (sortOption) {
      case 'Oldest First':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'Longest Distance':
        result.sort((a, b) => (b.totalDistance || 0) - (a.totalDistance || 0));
        break;
      case 'Shortest Distance':
        result.sort((a, b) => (a.totalDistance || 0) - (b.totalDistance || 0));
        break;
      case 'Newest First':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [savedJourneys, searchTerm, sortOption]);

  const handleLoad = (id) => {
    if (trackingActive && !trackingPaused) {
      alert("Please Pause or Stop the current active tracking session before loading a journey!");
      return;
    }
    loadJourney(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this journey?")) {
      deleteJourney(id);
      refreshSavedJourneys();
    }
  };

  const handleClearAll = () => {
    if (totalJourneys === 0) return;
    if (window.confirm("Are you sure you want to clear ALL saved journeys? This cannot be undone.")) {
      clearAllJourneys();
      refreshSavedJourneys();
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0s';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + 'h ' : ''}${mins > 0 ? mins + 'm ' : ''}${secs}s`;
  };

  return (
    <div className="panel-card history-area" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Journey History & Persistence
      </h2>
      
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Total Journeys</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{totalJourneys}</div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Longest Journey</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{longestJourney.toFixed(2)} <span className="metric-unit">km</span></div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Total Distance</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{totalDistanceAll.toFixed(2)} <span className="metric-unit">km</span></div>
        </div>
        <div className="metric-card" style={{ padding: '1rem' }}>
          <span className="metric-label">Avg. Distance</span>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{avgDistance.toFixed(2)} <span className="metric-unit">km</span></div>
        </div>
      </div>

      {/* Controls Area */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by name or date..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '1 1 200px', padding: '0.5rem 1rem', fontFamily: 'inherit', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
        />
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: '0.5rem 1rem', fontFamily: 'inherit', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Longest Distance</option>
          <option>Shortest Distance</option>
        </select>
        <button 
          className="btn btn-danger"
          onClick={handleClearAll}
          disabled={totalJourneys === 0}
        >
          Clear All
        </button>
      </div>

      {/* Table Data */}
      <div className="saas-table-container">
        {filteredAndSorted.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontWeight: 500 }}>No saved journeys yet.</p>
          </div>
        ) : (
          <table className="saas-table">
            <thead>
              <tr>
                <th>Journey Name</th>
                <th>Date</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Points</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map(journey => (
                <tr key={journey.id}>
                  <td style={{ fontWeight: 600 }}>{journey.name}</td>
                  <td>{new Date(journey.createdAt).toLocaleDateString()}</td>
                  <td>{(journey.totalDistance || 0).toFixed(2)} km</td>
                  <td>{formatTime(journey.duration)}</td>
                  <td>{journey.routeCoordinates ? journey.routeCoordinates.length : 0}</td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleLoad(journey.id)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      Load
                    </button>
                    
                    {/* Export Buttons */}
                    <button 
                      className="btn btn-secondary"
                      onClick={() => exportJSON(journey)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      title="Export as JSON"
                    >
                      JSON
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => exportGPX(journey)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      title="Export as GPX"
                    >
                      GPX
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => exportCSV(journey)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      title="Export as CSV"
                    >
                      CSV
                    </button>

                    <button 
                      className="btn btn-ghost"
                      onClick={() => handleDelete(journey.id)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--danger-color)' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
