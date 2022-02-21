<script>
	import { onMount } from 'svelte';
	import { Geolocation } from '@capacitor/geolocation';

	import {log, filesystemread} from "../stores/log";
	import { loc_data, travel_data } from '../stores/location';

	import Quicklinks from "../components/home/quicklinks.svelte"

	// TODO: Move the location to a store, ideally a readable, so we can access it from anywhere
	// 		readable store: https://svelte.dev/tutorial/readable-stores

	let fileData, loc;
	let distance = 0.0;

	export const ssr = false;


	onMount(async () => {
		filesystemread.subscribe( val => { fileData = val; })

		// autosubscribe here gives an error. Possibly due to prerendering
		loc_data.subscribe(val => { loc = val.loc; });
		travel_data.subscribe(val => { distance = val.dist; });

	});
</script>


<svelte:head>
	<title>Flag Tuk </title>
</svelte:head>
<div class="flex-col">
	<Quicklinks/>
	<h1>{fileData}</h1>
	<div>
		<h2>Geolocation</h2>
		<!-- <p>Your location is: ({loc ? loc.coords.latitude + ', ' + loc.coords.longitude : 'Getting location...'})</p> -->
		<p>Your location is: ({loc ? loc.lat + ', ' + loc.lng : 'Getting location...'})</p>
		<p>Total Distance: {distance} km</p>
	</div>
</div>

<style>
	h1 { color: red }
</style>