<script>
	import { onMount } from 'svelte';
	import { Geolocation } from '@capacitor/geolocation';

	import {log} from "../stores/log";
	import { loc_data } from '../stores/location';

	import Quicklinks from "../components/home/quicklinks.svelte"

	// TODO: Move the location to a store, ideally a readable, so we can access it from anywhere
	// 		readable store: https://svelte.dev/tutorial/readable-stores

	let loc;

	export const ssr = false;


	onMount(async () => {
		// autosubscribe here gives an error. Possibly due to prerendering
		loc_data.subscribe(val => { loc = val.loc; });

	});
</script>


<svelte:head>
	<title>Flag Tuk </title>
</svelte:head>
<div class="flex-col">
	<Quicklinks/>
	<div>
		<h2>Geolocation</h2>
		<!-- <p>Your location is: ({loc ? loc.coords.latitude + ', ' + loc.coords.longitude : 'Getting location...'})</p> -->
		<p>Your location is: ({loc ? loc.lat + ', ' + loc.lng : 'Getting location...'})</p>
	</div>
</div>
