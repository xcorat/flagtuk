<script>
	import { onMount } from 'svelte';
	import { Geolocation } from '@capacitor/geolocation';
	import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

	import {log} from "../stores/log";


	let fileData, loc;
	async function getCurrentPosition() {
		try {
			console.log("@getCurrentPosition");
			
			const res = await Geolocation.getCurrentPosition();

			let locationString = "(" + res.coords.latitude + ', ' + res.coords.longitude + ")" + 
								 "| speed = "  + res.coords.speed;
			$log = [... $log, locationString] ;

			loc = res;
		} catch (e) {
			console.log(e);
			loc = {
				coords: {
					latitude: "Couldn't get location data",
					longitude: "Couldn't get location data"
				}
			};
		}
		setTimeout(() => { getCurrentPosition(); }, 5000);
	}
	async function readDummyTextFile() {
		let file;
		try {
			file = await Filesystem.readFile({
				path: 'dummy.txt',
				directory: Directory.Data,
				encoding: Encoding.UTF8
			});
			fileData = file.data;
			return file;
		} catch (e) {
			await Filesystem.writeFile({
				path: 'dummy.txt',
				data: 'This is a dummy text file.',
				directory: Directory.Data,
				encoding: Encoding.UTF8
			});
			readDummyTextFile();
		}
	}
	onMount(async () => {
		readDummyTextFile();
		//getCurrentPosition();
		Geolocation.watchPosition({
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 5000
		}, (location) => {
			let locationString = "(" + location.coords.latitude + ', ' + location.coords.longitude + ")" + 
								 "| speed = "  + location.coords.speed;

			// NOTE: `$log = ` syntax doesn't work properly. It seem to keep the old state even after reset
			log.update(value =>  [... value, locationString] );
			loc = location
		});
	});
</script>


<svelte:head>
	<title>Flag Tuk </title>
</svelte:head>
<h1 class='text-3xl text-center my-8 uppercase'>Flag Tuk</h1>

<h1>{fileData}</h1>
<div>
	<h2>Geolocation</h2>
	<p>Your location is: ({loc ? loc.coords.latitude + ', ' + loc.coords.longitude : 'Getting location...'})</p>
</div>


<style>
	h1 { color: red }
</style>