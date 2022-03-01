<script lang='ts'>
    import {onMount} from 'svelte';
    import Map from '../components/map.svelte'

    export let gApiReady = false;//google??.maps? true: false;

    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;

    const initializeGapi = async () => {
        console.log('gapi ready')
        gApiReady = true;
    }

    const loadstart = () => {
        console.log("loadstart");
    }

    onMount( async () => {
        // DEBUG: This checks if google maps api is available. This should have been handled by the callback,
        //  but is not for some reason. Find out why!
        if(google?.maps){
            initializeGapi();
        }
    })
</script>

<svelte:head>
    <script defer async
    src="https://maps.googleapis.com/maps/api/js?key={googleApiKey}" on:load={initializeGapi}></script>
</svelte:head>


<div>
    {#if gApiReady}
       <Map/>
    {:else}
        <p>Google map view is being loaded... </p>
    {/if}
</div>

