# Viva Questions & Answers

This document contains 50 comprehensive technical questions designed for a B.Tech Semester Project Viva Examination covering React, State Management, Algorithms, and System Design.

## Category 1: React & Frontend Architecture

**1. What is React and why did you choose it for this project?**
React is a JavaScript library for building user interfaces using a component-based architecture. It was chosen for its virtual DOM efficiency, making it perfect for an application that requires rapid UI updates (like a ticking GPS timer and distance counter) without freezing the browser.

**2. What is the Virtual DOM?**
The Virtual DOM is a lightweight memory representation of the actual HTML DOM. When state changes (e.g., a new GPS point arrives), React updates the Virtual DOM first, compares it with the previous version (diffing), and only updates the specific parts of the real DOM that changed, ensuring high performance.

**3. Why did you use functional components instead of class components?**
Functional components, combined with React Hooks (like `useState` and `useEffect`), provide a cleaner, more concise syntax. They avoid the complexities of `this` binding and lifecycle methods, making the codebase easier to maintain.

**4. What does the `useEffect` hook do in your application?**
`useEffect` handles side effects. In this project, it is heavily used to manage the elapsed tracking timer (setting up and tearing down the `setInterval`) and applying the Dark Mode class to the document body when the theme state changes.

**5. What does the `useMemo` hook do?**
`useMemo` caches the result of an expensive calculation between renders. It is used in the `SpatialMapCanvas` to ensure the complex SVG path generation and coordinate scaling only recalculate when the coordinate array actually changes, not on every minor component re-render.

**6. Why is separating business logic from the UI important?**
Separation of concerns ensures that components remain "dumb" (focused only on presentation). Moving the GPS hardware calls and math calculations into the Zustand store makes the code modular, easier to test, and prevents UI components from becoming bloated.

**7. How do you handle error boundaries in React?**
Error boundaries are implemented via a class component (`ErrorBoundary`) wrapping the application. If a child component throws a JavaScript error, the boundary catches it and displays a fallback UI instead of crashing the entire browser tab.

**8. What are React Fragments (`<> ... </>`)?**
Fragments let you group a list of children without adding extra DOM nodes (like an unnecessary `<div>`). This is crucial when styling with CSS Grid or Flexbox where extra wrappers would break the layout.

**9. How is conditional rendering implemented in your app?**
By using ternary operators (`condition ? true : false`) and logical AND (`&&`). For instance, if the GPS array is empty, it conditionally renders an "Empty State" message instead of a blank map.

**10. What is Vite and why use it over Create React App (CRA)?**
Vite is a modern build tool that utilizes native ES modules for blazing fast Hot Module Replacement (HMR). It builds and serves the application much faster than Webpack-based CRA.

## Category 2: State Management (Zustand)

**11. What is Zustand?**
Zustand is a small, fast, and scalable bearbones state-management solution using simplified flux principles.

**12. Why choose Zustand over Redux?**
Redux requires significant boilerplate (actions, reducers, dispatchers, providers). Zustand achieves the same global state capabilities with a single hook, no context providers, and much less boilerplate, making it ideal for a specialized metrics tracking app.

**13. What is the difference between local state and global state?**
Local state (`useState`) is confined to a single component (e.g., the text inside a search bar). Global state (Zustand) is accessible across the entire application (e.g., the `totalDistance` needed by both the Odometer and the Journey History).

**14. How does Zustand prevent unnecessary re-renders?**
Components only subscribe to the specific state slice they need. If a component selects only `totalDistance`, it will not re-render if `trackingActive` changes, optimizing performance.

**15. Can you mutate Zustand state directly?**
No, Zustand state is immutable. You must use the provided `set` function to merge or replace state objects, ensuring React recognizes the reference change and triggers a re-render.

## Category 3: GPS & Geolocation API

**16. What is the HTML5 Geolocation API?**
It is a browser native API (`navigator.geolocation`) that allows web applications to access the device's physical location hardware (GPS, Wi-Fi positioning, IP routing) with user permission.

**17. What is the difference between `getCurrentPosition` and `watchPosition`?**
`getCurrentPosition` fetches the location exactly once. `watchPosition` registers a listener that continuously fires a callback every time the device's position changes, which is required for live tracking.

**18. What does `enableHighAccuracy: true` do?**
It forces the browser to bypass low-power Wi-Fi/IP location approximations and directly ping the device's physical GPS chip, providing maximum possible accuracy at the cost of battery life.

**19. What is GPS Drift?**
GPS Drift occurs when satellite signals bounce off buildings or are hindered by clouds, causing the reported location to randomly "jump" around even if the device is stationary.

**20. How did you solve GPS Drift in this project?**
By implementing an Accuracy Filter. The payload provides an `accuracy` metric (in meters). Any coordinate with an accuracy radius greater than 30 meters is discarded by the engine, preventing false distance accumulation.

**21. What happens if the user denies location permissions?**
The API throws a `GeolocationPositionError`. The application catches this error, updates the state, and gracefully displays a UI alert instructing the user to enable permissions.

## Category 4: Algorithms & Math

**22. Why can't we use the standard Pythagorean theorem for GPS distance?**
The Pythagorean theorem (`a² + b² = c²`) operates on a flat 2D Cartesian plane. Because the Earth is a sphere, plotting points linearly results in massive distortion and inaccurate distance over large gaps.

**23. What is the Haversine Formula?**
An equation important in navigation, giving great-circle distances between two points on a sphere from their longitudes and latitudes.

**24. What is the radius of the Earth used in your math?**
6371 kilometers.

**25. How do you convert degrees to radians in JavaScript?**
By multiplying the degree value by `(Math.PI / 180)`. This is required because JavaScript's `Math.sin` and `Math.cos` functions expect radians, not degrees.

**26. What does a Bearing calculation represent?**
Bearing represents the compass angle (from 0 to 360 degrees) relative to True North between the previous point and the current point, indicating travel direction.

**27. How did you convert the Bearing angle to cardinal directions?**
By mapping the 360-degree circle into 8 slices (45 degrees each) corresponding to N, NE, E, SE, S, SW, W, NW.

**28. How is speed calculated without using the GPS hardware speed property?**
By taking the distance between two points (calculated via Haversine) and dividing it by the time elapsed between their timestamps (`Velocity = Distance / Time`).

## Category 5: Architecture & Features

**29. Why did you choose an entirely offline architecture?**
To demonstrate that heavy geospatial processing can be handled on the client-side, eliminating cloud server costs, removing API rate limits, and ensuring 100% user privacy (location data never leaves the device).

**30. How is LocalStorage utilized?**
LocalStorage acts as a synchronous, persistent NoSQL key-value database. When a journey finishes, the object is serialized using `JSON.stringify` and saved, allowing it to be retrieved when the browser reloads.

**31. What is the limitation of LocalStorage?**
It is synchronous (blocking the main thread) and generally limited to 5MB of string data per domain, making it unsuitable for massive, day-long tracking logs.

**32. What is a GPX file?**
GPX (GPS Exchange Format) is an XML schema designed as a common GPS data format. It allows the exported data to be ingested by professional tools like Google Earth, Strava, and Garmin.

**33. How do you generate a downloadable file in the browser without a backend server?**
By creating a `Blob` (Binary Large Object) containing the formatted string data, generating a temporary `URL.createObjectURL(blob)`, assigning it to a hidden anchor `<a>` tag, and programmatically clicking it.

**34. What is the purpose of the Developer Simulation Mode?**
It allows developers to test the math engine, UI render loops, and state management without having to physically walk around outside. It proves the math engine works flawlessly regardless of data source.

**35. How does the simulator generate a circular route?**
By utilizing trigonometry (`Math.cos` and `Math.sin`) combined with an incrementing angle to step through points on an orbital radius originating from a center coordinate.

**36. Why did you use SVG for the map instead of Google Maps API?**
To fulfill the "no external dependencies" objective. SVG (Scalable Vector Graphics) allows mathematical drawing of paths in the DOM perfectly suited for rendering raw GPS arrays.

**37. How do you fit real-world GPS coordinates into a fixed SVG pixel box?**
By iterating through the coordinates to find the min/max latitude and longitude (the bounding box), and then using a linear interpolation formula to map those bounds dynamically to the 0-100% width/height of the SVG viewport.

**38. What is the Route Replay feature?**
It acts as a playback engine. It takes a saved historical journey and iterates through the coordinates sequentially via a `setInterval`, injecting them into the map one-by-one to animate the historical movement.

**39. How does Dark Mode work in your application?**
A React state toggles a `.dark-mode` CSS class on the `document.body`. The CSS architecture utilizes CSS Variables (`--bg-color`, `--text-primary`), which dynamically shift colors based on the presence of that body class.

**40. What is accessibility (a11y) and how did you implement it?**
Accessibility ensures the app is usable by disabled users (e.g., using screen readers). Implemented by adding `aria-labels` to icon buttons and `tabIndex` attributes to ensure everything can be navigated via keyboard.

**41. Why did you purge `window.alert()` in favor of custom UI state?**
`window.alert()` is blocking and halts the entire JavaScript execution thread. In a real-time tracking app, halting the thread means missing GPS ticks.

**42. How does the CSV export work?**
It maps over the coordinate array, mapping each point to a comma-separated string `lat,lon,timestamp\n`, which is easily readable by Microsoft Excel or Python Pandas.

**43. What is the "System Online" badge indicative of?**
It is a UI indicator that the component tree has mounted correctly and the Geolocation API is available on the `window.navigator` object.

**44. How does the app handle components that process huge lists, like the Telemetry Log?**
By utilizing `React.memo` on the table row components. This ensures only the newly added rows render, preventing the entire 10,000-row table from re-rendering every second.

**45. What is the `package.json` file?**
It is the manifest file for the Node.js project. It tracks metadata, installed NPM dependencies (like React and Zustand), and executable scripts (like `npm run dev`).

**46. What does CSS Flexbox solve that traditional block layouts couldn't?**
It solves complex alignment problems, allowing elements to perfectly distribute space, center vertically/horizontally, and adapt responsively in 1-dimensional layouts without floating hacks.

**47. What does CSS Grid solve?**
It allows for true 2-dimensional layout mapping (rows and columns). The app uses it to flawlessly structure the dashboard panels regardless of screen width.

**48. Why is the Landing Page implemented via simple state rather than React Router?**
Because the application consists of only two actual views (Landing Page and Dashboard). A heavy routing library was unnecessary overhead for a simple binary state toggle (`showDashboard`).

**49. What would you change to make this application scale to handle millions of tracking points?**
I would implement Web Workers to push the Haversine computation off the main thread, and replace LocalStorage with IndexedDB.

**50. Summarize the most challenging technical hurdle of this project.**
Balancing the frequency of GPS ticks with React's render cycle. If not managed carefully with `useMemo` and accurate state slices, tracking for 2 hours would crash the browser due to infinite re-renders.
