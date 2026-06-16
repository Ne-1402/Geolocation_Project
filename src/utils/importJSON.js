import { saveJourney } from './storage';

export const importJSON = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided.");
      return;
    }

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      reject("Invalid file type. Please upload a JSON file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const data = JSON.parse(content);

        // Validation Schema
        if (!data.name || typeof data.name !== 'string') {
          reject("Validation Error: Missing or invalid journey 'name'.");
          return;
        }
        if (!data.createdAt) {
          reject("Validation Error: Missing 'createdAt' timestamp.");
          return;
        }
        if (!Array.isArray(data.routeCoordinates) || data.routeCoordinates.length === 0) {
          reject("Validation Error: Missing or empty 'routeCoordinates'.");
          return;
        }

        // Successfully parsed and validated, let's inject it via storage
        // Note: saveJourney generates a NEW id and createdAt, 
        // to preserve original date, we'll manually prepend it to storage.
        const journeys = JSON.parse(localStorage.getItem('geolocation_journeys') || '[]');
        
        const importedJourney = {
          ...data,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // Ensure unique collision-free ID
          name: `${data.name} (Imported)`
        };

        journeys.unshift(importedJourney);
        localStorage.setItem('geolocation_journeys', JSON.stringify(journeys));
        
        resolve(importedJourney);

      } catch (error) {
        reject("Corrupted data: Failed to parse JSON. " + error.message);
      }
    };

    reader.onerror = () => {
      reject("Failed to read the file.");
    };

    reader.readAsText(file);
  });
};
