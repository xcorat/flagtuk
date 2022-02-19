<script>
	import { onMount } from 'svelte';
	import { Geolocation } from '@capacitor/geolocation';
	import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

	import {log} from "../stores/log";

	// TODO: Move the location to a store, ideally a readable, so we can access it from anywhere
	// 		readable store: https://svelte.dev/tutorial/readable-stores

	let fileData, loc;
	let distance = 0.0;
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
		let oldLocation = loc;
		//getCurrentPosition();
		Geolocation.watchPosition({
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 5000
		}, (location) => {
			let locationString = "(" + location.coords.latitude + ', ' + location.coords.longitude + ")" + 
								 "| speed = "  + location.coords.speed + " | distance = " + distance*1000;

			// NOTE: `$log = ` syntax doesn't work properly. It seem to keep the old state even after reset
			log.update(value =>  [... value, locationString] );

			if(loc){
				//console.log(location.coords.latitude, location.coords.longitude, loc.coords.latitude, loc.coords.longitude);
				let dp = distanceInKmBetweenEarthCoordinates(location.coords.latitude, location.coords.longitude, loc.coords.latitude, loc.coords.longitude);
				distance += dp; 
			}
			loc = location
		});
	});

	function degreesToRadians(degrees) {
		return degrees * Math.PI / 180;
	}

	function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
		var earthRadiusKm = 6371;

		var dLat = degreesToRadians(lat2-lat1);
		var dLon = degreesToRadians(lon2-lon1);

		lat1 = degreesToRadians(lat1);
		lat2 = degreesToRadians(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return earthRadiusKm * c;
	}
</script>


<svelte:head>
	<title>Flag Tuk </title>
</svelte:head>
<h1 class='text-3xl text-center my-8 uppercase'>Flag Tuk</h1>

<h1>{fileData}</h1>
<div>
	<h2>Geolocation</h2>
	<p>Your location is: ({loc ? loc.coords.latitude + ', ' + loc.coords.longitude : 'Getting location...'})</p>
	<p>Total Distance: {distance} km</p>
</div>


<style>
	h1 { color: red }
</style>