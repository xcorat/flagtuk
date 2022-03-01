<script lang='ts'>

    /*
     + 1. Open with a map view,
       2. Origin, destination fields, with edit buttons
       3. two main buttons, Flag ride, Request Trip?
     * 
    */

    // DEBUG: not sure why we need to pick the location twice for the marker to appear
    //   Bleh! fix later! maybe related to ``ERR_BLOCKED_BY_CLIENT

    import {onMount} from 'svelte';
    import { loc_data } from '../stores/location';

    export let gApiReady = false;//google??.maps? true: false;
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;

    // Google map object and the container
    let mapContainer;
    let map;

    // We need to keep track of the first click on the location input
    let loc = {lat: 51.5, lng: -0.13};
    // TODO: Store the location somewhere for next app open?
    let startLoc = { loc, name: "Start", filled: false };
    let endLoc = { loc, name: "Destination", filled: false }

    let locMkr; // Marker for the current location
    let addrMkr0; // Marker for start location
    let addrMkr1; // Destination marker
    let options = { zoom: 15, center: loc, }; // google map options

    // Keep track whether the location is being updated through the map
    let pickingLoc = { isPicking: false, targetName: null };

    const initializeGapi = async () => {
        gApiReady = true;
        map = new google.maps.Map(mapContainer, options);   
    }

    // TODO: pretty bad way to do this, just fix later
    const setLoc = () => {
        if(pickingLoc.targetName == "Start") setStartLoc();
        else if(pickingLoc.targetName == "Destination") setDestLoc();
    }

    const setStartLoc = () => {
        let pickedLoc = map.getCenter();
        console.log(pickedLoc)
        startLoc = { loc: pickedLoc, name: 'unknown location', filled: true };
        // probably need a callback to update the start location if we are 
        //  making this marker draggable
        pickingLoc.isPicking = false;

        if(addrMkr0)
            addrMkr0.setPosition(pickedLoc);
        else
            addrMkr0 = new google.maps.Marker({ pickedLoc, map, draggable: false })
    }

    const setDestLoc = () => {
        let pickedLoc = map.getCenter();
        console.log(pickedLoc)
        endLoc = { loc: pickedLoc, name: 'unknown location', filled: true };
        // probably need a callback to update the start location if we are 
        //  making this marker draggable
        pickingLoc.isPicking = false;

        if(addrMkr1)
            addrMkr1.setPosition(pickedLoc);
        else
            addrMkr1 = new google.maps.Marker({ pickedLoc, map, draggable: false })
    }

    const updateLoc = (val) => {
        // Make sure the location is valid
        if(val.error !== 0) return;
        loc = val.loc; 
        console.log(locMkr)
        if(locMkr)
            locMkr.setPosition(loc);
        else
            locMkr = new google.maps.Marker({ loc, map, draggable: false })
    }

    onMount( async () => {
        // DEBUG: This checks if google maps api is available. This should have been handled by the callback,
        //  but is not for some reason. Find out why!
        // @ts-ignore
        if(google && google.maps){
            initializeGapi();
        }

        // TODO: what happen when the page is navigated away? does this get destroyed?
        loc_data.subscribe(updateLoc);
    })  
</script>

<svelte:head>
    <script defer async
    src="https://maps.googleapis.com/maps/api/js?key={googleApiKey}" on:load={initializeGapi}></script>
</svelte:head>

<div class="flex-col">
    <div class='map-view'>
        <div class="map map-pincenter" class:hide-pin={!pickingLoc.isPicking}
             class:hidden={!gApiReady} bind:this={mapContainer}/>
        { #if pickingLoc.isPicking}
        <!-- TODO: figure a way to draw the button over the map -->
        <div class="mt-1 w-full text-center">
            <button class="btn btn-primary" on:click="{setLoc}">
                Set {pickingLoc.targetName}
            </button>
        </div>
        { /if}
        <p class="text-center align-center" class:hidden={gApiReady}>
            Google map view is being loaded... </p>
    </div>
    <div class="p-8 flex flex-col space-y-5 shadow-md form-control text-center">
        { #if loc}  
            <div class="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0">
            <div class="input-group">
                <input class="input input-bordered input-primary w-full" placeholder="Start" bind:value="{startLoc.name}"> 
                <button class="btn btn-square" on:click="{() => {
                    pickingLoc = { isPicking: true, targetName: "Start"} } }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                        <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                    </svg>
                </button>
            </div>
            <div class="input-group ">
                <input class="input input-bordered input-primary w-full" placeholder="Destination" bind:value="{endLoc.name}">
                <button class="btn btn-square" class:btn-disabled="{!startLoc.filled}" on:click="{() => {
                    pickingLoc = { isPicking: true, targetName: "Destination"} } }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                        <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                    </svg>
                </button>
            </div>
            </div>
        <p>You are near ({loc.lat}, {loc.lng})</p>
        { :else}
            <p>Cannot acquire location!</p>
        {/if}
    </div>
    <div class="flex-row space-x-5 p-8 justify-center text-center">
        <button class="btn m-l-auto" class:btn-disabled="{!startLoc.filled}"> Flag Ride
        </button>
        <button class="btn m-l-auto" class:btn-disabled="{!endLoc.filled}"> Request Trip

        </button>
    </div>
</div>
    
<style>
    .map {
        position: relative;
        left: 0;
        width: 100%;
        height: 500px;
    }
    :global(.gm-style .gm-style-iw) {
        color: black;
        font-size: 1.125rem;
    }

    .map-pincenter:after {
        width: 22px;
        height: 40px;
        display: block;
        content: ' ';
        position: absolute;
        top: 50%; left: 50%;
        margin: -40px 0 0 -11px;
        background: url('https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png');
        background-size: 22px 40px; /* Since I used the HiDPI marker version this compensates for the 2x size */
        pointer-events: none; /* This disables clicks on the marker. Not fully supported by all major browsers, though */
    }

    .hide-pin:after {
        content: none !important;
        display: none !important;
    }

    .map-view > .hidden  {
        display: hidden;
    }

</style>