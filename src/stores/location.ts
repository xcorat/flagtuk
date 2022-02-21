import { Geolocation } from "@capacitor/geolocation";
import { derived, readable, writable, get } from "svelte/store";
import {log} from "../stores/log";

// TODO: Permissions handling and error handling
//      check this: https://enappd.com/blog/ionic-5-complete-guide-on-geolocation/141/

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// TODO: obviously this distance calculation is wrong. Figure what's the best 
//      way to calculate this, ideally without google API
//      maybe we can make it more accurate by also using the speed
function distanceInKmBetweenEarthCoordinates(loc1, loc2) {
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

const startLocWatch = (set) => {
    const geoWatchId = Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000,
    }, (loc_input, err) => { 
        let loc = {lat: loc_input.coords.latitude, lng: loc_input.coords.longitude};
        let speed = loc_input.coords.speed;
        set({loc, speed});
    });
    return geoWatchId;
}

export const loc_data = readable({
        loc: {lat: undefined, lng: undefined},
        speed: undefined,
    }, function start(set) {
        let watchId = startLocWatch(set); 
        return () => { watchId.then( id => Geolocation.clearWatch({ id }) )}
});

export const travel_data = derived([ loc_data ], ( [$loc_data], set) => {
    let last_loc = get(travel_data).end;
    // NOTE: Assuming we need to initialize the object properly, so rather than
    //          checking for `null`/`undefined` on the object, we check
    //          one of the inner values
    if(last_loc.lat === undefined) { // initialize
        set({
            start: $loc_data.loc,
            end: $loc_data.loc,
            dist: 0,
        });
    }
    else {
        let dp = distanceInKmBetweenEarthCoordinates($loc_data.loc, last_loc);
        set({
            start: get(travel_data).start,
            end: $loc_data.loc,
            dist: get(travel_data).dist + dp,
        })
    }
}, {
    start: {lat: undefined, lng: undefined},
    end: {lat: undefined, lng: undefined},
    dist: undefined
});

// TODO: Not used. only here for reference, in case!
async function getCurrentPosition() {
    // dummy vars
    let log, loc;
    try {
        console.log("@getCurrentPosition");
        
        const res = await Geolocation.getCurrentPosition();

        let locationString = "(" + res.coords.latitude + ', ' + res.coords.longitude + ")" + 
                             "| speed = "  + res.coords.speed;
        log = [... log, locationString] ;

        loc = res;
    } catch (e) {
        console.log(e);
        loc = {
            coords: {
                latitude: "Couldn't get location data",
                longitude: "Couldn't get location data"
            }
        };
    }
    setTimeout(() => { getCurrentPosition(); }, 5000);
}