export const exportCSV = (journey) => {
  try {
    if (!journey.trackingLogs || journey.trackingLogs.length === 0) {
      alert("No logs available to export to CSV.");
      return false;
    }

    // Filter to only include actual coordinate logs
    const coordinateLogs = journey.trackingLogs.filter(log => log.message === 'Coordinate Accepted');

    if (coordinateLogs.length === 0) {
      alert("No accepted coordinates found in logs.");
      return false;
    }

    // Define CSV Headers
    const headers = ["Timestamp", "Latitude", "Longitude", "Altitude", "Accuracy", "SegmentDistance", "Speed", "Direction"];
    
    // Build rows
    const rows = coordinateLogs.map(log => {
      return [
        log.timestamp || '',
        log.latitude || '',
        log.longitude || '',
        log.altitude || 'N/A',
        log.accuracy || '',
        log.segmentDistance || '0',
        log.currentSpeed || '0',
        log.currentBearing || ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const safeName = journey.name ? journey.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'journey';
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}-data.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Failed to export CSV:", error);
    return false;
  }
};
