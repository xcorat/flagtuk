<script lang='ts'>

    /*
     + 1. Open with a map view,
       2. Origin, destination fields, with edit buttons
       3. two main buttons, Flag ride, Request Trip?
     * 
    */

    import {onMount} from 'svelte';
    import { loc_data } from '../stores/location'
    import Map from '../components/map.svelte'

    export let gApiReady = false;//google??.maps? true: false;

    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;

    let loc = {lat: 6.82, lng: 80.983};
    // We need to keep track of the first click on the location input
    let startLoc = { loc, name: "Start", filled: false };
    let endLoc = { loc, name: "Destination", filled: false }

    const initializeGapi = async () => {
        gApiReady = true;
    }

    onMount( async () => {
        // DEBUG: This checks if google maps api is available. This should have been handled by the callback,
        //  but is not for some reason. Find out why!
        // @ts-ignore
        if(google?.maps){
            initializeGapi();
        }

        // TODO: what happen when the page is navigated away? does this get destroyed?
        loc_data.subscribe((val) => { loc = val.loc; });

    })  
</script>

<svelte:head>
    <script defer async
    src="https://maps.googleapis.com/maps/api/js?key={googleApiKey}" on:load={initializeGapi}></script>
</svelte:head>

<div class="flex-col">
    <div>
        {#if gApiReady}
            <Map/>
        {:else}
            <p class="text-center align-center">Google map view is being loaded... </p>
        {/if}
    </div>
    <div class="p-8 flex flex-col space-y-5 shadow-md form-control">
        { #if loc}  
            <div class="input-group">
                <input class="flex input input-bordered input-primary w-full max-w-xs" placeholder="Start" bind:value="{startLoc.name}"> 
                <button class="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                    </svg>
                </button>
            </div>
            <div class="input-group">
                <input class="input input-bordered input-primary w-full max-w-xs" placeholder="Destination" bind:value="{endLoc.name}">
                <button class="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                    </svg>
                </button>
            </div>
        <p>You are near ({loc.lat}, {loc.lng})</p>
        { :else}
            <p>Cannot acquire location!</p>
        {/if}
    </div>
    <div class="flex-row space-x-5 p-8 justify-center text-center">
        <button class="btn m-l-auto"> Flag Ride
        </button>
        <button class="btn"> Request Trip

        </button>
    </div>
</div>
    