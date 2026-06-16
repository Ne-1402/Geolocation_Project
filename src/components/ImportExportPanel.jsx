import React, { useRef, useState } from 'react';
import { useJourneyStore } from '../store/useJourneyStore';
import { importJSON } from '../utils/importJSON';

export const ImportExportPanel = () => {
  const fileInputRef = useRef(null);
  const { refreshSavedJourneys } = useJourneyStore();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus({ type: '', message: '' });

    try {
      const importedJourney = await importJSON(file);
      setStatus({ 
        type: 'success', 
        message: `Successfully imported: ${importedJourney.name}` 
      });
      refreshSavedJourneys();
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error 
      });
    } finally {
      setIsProcessing(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="panel-card import-export-area">
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        Data Import
      </h2>
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Upload a previously exported JSON journey file to restore it into your local history.
        </p>
        
        <input 
          type="file" 
          accept=".json,application/json" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            {isProcessing ? 'Processing...' : 'Select JSON File to Import'}
          </button>
        </div>

        {status.message && (
          <div style={{ 
            padding: '1rem', 
            borderRadius: '6px', 
            backgroundColor: status.type === 'success' ? '#ECFDF5' : '#FEF2F2',
            color: status.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)',
            border: `1px solid ${status.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 500
          }}>
            {status.type === 'success' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            )}
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};
