# FlagTUK

## Prerequisites

You will need node package manager `npm` for starters. If you want to simulate the app on android or build apk bundles, also install Android Studio

## Instructions for testing

1. Clone the repository
```
git --verbose https://github.com/xcorat/flagtuk.git
```
2. Install the dependencies
```
npm i
```
3. Add private tokens to the environment

The private tokens needed to access some APIs like supabase or google maps API are stored in a `.env` file (root folder). The structure of the file should resemble the following:
```
VITE_SUPABASE_URL=https://qroibfykkmnxgdntwqne.supabase.co
VITE_SUPABASE_ANON_KEY=<supabase key>

VITE_GUN_TESTUSER_ALIAS=<gundb user>
VITE_GUN_TESTUSER_PASS=<gundb password>

VITE_GOOGLE_API_KEY=<google maps api key>
```

email xcorat@protonmail.com if you want to share some of these keys with the main build.

4. Run development server
```
npm run dev
```

Now you can test the app on a web brower at http://localhost:3000

4. Testing builds

First, build a deployment version of the app,
```
npm run build
```

For testing on android, sync the web build and open in android studio.
```
npx cap sync
npx cap open android
```

then you can build the an apk from the android studio, transfer to a phone and test. Probably faster way to do, but this is my workflow for now

5. Android Studio

+ Make sure you have Google Play services SDK tool installed. We need this for location services
+ Create a device, tested with Nexus 5, Android R/API level 30.
