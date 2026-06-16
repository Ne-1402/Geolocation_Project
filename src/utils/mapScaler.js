/**
 * Normalizes an array of coordinates to an SVG viewBox
 * @param {Array} points Array of objects with {lat, lng}
 * @param {number} width SVG width
 * @param {number} height SVG height
 * @param {number} padding Padding in pixels inside the SVG
 * @returns {Object} { scaledPoints, minLat, maxLat, minLng, maxLng }
 */
export const normalizeCoordinates = (points, width = 800, height = 400, padding = 20) => {
  if (!points || points.length === 0) {
    return { scaledPoints: [], minLat: null, maxLat: null, minLng: null, maxLng: null };
  }

  const lats = points.map(p => Number(p.lat));
  const lngs = points.map(p => Number(p.lng));

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;

  const drawableWidth = width - padding * 2;
  const drawableHeight = height - padding * 2;

  const scaledPoints = points.map(p => {
    let x, y;

    // Handle case where all points are exactly the same
    if (lngRange === 0) {
      x = width / 2;
    } else {
      x = ((Number(p.lng) - minLng) / lngRange) * drawableWidth + padding;
    }

    if (latRange === 0) {
      y = height / 2;
    } else {
      // Invert Y axis because SVG y=0 is at the top, but higher latitude is North (up)
      y = height - (((Number(p.lat) - minLat) / latRange) * drawableHeight + padding);
    }

    return { ...p, x, y };
  });

  return { scaledPoints, minLat, maxLat, minLng, maxLng };
};
