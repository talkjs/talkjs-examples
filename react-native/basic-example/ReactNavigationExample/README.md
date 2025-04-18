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

### Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.
