export const calculateDistance = (pointA, pointB) => {
  if (!pointA || !pointB || !pointA.lat || !pointA.lng || !pointB.lat || !pointB.lng) return 0;

  const toRad = (value) => (value * Math.PI) / 180;
  
  const R = 6371; // Earth radius in km
  
  const dLat = toRad(pointB.lat - pointA.lat);
  const dLon = toRad(pointB.lng - pointA.lng);
  
  const lat1 = toRad(pointA.lat);
  const lat2 = toRad(pointB.lat);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
            
  const c = 2 * Math.asin(Math.sqrt(a)); 
  
  return R * c; // Distance in km
};
