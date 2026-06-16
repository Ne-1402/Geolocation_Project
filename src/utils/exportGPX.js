export const exportGPX = (journey) => {
  try {
    if (!journey.routeCoordinates || journey.routeCoordinates.length === 0) {
      alert("No coordinates available to export to GPX.");
      return false;
    }

    const trkpts = journey.routeCoordinates.map(coord => {
      return `      <trkpt lat="${coord.lat}" lon="${coord.lng}"></trkpt>`;
    }).join('\n');

    const gpxString = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Geolocation Travel Playground">
  <trk>
    <name>${journey.name || 'Exported Journey'}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxString], { type: "application/gpx+xml" });
    const url = URL.createObjectURL(blob);
    
    const safeName = journey.name ? journey.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'journey';
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}-route.gpx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Failed to export GPX:", error);
    return false;
  }
};
