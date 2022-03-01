<script>
    import { loc_data } from "../stores/location";
    import { distanceInKmBetweenEarthCoordinates } from '../lib/trip'
    import { get } from "svelte/store"

    // TODO: HIGHPRIORIY
    // Navigating away resets the trip meter. maybe we need to move more of this to a store!
    
    // TODO: Pause resume not implemented. Probably need to change stuff in 
    //      location store to implement that

    let rate_km = 50.;
    let rate_min = 10;

    let startTime;

    let fare = 0;
    let distance = 0;
    let last_loc = {lat: undefined, lng: undefined};
    let speed = 0;

    let riding = false;
    let paused = false;

    let travelStoreUnsub = null;

    const updateLocation = (location) => {
        if(last_loc.lat === undefined) {
            distance = 0;
        }
        else {
            let dp = distanceInKmBetweenEarthCoordinates(location.loc, last_loc);
            distance += dp;
        }
    
        last_loc = location.loc;
        speed = location.speed;
        //return(distance + dp);
    }
    const startTrip = () => {
        riding = true;
        distance = 0;
        startTime = new Date();

        travelStoreUnsub = loc_data.subscribe( val => updateLocation(val));

        //distance = updateDistance($loc_data.loc);

        // travelStoreUnsub = travel_data.subscribe( val => { distance = val.dist });
        console.log('subscribed')
    }

    const stopTrip = () => {
        riding = false;
        if(travelStoreUnsub) travelStoreUnsub();
        last_loc = {lat: undefined, lng: undefined};
        console.log('unsubscribed')
    }


    $: fare = distance * rate_km;
    

</script>

<div class="flex justify-center">
<div class="p-4 shadow-md w-max flex-column space-y-5">
    <div class="p-4 shadow-md flex space-x-5" >
        <p class="p-4 w-36 shadow-sm text-right">{rate_km} Rs./km</p>
        <p class="p-4 w-36 shadow-sm text-right">{rate_min} Rs./min</p>
    </div>
    <div class="p-8 shadow-md flex justify-center">
        Fare: {fare.toLocaleString(undefined, {
                    style:"currency",
                    currency:"LKR",
                    currencyDisplay: "narrowSymbol"
                }) }
    </div>
    <div class="p-4 shadow-md flex flex-row justify-content-center space-x-5">
        <div class="p-4 w-36 shadow-sm text-center">
            <p>{distance.toLocaleString(undefined, {
                maximumFractionDigits: 1,
                maximumSignificantDigits: 5
                })} km</p>
            <p>Distance</p>
        </div>
        <div class="p-4 w-36 shadow-sm text-center">
            <p>{speed} km/hr</p>
            <p>speed</p>
        </div>
    </div>
    <div class="p-8 shadow-md justify-center flex flex-row space-x-5">
        {#if riding}
            <button class="btn btn-error" on:click="{stopTrip}">Stop</button>
            {#if paused}
                <button class="btn btn-success btn-disabled" on:click="{ () => paused = false }">
                    Resume</button>
            {:else}
                <button class="btn btn-warning btn-disabled" on:click="{ () => paused = true }">
                    Pause</button>
            {/if}
        {:else}
            <button class="btn btn-success" on:click="{startTrip}">Start</button>
        {/if}
    </div>
</div>
</div>