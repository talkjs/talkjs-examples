# React Native example

This example demonstrates how to use TalkJS with React Native to create a basic app. It uses the [React Navigation](https://reactnavigation.org/docs/getting-started/) library to navigate between screens.

## Prerequisites

Set up your Android and/or iOS development environment as specified [here](https://reactnative.dev/docs/set-up-your-environment?os=linux&platform=android).
No need to follow the steps after **Create a new application**.

## Install dependencies

```sh
yarn
```

If you intend to build for iOS, make sure you have CocoaPods installed before running the following command
inside the ios folder

```sh
pod install
```

## Add your TalkJS App ID

Update the `YOUR_APP_ID` placeholders in `App.tsx` with your TalkJS App ID. You can find your App ID in the **Settings** tab of the [TalkJS dashboard](https://talkjs.com/dashboard).

## Configure push notifications

Follow our React Native push notifications guide to configure push notifications for [Android](https://talkjs.com/docs/Features/Notifications/Mobile_Push_Notifications/React_Native/#android) or [iOS](https://talkjs.com/docs/Features/Notifications/Mobile_Push_Notifications/React_Native/#ios).

## Install and run the app

Before running the app, make sure you have connected your device via ADB for Android and on XCode for iOS.
If you aren't using a physical device, make sure the emulator/simulator for your respective platform is
setup correctly.

Enter the following in a command terminal:

```sh
yarn start
```

Follow the onscreen prompt to run the app on the OS of your choice.
