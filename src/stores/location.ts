import { Geolocation } from "@capacitor/geolocation";
import { derived, readable, writable, get } from "svelte/store";
import {log} from "../stores/log";

// TODO: Permissions handling and error handling
//      check this: https://enappd.com/blog/ionic-5-complete-guide-on-geolocation/141/

// TODO: We probably should move the distance calculation here as well,
//      possibly with a switch to turn distance tracking on/off

// DEBUG: note that the callback on the watchPosition gets fired twice 
//  once with the old location and then with the new. Check why.

const startLocWatch = (set) => {
    const geoWatchId = Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000,
    }, (loc_input, err) => { 
        // Handle errors?
        if(err) return;
        const loc = {lat: loc_input.coords.latitude, lng: loc_input.coords.longitude};
        const speed = loc_input.coords.speed;
        set({loc, speed, error: 0});
    });
    return geoWatchId;
}

// `loc_data.error`:
//      - `undefined` when if location not initialized,
//      - `0` if no error and the location is valis
//      - any 'true-ish' value for valid errors (not implemented)
export const loc_data = readable({
        loc: {lat: undefined, lng: undefined},
        speed: undefined,
        err: undefined,
    }, function start(set) {
        let watchId = startLocWatch(set); 
        return () => { watchId.then( id => Geolocation.clearWatch({ id }) )}
});



// export const travel_data = derived([ loc_data ], ( [$loc_data], set) => {
//     let last_loc = get(travel_data).end;
//     // NOTE: Assuming we need to initialize the object properly, so rather than
//     //          checking for `null`/`undefined` on the object, we check
//     //          one of the inner values
//     if(last_loc.lat === undefined) { // initialize
//         set({
//             start: $loc_data.loc,
//             end: $loc_data.loc,
//             dist: 0,
//         });
//     }
//     else {
//         let dp = distanceInKmBetweenEarthCoordinates($loc_data.loc, last_loc);
//         set({
//             start: get(travel_data).start,
//             end: $loc_data.loc,
//             dist: get(travel_data).dist + dp,
//         })
//     }

//     // NOTE: You would assume the return function is for cleanup/reset,
//     //      but it gets called when other stores change as well..
//     return () => {
//         console.log();
//     }
// }, {
//     start: {lat: undefined, lng: undefined},
//     end: {lat: undefined, lng: undefined},
//     dist: undefined
// });

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