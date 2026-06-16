# Screenshot Guide

This document provides a checklist of the necessary screenshots required to complete the `README.md`, the Case Study Report, and the PPT Presentation. 

To take a clean screenshot:
- Use Mac: `Cmd + Shift + 4`
- Use Windows: `Win + Shift + S`
- Ensure your browser is maximized to show the full responsive layout.

## 1. Landing Page (`landing_page.png`)
**What to capture**: The top half of the application upon first loading.
**Elements to include**:
- The "GeoAnalytics Platform" Header.
- The "Track Every Journey" Hero text.
- The custom SVG Map Illustration in the hero section.
**Where to use it**: README.md, PPT Slide 8.

## 2. Dashboard Empty State (`dashboard_empty.png`)
**What to capture**: The main dashboard immediately after clicking "Launch Dashboard".
**Elements to include**:
- Ensure Dark Mode is toggled **ON**.
- The top Odometer showing `0.00`.
- The Spatial Canvas showing "Waiting for GPS...".
**Where to use it**: Case Study Report (Implementation Section).

## 3. Active Simulation/Tracking (`dashboard_active.png`)
**What to capture**: The dashboard while the Simulator is running.
**How to set up**:
1. Select "Square Route" in the Simulator.
2. Click Start. Wait 15 seconds.
**Elements to include**:
- The SVG map actively drawing a square.
- Metrics showing active Distance, Speed, and Bearing.
**Where to use it**: README.md, Case Study Report (Results Section).

## 4. Journey History & Export Panel (`history_exports.png`)
**What to capture**: The bottom half of the dashboard.
**How to set up**:
1. Stop a simulation and save it as "Test Route 1".
2. Scroll down to view the bottom grids.
**Elements to include**:
- The Telemetry Log Table showing the raw lat/long coordinates.
- The Journey History Table showing the saved route.
- The Load, JSON, GPX, CSV action buttons.
**Where to use it**: README.md, PPT Slide 8.

## 5. Diagnostics Dashboard (`diagnostics_panel.png`)
**What to capture**: A close-up of the Diagnostics panel.
**Elements to include**:
- The "Best/Worst/Average" accuracy metric cards.
- The "Signal Quality Distribution" CSS bar chart.
**Where to use it**: Case Study Report (Methodology Section), PPT Slide 8.

## 6. Route Replay Panel (`route_replay.png`)
**What to capture**: A close-up of the Replay panel while it is running.
**How to set up**:
1. Select a saved journey in the Replay Panel dropdown.
2. Hit Play at 2x speed.
**Elements to include**:
- The Play/Pause controls.
- The "Replay Status" progress bar.
**Where to use it**: Case Study Report.

## Save Location
Save all captured images into a newly created `docs/images/` directory in your project root to ensure the relative markdown links in your README function correctly.
