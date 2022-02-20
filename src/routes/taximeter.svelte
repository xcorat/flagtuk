<script>

    let rate_km = 50.;
    let rate_min = 10;

    let fare = 0;
    let distance = 0;
    let speed = 0;

    let riding = false;
    let paused = false;

</script>

<div class="flex justify-center">
<div class="p-4 shadow-md w-max flex-column space-y-5">
    <div class="p-4 shadow-md flex space-x-5" >
        <p class="p-4 w-36 shadow-sm text-right">{rate_km} Rs./km</p>
        <p class="p-4 w-36 shadow-sm text-right">{rate_min} Rs./min</p>
    </div>
    <div class="p-8 shadow-md flex justify-center">
        Fare: {fare} Rs.
    </div>
    <div class="p-4 shadow-md flex flex-row justify-content-center space-x-5">
        <div class="p-4 w-36 shadow-sm text-center">
            <p>{distance} km</p>
            <p>Distance</p>
        </div>
        <div class="p-4 w-36 shadow-sm text-center">
            <p>{speed} km/hr</p>
            <p>speed</p>
        </div>
    </div>
    <div class="p-8 shadow-md justify-center flex flex-row space-x-5">
        {#if riding}
            <button class="btn btn-error">Stop</button>
            {#if paused}
                <button class="btn btn-success">Resume</button>
            {:else}
                <button class="btn btn-warning">Pause</button>
            {/if}
        {:else}
            <button class="btn btn-success">Start</button>
        {/if}
    </div>
</div>
</div>