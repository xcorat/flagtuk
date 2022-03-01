import Gun from "gun/gun.js"
import 'gun/sea.js'
import 'gun/axe.js'
// ERROR: importing `unset` throws an error - maybe related to SSR.
// 		We don't use it anyway, so comment out for now
//import unset from "gun/lib/unset"
import open from "gun/lib/open.js"

// NOTE: Copied most of the sample code for Gun from:
//	https://svelte.dev/repl/53ecf1dc52c245faba204f3ca94d5cde?version=3.16.5
// 	But removed the `extendedGun example related stuff since it wasn't working.

export const gun = Gun(['https://gun-manhattan.herokuapp.com/gun', 'https://flagtuk-gun-server.herokuapp.com/gun',
						'wss://ovh.era.eco/gun'])
export const user = gun.user().recall({sessionStorage: true});

// TODO: this is probably not the right way to do things (undefined or bool?)
const testuser_alias = import.meta.env.VITE_GUN_TESTUSER_ALIAS as string;
const testuser_pass = import.meta.env.VITE_GUN_TESTUSER_PASS as string;
console.log(testuser_alias, testuser_pass)

const authTestUser = () => {
	let checkFlagTukUser = false;
	gun.get('~@test-flagtuk').once((data) => {
		if(data === undefined){
			// Cannot find user. Create for first time
			user.create(testuser_alias, 'simplepass', (ack) => {
				// DEBUG: why doesn't `ack` give what it is supposed to give?
				// 		according to https://gun.eco/docs/User
				//console.log('User creation: ', ack);
			});
		}
		else {
			user.auth(testuser_alias, testuser_pass, (ack) => {
				// DEBUG: Same as above...
				//console.log('User login: ', JSON.stringify(ack));
			});
		}
	});
}

authTestUser();