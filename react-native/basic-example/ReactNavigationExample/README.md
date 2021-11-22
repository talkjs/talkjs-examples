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

To install on Android run:

```sh
yarn android start
```

To install on iOS run:

```sh
yarn ios start
```
