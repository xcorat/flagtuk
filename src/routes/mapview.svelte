<script lang='ts'>
    import {onMount} from 'svelte';
    import Map from '../components/map.svelte'

    export let gApiReady = false;//google??.maps? true: false;

    const initializeGapi = async () => {
        console.log('gapi ready')
        gApiReady = true;
    }

    const loadstart = () => {
        console.log("loadstart");
    }

  //  if(browser)

    onMount( async () => {
        // TODO: This checks if google maps api is available. This should have been handled by the callback,
        //  but is not for some reason. Find out why!
        if(google?.maps){
            initializeGapi();
        }
    })
</script>

<svelte:head>
    <script defer async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGB9_iRcCNZ9ZK0r4NP3xBtKXPmu7X3cs" on:load={initializeGapi}></script>
</svelte:head>


<div>
    {#if gApiReady}
        <Map/>
    {:else}
        <p>Google map view is being loaded... </p>
    {/if}
</div>

