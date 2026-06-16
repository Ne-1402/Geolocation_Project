export const calculateBearing = (pointA, pointB) => {
  if (!pointA || !pointB || !pointA.lat || !pointA.lng || !pointB.lat || !pointB.lng) return "Unknown";

  const toRad = (value) => (value * Math.PI) / 180;
  const toDeg = (value) => (value * 180) / Math.PI;

  const lat1 = toRad(pointA.lat);
  const lat2 = toRad(pointB.lat);
  const dLon = toRad(pointB.lng - pointA.lng);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  const directions = [
    "North", "North-East", "East", "South-East", 
    "South", "South-West", "West", "North-West"
  ];
  
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
};
