import {writable} from "svelte/store";

export const user = writable({
    name: "Sachi",
    email: "xcorat@gmail.com",
});

let defaultUser = {
    name: "Sachi",
    email: "xcorat@gmail.com",
}

user.set(defaultUser);