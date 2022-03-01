<script>
    // TODO: Map lacale right now is dependent on the client location,
    //      We probably want centralized locale settings instead.

    import {onMount} from 'svelte';
import { subscribe } from 'svelte/internal';
    import { loc_data } from '../stores/location'

    let container;
    let map;

    // TODO: Store the location somewhere for next app open?
    export let startLoc;
    export let endLoc;
    export let pickedLoc;
    export let updatingLoc;

    let updatingLoc1 = false;
    let loc = {lat: 6.82, lng: 80.983};
    let locMkr; // Marker for the current location
    let addrMkr0; // Marker for start location
    let addrMkr1; // Destination marker

    let options = { zoom: 15, center: loc, };


    // TODO sanitize options and add them
    const addAddrMkr = (map, position, options) => {
        if(!map) return;

        if(addrMkr0) {
            addrMkr0.setPosition(position);
        }
        else {
            addrMkr0 = new google.maps.Marker({ position, map, draggable: true })
        }
        console.log("setmkr", addrMkr0)
    }

    const updateLoc = (val) => {
        // Make sure the location is valid
        if(val.error !== 0) return;
        loc = val.loc; 
        if(locMkr)
            locMkr.setPosition(loc);
        else
            locMkr = new google.maps.Marker({ loc, map, draggable: false })

        // set the location from the center if are updating a location
        if(updatingLoc) {
            pickedLoc = loc;
        }
        // map.setCenter(loc);
    }

    onMount( async () => {
        map = new google.maps.Map(container, options);

        // TODO: what happen when the page is navigated away? does this get destroyed?
        loc_data.subscribe(updateLoc);

        console.log(updatingLoc)

        // locMkr = new google.maps.Marker({
        //     position: map.getCenter(),
        //     map: map,
        // });

        // Add event listener
        // google.maps.event.addListener(map, "click", (event) => {
        //    setMkr(map, event.latLng, addrMkr0) ;
        // });

        // update the center
    });


    // const addAddressMarker = (map, position, options) => {
    //     if(addressMarker) {
    //         addressMarker.setPosition(position);
    //     }
    //     else {
    //         addressMarker = new google.maps.Marker({
    //             position, 
    //             map,
    //             draggable: true,
    //         });
    //     }
    // }
</script>

<map>
    <div class="map map-pincenter" class:hide-pin={!updatingLoc} bind:this={container}/>
</map>

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

</style>