# Architecture Documentation

This document outlines the technical architecture of the Geolocation Travel Distance Tracking Playground.

## 1. Component Architecture
The application is structured using a centralized layout (App.jsx) that delegates responsibilities to isolated feature components.

```text
[ App Shell ] 
   ├── LandingPage (Presentation)
   ├── OdometerScoreboard (Read-Only Metrics)
   ├── SpatialMapCanvas (Visualization)
   ├── Control Panels (Mutators)
   │    ├── DashboardControls
   │    ├── SimulationControlPanel
   │    └── RouteReplayPanel
   └── Data & History (Logs/Storage)
        ├── DiagnosticsDashboard
        ├── JourneyTelemetryLog
        └── JourneyHistoryPanel
```
*Design Pattern*: Presentational & Container model. The UI components are purely presentational and rely on Zustand for business logic and state ingestion.

## 2. State Flow (Zustand)
The application avoids React Context and Redux in favor of Zustand, which allows components to bind to specific state slices without triggering global re-renders.

```text
[ UI Components ] ---(actions/dispatch)---> [ Zustand Store (useJourneyStore) ]
                                                   |
[ UI Components ] <-------(reactivity)-------------+
```
Store properties include:
- `currentPosition`
- `routeCoordinates` (Array)
- `totalDistance`
- `trackingActive` / `trackingPaused`

## 3. Data Flow
The unidirectional data flow ensures that the UI always represents the absolute truth of the mathematical engine.

1. **Input**: `navigator.geolocation` fires a `PositionEvent`.
2. **Action**: `useJourneyStore.addCoordinate(payload)` is invoked.
3. **Validation**: Check if `accuracy <= 30m`.
4. **Mutation**: Calculate Haversine -> Update `totalDistance` -> Append coordinate.
5. **Output**: React re-renders `OdometerScoreboard` and `SpatialMapCanvas`.

## 4. Tracking Pipeline
The GPS Tracking Engine follows a strict sequence:

```text
+-----------------------+
| Hardware Sensor (GPS) |
+-----------+-----------+
            |
            v
+-----------------------+      No      +-----------------------+
| Accuracy Filter (30m) | -----------> | Log as Rejected Point |
+-----------+-----------+              +-----------------------+
            | Yes
            v
+-----------------------+
|  Haversine Function   | ---> Computes Δ Distance from prev point
+-----------+-----------+
            |
            v
+-----------------------+
|   Bearing / Speed     | ---> Computes Vector & Velocity
+-----------+-----------+
            |
            v
+-----------------------+
| State Update & Render |
+-----------------------+
```

## 5. Export Pipeline
To ensure offline compatibility, data export occurs purely in the browser memory using the `Blob` API.

1. **Trigger**: User clicks "Export GPX".
2. **Serialization**: The utility script maps over `journey.routeCoordinates`.
3. **Format**: It builds an XML string matching the GPX 1.1 schema (`<trkpt lat="..." lon="...">`).
4. **Blob Generation**: `new Blob([xmlData], { type: 'application/gpx+xml' })`.
5. **Download**: Creates a hidden `<a>` tag, assigns an `URL.createObjectURL(blob)`, clicks it programmatically, and revokes the URL.

## 6. Simulation Pipeline
The Developer Simulator bypasses the browser's hardware API by injecting coordinates directly into the Zustand store.

1. **Selection**: User selects 'Square Route'.
2. **Generation**: An interval (`setInterval`) fires every 1000ms.
3. **Math Engine**: Trigonometry calculates the next theoretical lat/lng step based on a hardcoded bearing.
4. **Injection**: The theoretical point is sent to `addCoordinate()` exactly as if it came from the physical hardware.
5. **Result**: The core logic is tested identically without physical movement.
