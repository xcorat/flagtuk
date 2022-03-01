<script>
    import { onMount } from "svelte";
    import { gun } from "../lib/svelte-gun";
    import {riders, drivers} from "../stores/peerdb.js"

    let username = "anonymous"

    const addDriver = () => {
        // @ts-ignore
        drivers.add(username, null, true);
    }

    const addRider = () => {
        const date = new Date();
        let timeout = date.getTime() + 100000;
        // @ts-ignore
        riders.add(username, null, timeout);
    }

    const ref = gun.get("drivers");//.get('peers')
    let rawData = {}
	ref.open(data => (rawData = data))

</script>

{#each Object.entries($drivers) as [key, {username, location, ready, icon}] (key)}
<div style="padding: .4rem">
    {icon} {username} @ {location} | {ready?'Ready':'Not Ready'}
    <a class='btn btn-ghost' href="/" on:click|preventDefault={() => drivers.delete(key)}>delete {key}</a>
</div>
{/each}

{#each Object.entries($riders) as [key, {username, location, timeout, icon}] (key)}
<div style="padding: .4rem">
    {icon} {username} @ {location} | timeout at:  {timeout}
    <a class='btn btn-ghost' href="/" on:click|preventDefault={() => riders.delete(key)}>delete {key}</a>
</div>
{/each}

<div>
    <input bind:value={username} />
    <button class="btn" on:click={addDriver} >Ready to drive</button>>
    <button class="btn" on:click={addRider} >Need a ride</button>>
</div>
<div style="display: flex; width: 100%">
    <pre style="flex: 1;">from custom store: {JSON.stringify($drivers, null, 2)}</pre>
    <pre style="flex: 1; ">from gun.open(): {JSON.stringify(rawData, null, 2)}</pre>
</div>
<div style="display: flex; width: 100%">
    <pre style="flex: 1;">from custom store: {JSON.stringify($riders, null, 2)}</pre>
</div>