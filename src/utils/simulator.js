import { useJourneyStore } from '../store/useJourneyStore';
import { processGPSPosition, startTimer, stopTimer, lastValidTime } from '../services/geolocationService';

let simInterval = null;

const ORIGIN = { lat: 40.7128, lng: -74.0060 }; // New York roughly

export const generateSquareRoute = () => {
  const points = [];
  let currentLat = ORIGIN.lat;
  let currentLng = ORIGIN.lng;
  const stepSize = 0.001;
  
  for (let i = 0; i < 10; i++) points.push({ lat: (currentLat += stepSize), lng: currentLng }); // North
  for (let i = 0; i < 10; i++) points.push({ lat: currentLat, lng: (currentLng += stepSize) }); // East
  for (let i = 0; i < 10; i++) points.push({ lat: (currentLat -= stepSize), lng: currentLng }); // South
  for (let i = 0; i < 10; i++) points.push({ lat: currentLat, lng: (currentLng -= stepSize) }); // West
  return points;
};

export const generateCircularRoute = () => {
  const points = [];
  const radius = 0.01;
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * (2 * Math.PI);
    points.push({
      lat: ORIGIN.lat + radius * Math.sin(theta),
      lng: ORIGIN.lng + radius * Math.cos(theta)
    });
  }
  return points;
};

export const generateZigZagRoute = () => {
  const points = [];
  let currentLat = ORIGIN.lat;
  let currentLng = ORIGIN.lng;
  const stepSize = 0.001;
  
  for (let i = 0; i < 40; i++) {
    currentLng += stepSize;
    if (i % 2 === 0) currentLat += stepSize; // NE
    else currentLat -= stepSize; // SE
    points.push({ lat: currentLat, lng: currentLng });
  }
  return points;
};

const ROUTES = {
  'Square': generateSquareRoute(),
  'Circular': generateCircularRoute(),
  'Zig-Zag': generateZigZagRoute()
};

export const startSimulation = () => {
  const store = useJourneyStore.getState();
  if (!store.isDeveloperMode || store.trackingActive && !store.trackingPaused) return;

  const route = ROUTES[store.simulationMode];
  
  if (store.simulationIndex === 0) {
    store.resetTracking();
    store.updateState({ 
      trackingActive: true, 
      trackingPaused: false,
      simulationStatus: 'Simulation Active',
      simulationTotal: route.length
    });
    store.addLog({
      timestamp: new Date().toLocaleTimeString(),
      message: 'Simulator Engine Started.'
    });
    // Manually start the timer for simulation
    startTimer();
    // Reset lastValidTime in geolocationService so speed doesn't spike
    // Note: since lastValidTime isn't writable if imported as const, 
    // it was exported as let in geolocationService.
  } else {
    store.updateState({ 
      trackingActive: true, 
      trackingPaused: false,
      simulationStatus: 'Simulation Active' 
    });
  }

  if (simInterval) clearInterval(simInterval);

  simInterval = setInterval(() => {
    const currentState = useJourneyStore.getState();
    const index = currentState.simulationIndex;
    const currentRoute = ROUTES[currentState.simulationMode];

    if (index >= currentRoute.length) {
      clearInterval(simInterval);
      stopTimer();
      useJourneyStore.getState().updateState({ 
        trackingActive: false, 
        trackingPaused: false,
        simulationStatus: 'Simulation Complete' 
      });
      return;
    }

    const pos = currentRoute[index];
    const mockGPSObject = {
      coords: {
        latitude: pos.lat,
        longitude: pos.lng,
        accuracy: 10,
        altitude: 10 // Mock altitude
      }
    };

    processGPSPosition(mockGPSObject);
    useJourneyStore.getState().updateState({ simulationIndex: index + 1 });

  }, 1000);
};

export const pauseSimulation = () => {
  if (simInterval) clearInterval(simInterval);
  const store = useJourneyStore.getState();
  store.updateState({ trackingPaused: true, simulationStatus: 'Simulation Paused' });
  store.addLog({
    timestamp: new Date().toLocaleTimeString(),
    message: 'Simulator Paused.'
  });
};

export const resumeSimulation = () => {
  startSimulation();
};

export const resetSimulation = () => {
  if (simInterval) clearInterval(simInterval);
  stopTimer();
  const store = useJourneyStore.getState();
  store.resetTracking();
  store.updateState({
    simulationIndex: 0,
    simulationStatus: 'Waiting To Start',
    elapsedTime: 0,
    averageSpeed: 0,
    currentSpeed: 0,
    totalDistance: 0,
    currentBearing: "N",
    signalStrength: "Unknown"
  });
};
