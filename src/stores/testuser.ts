import {writable} from "svelte/store";
import supabase from '$lib/supabaseClient';

export const user = writable({
    email: "xcorat@gmail.com",
    authenticated: false,
});

export const signOut = () => {
    supabase.auth.signOut();
}
