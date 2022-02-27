<script lang="ts">
    import "../app.css";

    import {user} from '../stores/testuser';
    import supabase from '$lib/supabaseClient';

    import Nav from "../components/nav.svelte"


	let themeName = "garden";

    const supabaseUser = supabase.auth.user();
    user.set({
        email: supabaseUser?.email?? null,
        authenticated: supabaseUser?.id? true: false,
    })

    supabase.auth.onAuthStateChange((_, session) => {
        $user = {
            email: session?.user?.email?? null,
            authenticated: session?.user ? true: false,
        };
        console.log(_);
    });
</script>

<div class='max-w-6xl mx-auto bg-base-100 min-h-screen' data-theme='{themeName}'>
    <Nav/>
    <slot></slot>
</div>

<style>
    /* TODO: not sure why this is needed... */
    * {
        color: hsl(--bc);
    }
</style>