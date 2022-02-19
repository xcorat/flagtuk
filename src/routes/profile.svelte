<script context='module'>
// TODO: maybe we need to call the user info code from here!
</script>

<script>
    import {user, signOut} from '../stores/testuser';
    import Auth from 'supabase-ui-svelte'
    import supabase from '$lib/supabaseClient';

   // const supabaseUser = supabase.auth.user();
  //  console.log(supabaseUser);
    


</script>


<svelte:head>
	<title>Flag Tuk</title>
</svelte:head>

{#if $user.authenticated}
<div class="container max-w-lg mx-auto my-10  content-center">
    <p class="text-md text-center my-8">{$user.email}</p>
    <button class='btn' on:click={signOut}>Log Out</button>
</div>
{:else}
<div class="container max-w-lg mx-auto my-10 shadow">
    <div class="p-6">
        <Auth supabaseClient={supabase}/>    
    </div>
</div>        
{/if}

<style>
	p { color: rgb(19, 12, 110); }
    /* this doesn't seem to work :*/
    button:disabled { background-color: #888888;}
</style>
