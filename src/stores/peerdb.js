import Gun from "gun/gun"
import { gun } from "../lib/svelte-gun"

// createStore() is a simpliefied version of a readable from svelte/store.
// It is suitable for stores that will be accessed from many components
function customStore(ref, methods = {}) {
	let store = {}
	const subscribers = []

	function publish(data, key) {
		if (ref._.get === key) {    // for gun.get(key)
			store = data
		} else if (data) {          // for gun.get(key).map()
			store[key] = data
		} else {
			delete store[key]
		}
		for (let i = 0; i < subscribers.length; i += 1) {
			subscribers[i](store)
		}
	}

	function subscribe(subscriber) {
		subscribers.push(subscriber)
		
		// Publish initial value
		subscriber(store)
		
		// Add listener to gun reference
		ref.on(publish)

		// return cleanup function to be called on component dismount
		return () => {
			const index = subscribers.indexOf(subscriber)
			if (index !== -1) {
				subscribers.splice(index, 1)
			}
			if (subscribers.length === 0) {
				ref.off()
			}
		}
	}

	return { ...methods, subscribe }
}

const riderRef = gun.get('riders');
export const riders = customStore(riderRef.map(), {
	add: (username, location, timeout) => {
		let rref = riderRef.set({
			username,
			location,
			timeout,
			icon: "🙋" 
		});
		// TODO: Probably there's a better way to get the key
		let key = rref._['#']
		console.log(rref);
		setTimeout(() => { riderRef.get(key).put(null) }, timeout);
	},
	delete: key => riderRef.get(key).put(null),
});

const driverRef = gun.get("drivers");
export const drivers = customStore(driverRef.map(), {
	add: (username, location, ready) => driverRef.set({
				username,
				location,
				ready,
				icon: "🚕" 
			}),
	delete: key => driverRef.get(key).put(null),
});