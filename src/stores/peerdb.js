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

const ref = gun.get("peers");

export const peers = customStore(ref.map(), {
	add: text => ref.set({ text, sender: "moi", icon: "😺" }),
	delete: key => ref.get(key).put(null)
});