# Geolocation Travel Distance Tracking Playground

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![Zustand](https://img.shields.io/badge/State-Zustand-F1C40F.svg)

## 📖 Project Description

The **Geolocation Travel Distance Tracking Playground** is a comprehensive, browser-based geospatial analytics platform. Designed to function entirely offline without external map providers (like Google Maps or Mapbox), it leverages the HTML5 Geolocation API, Zustand for global state management, and the mathematical Haversine formula to track, measure, and analyze travel data in real time. 

The application transforms raw satellite coordinate data into an enterprise-grade SaaS dashboard, providing rich telemetry, travel history persistence, data export capabilities, and a dedicated Developer Simulation Mode.

## ✨ Core Features

* **Real-Time GPS Tracking**: High-accuracy `watchPosition` implementation.
* **Accuracy Filtering**: Rejects erroneous signals (e.g., >30m radius) to prevent route spiking.
* **Haversine Distance Engine**: Manual mathematical calculation of distance over the Earth's curvature.
* **Bearing & Direction Detection**: Computes compass orientation dynamically.
* **Route Visualization**: Offline SVG-based spatial canvas mapping movement without external APIs.
* **Journey Persistence**: Saves historical tracking sessions completely offline using LocalStorage.
* **Data Export Pipeline**: Download tracking logs as `JSON`, `GPX` (for GIS tools), and `CSV`.
* **Developer Simulator**: Generates synthetic movement (Square, Circular, Zig-Zag) for testing.
* **Route Replay Animation**: Playback historical journeys with adjustable multipliers (1x, 2x, 5x).
* **Premium SaaS UI**: Features dark mode, accessibility standards, and clean, metric-driven components.

---

## 📸 Screenshots

*(Placeholders for screenshots as per the Screenshot Guide)*

* **Landing Page**: `[Insert docs/images/landing_page.png]`
* **Main Dashboard**: `[Insert docs/images/dashboard_dark_mode.png]`
* **Map Visualization**: `[Insert docs/images/map_canvas.png]`
* **Export Panel**: `[Insert docs/images/history_exports.png]`

---

## 🛠 Technology Stack

* **Frontend Framework**: React JS (v18+)
* **State Management**: Zustand
* **Location Services**: Browser Native Geolocation API (`navigator.geolocation`)
* **Styling**: Vanilla CSS (CSS Grid, Flexbox, CSS Variables)
* **Storage**: Browser LocalStorage
* **Build Tool**: Vite

---

## 📂 Folder Structure

```text
geolocation-project/
├── public/                 # Static assets
├── src/
│   ├── components/         # React UI Components
│   │   ├── LandingPage.jsx
│   │   ├── SpatialMapCanvas.jsx
│   │   ├── OdometerScoreboard.jsx
│   │   └── ...
│   ├── store/              # Zustand State logic
│   │   └── useJourneyStore.js
│   ├── utils/              # Mathematical & Export Utilities
│   │   ├── haversine.js
│   │   ├── storage.js
│   │   └── export*.js
│   ├── App.jsx             # Main Application Shell
│   ├── main.jsx            # React Entry Point
│   └── index.css           # Global SaaS Design System
├── docs/                   # Academic & Architecture Documentation
├── package.json            # Project Metadata & Dependencies
└── vite.config.js          # Vite Configuration
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/geolocation-project.git
   cd geolocation-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:5173` in a modern web browser.

---

## 🧭 Usage Guide

1. **Landing Page**: Review the features and click "Launch Dashboard".
2. **Real-Time Tracking**: 
   - Click "Start Tracking" to begin reading GPS coordinates. Ensure your browser has location permissions granted.
   - Walk/Drive to see distance, speed, and mapping update in real time.
3. **Simulation Mode**:
   - If indoors or testing, navigate to the "Developer Simulator" panel.
   - Select a shape (Square, Circular) and click "Start Simulation".
4. **Export Data**:
   - Once a journey is completed/stopped, navigate to the Journey History panel.
   - Click JSON, GPX, or CSV to download the raw telemetry.

---

## 🔮 Future Enhancements

- **IndexedDB Migration**: Transition from LocalStorage to IndexedDB for unlimited journey storage capacity.
- **Elevation Tracking**: Incorporate Altitude data from the Geolocation API to compute 3D Haversine distances.
- **Web Workers**: Move the heavy Haversine aggregations off the main UI thread to prevent blocking on massive journeys.
- **PWA Integration**: Add a Service Worker and manifest file to allow users to install the tracker natively on iOS/Android.

---

## ✍️ Author & Academic Details

**Developed as a B.Tech Semester Project**  
Focus: Advanced Frontend Architecture, Mathematical Computation, & Browser APIs.

For detailed internal mechanics, see the [Architecture Documentation](docs/Architecture_Documentation.md) and the [Case Study Report](docs/Case_Study_Report.md).
