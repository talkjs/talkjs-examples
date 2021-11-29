## Installing Dependencies

```sh
yarn install
```

If you intend to build for iOS, make sure you have CocoaPods installs before running the following command
inside the ios folder

```sh
pod install
```

## Installing the App

Before running the app, make sure you have connected your device via ADB for Android and on XCode for iOS.
If you aren't using a physical device, make sure the emulator/simulator for your respective platform is
setup correctly.

Before installing, in a terminal window, run:

```sh
yarn start
```

To install on Android, in a separate terminal window, run:

```sh
yarn android
```

To install on iOS, in a separate terminal window, run:

```sh
yarn ios
```
