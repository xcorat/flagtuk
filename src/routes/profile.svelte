<script lang='ts'>
    import {user} from '../stores/testuser';

</script>


<svelte:head>
	<title>{user} - Flag Tuk</title>
</svelte:head>

<p class="text-lg text-center my-8 uppercase ">{$user.name}</p>
<p class="text-md text-center my-8">{$user.email}</p>

<style>
	p { color: rgb(19, 12, 110); }
</style>