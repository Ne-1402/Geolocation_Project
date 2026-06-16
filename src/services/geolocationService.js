import { useJourneyStore } from '../store/useJourneyStore';
import { calculateDistance } from '../utils/haversine';
import { calculateBearing } from '../utils/bearing';

let watchId = null;
let timerInterval = null;
export let lastValidTime = null; // Exported for simulator to use/reset

export const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const store = useJourneyStore.getState();
    if (store.trackingActive && !store.trackingPaused) {
      const newTime = store.elapsedTime + 1;
      const hours = newTime / 3600;
      const avgSpeed = hours > 0 ? (store.totalDistance / hours) : 0;
      store.updateState({ 
        elapsedTime: newTime,
        averageSpeed: avgSpeed
      });
    }
  }, 1000);
};

export const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

export const processGPSPosition = (position) => {
  const { latitude, longitude, accuracy, altitude } = position.coords;
  const currentStore = useJourneyStore.getState();
  
  if (!currentStore.trackingActive || currentStore.trackingPaused) return;

  const newPos = { lat: latitude, lng: longitude };
  const currentTime = Date.now();
  
  let signal = 'Unknown';
  if (accuracy <= 10) signal = 'Strong';
  else if (accuracy <= 20) signal = 'Moderate';
  else if (accuracy <= 30) signal = 'Weak';
  else signal = 'Rejected';

  if (accuracy <= 30) {
    let segmentDistance = 0;
    let speed = 0;
    let direction = currentStore.currentBearing;
    
    if (currentStore.currentPosition) {
      segmentDistance = calculateDistance(currentStore.currentPosition, newPos);
      if (segmentDistance > 0) {
        const timeDiffHours = (currentTime - (lastValidTime || currentTime)) / (1000 * 3600);
        if (timeDiffHours > 0) {
          speed = segmentDistance / timeDiffHours;
        }
        direction = calculateBearing(currentStore.currentPosition, newPos);
      }
    }
    
    if (speed > 250) {
       return; // Reject unrealistic speeds
    }

    const newTotalDistance = currentStore.totalDistance + segmentDistance;
    
    // Check Milestones
    const MILESTONES = [1, 5, 10, 25];
    const newMilestones = [...currentStore.achievedMilestones];
    MILESTONES.forEach(m => {
      if (newTotalDistance >= m && !newMilestones.includes(m)) {
        newMilestones.push(m);
      }
    });

    currentStore.updateState({ 
      currentPosition: newPos,
      routeCoordinates: [...currentStore.routeCoordinates, newPos],
      signalStrength: signal,
      totalDistance: newTotalDistance,
      currentSpeed: speed,
      currentBearing: direction,
      achievedMilestones: newMilestones
    });
    
    lastValidTime = currentTime;

    currentStore.addLog({
      timestamp: new Date().toLocaleTimeString(),
      latitude: latitude.toFixed(5),
      longitude: longitude.toFixed(5),
      altitude: altitude ? altitude.toFixed(2) : 'N/A',
      accuracy: Math.round(accuracy),
      segmentDistance: segmentDistance.toFixed(4),
      currentSpeed: speed.toFixed(2),
      direction: direction,
      message: `Coordinate Accepted`
    });
  } else {
    currentStore.updateState({ signalStrength: signal });
    currentStore.addLog({
      timestamp: new Date().toLocaleTimeString(),
      latitude: latitude.toFixed(5),
      longitude: longitude.toFixed(5),
      altitude: altitude ? altitude.toFixed(2) : 'N/A',
      accuracy: Math.round(accuracy),
      message: `Coordinate Rejected (Accuracy > 30m)`
    });
  }
};

export const startGPS = () => {
  const store = useJourneyStore.getState();
  if (store.trackingActive && !store.trackingPaused) return;

  if (store.isDeveloperMode) {
    alert("Disable Developer Mode to start real GPS tracking.");
    return;
  }

  store.updateState({ trackingActive: true, trackingPaused: false });
  store.addLog({
    timestamp: new Date().toLocaleTimeString(),
    message: 'GPS Tracking Engine Started.'
  });

  startTimer();

  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }

  if (!("geolocation" in navigator)) {
    store.addLog({
      timestamp: new Date().toLocaleTimeString(),
      message: 'Error: Geolocation is not supported by this browser.'
    });
    return;
  }

  lastValidTime = Date.now();

  watchId = navigator.geolocation.watchPosition(
    processGPSPosition,
    (error) => {
      const currentStore = useJourneyStore.getState();
      currentStore.addLog({
        timestamp: new Date().toLocaleTimeString(),
        message: `GPS Error: ${error.message}`
      });
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    }
  );
};

export const pauseGPS = () => {
  const store = useJourneyStore.getState();
  if (!store.trackingActive || store.trackingPaused) return;
  
  if (store.isDeveloperMode) return; // Simulation panel handles simulator pausing

  store.updateState({ trackingPaused: true });
  store.addLog({
    timestamp: new Date().toLocaleTimeString(),
    message: 'GPS Tracking Paused.'
  });
};

export const resumeGPS = () => {
  const store = useJourneyStore.getState();
  if (!store.trackingActive || !store.trackingPaused) return;
  
  if (store.isDeveloperMode) return;

  lastValidTime = Date.now(); 
  
  store.updateState({ trackingPaused: false });
  store.addLog({
    timestamp: new Date().toLocaleTimeString(),
    message: 'GPS Tracking Resumed.'
  });
};

export const resetGPS = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  stopTimer();
  lastValidTime = null;
  
  const store = useJourneyStore.getState();
  store.resetTracking();
  store.updateState({
    elapsedTime: 0,
    averageSpeed: 0,
    currentSpeed: 0,
    totalDistance: 0,
    currentBearing: "N",
    signalStrength: "Unknown"
  });
  
  store.addLog({
    timestamp: new Date().toLocaleTimeString(),
    message: 'GPS Tracking Reset.'
  });
};
