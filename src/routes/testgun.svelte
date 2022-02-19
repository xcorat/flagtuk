<script>
    import { onMount } from "svelte";
    import { gun } from "../lib/svelte-gun";
    import {peers} from "../stores/peerdb.js"

  //  let peers = [];


    const addPeer = () => {
        console.log(peerName)
        peers.add(peerName);
    }

    const ref = gun.get("peers")
    let rawData = {}
	ref.open(data => (rawData = data))

    let peerName = ""
</script>

{#each Object.entries($peers) as [key, {sender, text, icon}] (key)}
<div style="padding: .4rem">
    {icon} {sender} said: {text}
</div>
{/each}

<div>
    <input bind:value={peerName} />
    <button class="btn" on:click={addPeer} >Add Peer</button>>
</div>
<div style="display: flex; width: 100%">
    <pre style="flex: 1;">from custom store: {JSON.stringify($peers, null, 2)}</pre>
    <pre style="flex: 1; ">from gun.open(): {JSON.stringify(rawData, null, 2)}</pre>
</div>