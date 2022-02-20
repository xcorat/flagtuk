<script>
    import {onMount} from 'svelte';
    import { fix_position } from 'svelte/internal';

    let container;
    let map;
    let addressMarker;
    let positionMarker;
    let location = {lat: 6.82, lng: 80.983};
    let options = { zoom: 15, center: location, };

    onMount( async () => {
        map = new google.maps.Map(container, options);
        positionMarker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
        });

        // Add event listener
        google.maps.event.addListener(map, "click", (event) => {
           addAddressMarker(map, event.latLng) ;
        });
    });

    const addAddressMarker = (map, position, options) => {
        if(addressMarker) {
            addressMarker.setPosition(position);
        }
        else {
            addressMarker = new google.maps.Marker({
                position, 
                map,
                draggable: true,
            });
        }
    }
</script>

<map>
    <div class="map" bind:this={container}/>
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
</style>