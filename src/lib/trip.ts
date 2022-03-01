export const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

// TODO: obviously this distance calculation is wrong. Figure what's the best 
//      way to calculate this, ideally without google API
//      maybe we can make it more accurate by also using the speed
export const distanceInKmBetweenEarthCoordinates = (loc1, loc2) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(loc2.lat-loc2.lat);
    const dLon = degreesToRadians(loc2.lng-loc1.lng);

    const lat1 = degreesToRadians(loc1.lat);
    const lat2 = degreesToRadians(loc2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}