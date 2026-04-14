# Expo

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Prerequisites

[Set up your Android or iOS development environment](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=physical) to start building with Expo.

## Install dependencies

```sh
npx pnpm install
```

## Add your TalkJS APP ID

Update the `YOUR_APP_ID` placeholder in `src/constants/chat.ts` with your TalkJS App ID. You can find your App ID in the **Settings** tab of the [TalkJS dashboard](https://talkjs.com/dashboard).

## Configure push notifications

Follow our Expo push notifications guide to configure push notifications for [Android](https://talkjs.com/docs/Guides/React_Native/Push_Notifications_Expo/#android) or [iOS](https://talkjs.com/docs/Guides/React_Native/Push_Notifications_Expo/#ios).
For both guides you can skip the **Install dependencies** step.

## Install and run the app

Before running the app, make sure you have connected your device via ADB for Android and on XCode for iOS.
If you aren't using a physical device, make sure the emulator/simulator for your respective platform is
setup correctly.

```sh
npx expo start
```

Then in a separate terminal session/window run the following to build on Android:

```sh
npx expo run:android
```

and the following to build on iOS:

```sh
npx expo run:ios --device
```
