import { create } from 'zustand';
import { getJourneys } from '../utils/storage';

export const useJourneyStore = create((set) => ({
  trackingActive: false,
  trackingPaused: false,
  currentPosition: null,
  routeCoordinates: [],
  totalDistance: 0,
  currentSpeed: 0,
  averageSpeed: 0,
  elapsedTime: 0,
  currentBearing: "N",
  signalStrength: "Unknown",
  trackingLogs: [],
  
  // Milestones
  achievedMilestones: [],
  
  // Replay State
  replayActive: false,
  replayPaused: false,
  replayIndex: 0,
  
  // Simulator State
  isDeveloperMode: false,
  simulationStatus: 'Waiting To Start',
  simulationMode: 'Square',
  simulationIndex: 0,
  simulationTotal: 0,
  
  // Initialize from LocalStorage
  savedJourneys: getJourneys(),

  setTrackingActive: (active) => set({ trackingActive: active }),
  updateState: (updates) => set((state) => ({ ...state, ...updates })),
  
  addLog: (logEntry) => set((state) => ({ 
    trackingLogs: [logEntry, ...state.trackingLogs] 
  })),
  
  resetTracking: () => set({ 
    trackingActive: false, 
    trackingPaused: false, 
    currentPosition: null, 
    routeCoordinates: [], 
    trackingLogs: [],
    signalStrength: "Unknown",
    totalDistance: 0,
    currentSpeed: 0,
    averageSpeed: 0,
    elapsedTime: 0,
    currentBearing: "N",
    achievedMilestones: [],
    replayActive: false,
    replayPaused: false,
    replayIndex: 0
  }),

  // Refresh from storage after save/delete operations
  refreshSavedJourneys: () => set({ savedJourneys: getJourneys() }),

  // Load a journey from storage into the active tracker
  loadJourney: (id) => set((state) => {
    const journey = state.savedJourneys.find(j => j.id === id);
    if (!journey) return state;
    
    return {
      trackingActive: false, // Ensure tracking is off when viewing history
      trackingPaused: false,
      currentPosition: journey.routeCoordinates[journey.routeCoordinates.length - 1] || null,
      routeCoordinates: journey.routeCoordinates || [],
      totalDistance: journey.totalDistance || 0,
      currentSpeed: 0, // Not moving when viewing history
      averageSpeed: journey.averageSpeed || 0,
      elapsedTime: journey.duration || 0,
      currentBearing: "N",
      signalStrength: "Unknown",
      trackingLogs: journey.trackingLogs || []
    };
  })
}));
