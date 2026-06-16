const STORAGE_KEY = 'geolocation_journeys';

export const getJourneys = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse journeys from LocalStorage:', error);
    return [];
  }
};

export const saveJourney = (journeyData) => {
  try {
    const journeys = getJourneys();
    const newJourney = {
      ...journeyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    journeys.unshift(newJourney); // Store newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
    return newJourney;
  } catch (error) {
    console.error('Failed to save journey to LocalStorage:', error);
    return null;
  }
};

export const updateJourney = (id, updates) => {
  try {
    const journeys = getJourneys();
    const index = journeys.findIndex(j => j.id === id);
    if (index !== -1) {
      journeys[index] = { ...journeys[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to update journey in LocalStorage:', error);
    return false;
  }
};

export const deleteJourney = (id) => {
  try {
    let journeys = getJourneys();
    journeys = journeys.filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
    return true;
  } catch (error) {
    console.error('Failed to delete journey from LocalStorage:', error);
    return false;
  }
};

export const clearAllJourneys = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear journeys from LocalStorage:', error);
    return false;
  }
};
