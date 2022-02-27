export const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

// TODO: obviously this distance calculation is wrong. Figure what's the best 
//      way to calculate this, ideally without google API
//      maybe we can make it more accurate by also using the speed
export const distanceInKmBetweenEarthCoordinates = (loc1, loc2) => {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(loc2.lat-loc2.lat);
    var dLon = degreesToRadians(loc2.lng-loc1.lng);

    var lat1 = degreesToRadians(loc1.lat);
    var lat2 = degreesToRadians(loc2.lat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}