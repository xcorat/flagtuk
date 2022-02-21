<script lang='ts'>
	import {userStore} from "../stores/testuser";
	import {log, filesystemread, readDummyTextFile} from "../stores/log";
	
	let fileData = "";
	filesystemread.subscribe( val => { fileData = val; })

	readDummyTextFile();

	function resetLog() {
		$log = [];
	}

</script>


<svelte:head>
	<title>Flag Tuk - Log </title>
</svelte:head>



<h1>{fileData}</h1>

<h1 class="text-3xl text-center my-8 uppercase ">Log</h1>
<button class='btn btn-primary' on:click={resetLog}>Reset Log</button>

<div class='my-6'>
	{#each $log as log_msg}
		<p class='my-1'> {log_msg} </p>
	{/each}
</div>

<style>
	p { color: red; }
</style>
