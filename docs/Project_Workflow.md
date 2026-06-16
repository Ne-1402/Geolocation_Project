# Project Workflow: Life Cycle of a Coordinate

This document outlines the detailed step-by-step workflow of how data travels through the Geolocation Travel Distance Tracking Playground from the user's device down to the final exported file.

## The Complete Pipeline

### 1. User Interaction (Initialization)
- **Action**: The user clicks the "Start Tracking" button on the Dashboard Controls.
- **System Response**: The UI fires the `startTracking()` function inside the Zustand store.
- **Hardware Request**: The browser invokes `navigator.geolocation.watchPosition()`. The operating system may prompt the user for explicit location permissions.

### 2. GPS Data Acquisition (The Tick)
- **Action**: The physical GPS chip in the device connects to positioning satellites and computes a geographic location.
- **Payload**: The API fires a callback returning a `GeolocationPosition` object containing `latitude`, `longitude`, `accuracy` (in meters), `speed`, `heading`, and a `timestamp`.

### 3. Validation & Accuracy Filtering (The Gatekeeper)
- **Action**: The Zustand store's `addCoordinate()` function receives the payload.
- **Evaluation**: The system checks `payload.coords.accuracy`. 
  - *If accuracy > 30 meters*: The point is deemed too noisy. It is rejected. The rejection is logged in the `trackingLogs` array for diagnostics, but no distance is calculated.
  - *If accuracy <= 30 meters*: The point is accepted and allowed into the math engine.

### 4. Distance & Bearing Engine (The Math)
- **Action**: The system retrieves the *previous* accepted coordinate from the state array.
- **Haversine**: The `calculateDistance(prev, current)` function is invoked, utilizing spherical trigonometry to measure the arc distance across the curvature of the Earth in kilometers.
- **Bearing**: The `calculateBearing(prev, current)` function determines the compass direction (e.g., North, South-East).
- **Speed**: The system divides the computed distance by the time elapsed between the two timestamps to compute real-time velocity (`km/h`).

### 5. Metrics Engine & State Update
- **Action**: The computed metrics are aggregated.
  - `totalDistance` = `totalDistance` + `newDistance`
  - `routeCoordinates`.push(newCoordinateObject)
- **Reactivity**: Zustand updates the internal state. Because React components are subscribed to these specific state slices, the UI is triggered to re-render.

### 6. Visualization
- **Action**: The `OdometerScoreboard` updates the numbers seamlessly.
- **Action**: The `SpatialMapCanvas` detects a new point in the array.
- **Mapping**: It calculates a dynamic bounding box based on the min/max latitudes of the entire array, scales the points to fit the SVG viewport, and draws an animated `<path>` line connecting the previous point to the new point.

### 7. Persistence (End of Journey)
- **Action**: The user clicks "Stop Tracking".
- **Serialization**: The user is prompted to name the journey. The entire session data (Metrics, Coordinates, Timestamps) is bundled into a single JSON object.
- **Storage**: The object is parsed via `JSON.stringify()` and pushed into the browser's `LocalStorage` database, ensuring it survives browser reloads.

### 8. Export System
- **Action**: The user navigates to the Journey History Panel and clicks "GPX".
- **Parsing**: The Export Engine translates the JSON array into an XML-compliant `.gpx` syntax.
- **Blob Creation**: The browser generates a Blob file in memory.
- **Download**: A synthetic click event downloads the GPX file directly to the user's physical hard drive, ready to be uploaded to Strava, Google Earth, or GIS mapping software.
